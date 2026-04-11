"use server"
import { redirect } from "next/navigation";
import { createClient } from "../supabase/server";
import { parseWithZod } from "@conform-to/zod";
import { creatorSchema, editCreatorSchema } from "../zodSchemas";
import { Database } from "@/types/database"
import { revalidatePath } from "next/cache";
import EmailService from "../resend";

export type Creator = Database["public"]["Tables"]["creators"]["Row"]

export type ActiveCreator = Pick<
  Creator,
  "id" | "full_name" | "follower_count" | "engagement_rate" | "platform" | "tier"
>;

export async function addCreatorAction(prevState: any, formData: FormData) {
    const supabase = await createClient()

    const {
        data: { user }
    } = await supabase.auth.getUser()

    if (!user) {
        redirect("/sign-in")
    }

    const submission = parseWithZod(formData, {
        schema: creatorSchema
    })
    
    if(submission.status !== 'success') {
        return submission.reply()
    }
    
    const { error } = await supabase.from("creators").insert({
        full_name: submission.value.full_name,
        email: submission.value.email,
        handle: submission.value.creator_handle,
        platform: submission.value.platform,
        tier: submission.value.tier,
        niche: submission.value.niche,
        follower_count: submission.value.follower_count,
        engagement_rate: submission.value.engagement_rate,
        contract_status: submission.value.contract_status,
        rate: submission.value.rate,
        notes: submission.value.notes,
        user_id: user.id
    })

    if (error) {
        console.error("error adding creator inside addCreatorAction: ",error)
        throw new Error(error.message)
    }

    // 📧 SEND EMAIL
    const emailService = new EmailService();
    await emailService.addNewCreatorEmail(
        "souvik741156@gmail.com",
        submission.value.full_name
    );

    redirect("/dashboard/creators")
}

export async function getAllCreators() {
    const supabase = await createClient()

    const {
        data: { user }
    } = await supabase.auth.getUser()

    if (!user) {
        redirect("/sign-in")
    }

    const { data, error } = await supabase
        .from("creators")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

    if (error) {
        console.error("Error fetching creators: ", error)
        throw new Error(error.message)
    }

    return data
}

export async function getCreatorById(id: string) {
    const supabase = await createClient()

    const {
        data: { user }
    } = await supabase.auth.getUser()

    if (!user) {
        redirect("/sign-in")
    }

    const { data, error } = await supabase
        .from("creators")
        .select("*")
        .eq("id", id)
        .single()

    if (error) {
        console.error("Error fetching creator:", error)
        throw new Error(error.message)
    }

    return data
}

export async function deleteCreatorById(id: string) {
    const supabase = await createClient()

    const {
        data: { user }
    } = await supabase.auth.getUser()

    if (!user) {
        redirect("/sign-in")
    }

    
    const { error } = await supabase
        .from("creators")
        .delete()
        .eq("id", id)

    if (error) {
        console.error("Error deleting creator:", error)
        throw new Error(error.message)
    }

    redirect("/dashboard/creators")
}

export async function editCreatorAction(prevState: any, formData: FormData) {
    const supabase = await createClient()

    const {
        data: { user }
    } = await supabase.auth.getUser()

    if (!user) {
        redirect("/sign-in")
    }

    const submission = parseWithZod(formData, {
        schema: editCreatorSchema
    })

    if (submission.status !== "success") {
        return submission.reply()
    }

    const { error } = await supabase
        .from("creators")
        .update({
            full_name: submission.value.full_name,
            handle: submission.value.creator_handle,
            platform: submission.value.platform,
            tier: submission.value.tier,
            niche: submission.value.niche,
            follower_count: submission.value.follower_count,
            engagement_rate: submission.value.engagement_rate,
            contract_status: submission.value.contract_status,
            rate: submission.value.rate,
            notes: submission.value.notes,
        })
        .eq("id", formData.get("id") as string)
        .eq("user_id", user.id)

    if (error) {
        console.error("error updating creator: ", error)
        throw new Error(error.message)
    }

    redirect("/dashboard/creators")
}

export async function updateCreatorStatus(id: string, status: string) {
    const supabase = await createClient()

    const {
        data: { user }
    } = await supabase.auth.getUser()

    if (!user) {
        redirect("/sign-in")
    }

    const { error } = await supabase
        .from("creators")
        .update({ contract_status: status })
        .eq("id", id)
        .eq("user_id", user.id)
    
    if (error) {
        console.error("Error updating creator status:", error);
        throw new Error(error.message);
    }
    
    revalidatePath("/dashboard/creators");
}

export async function getActiveCreators() {
    const supabase = await createClient()

    const {
        data: { user }
    } = await supabase.auth.getUser()

    if (!user) {
        redirect("/sign-in")
    }

    const { data, error } = await supabase
        .from("creators")
        .select("id, full_name, follower_count, engagement_rate, platform, tier")
        .eq("user_id", user.id)
        .eq("contract_status", "active")
        .order("created_at", { ascending: false })

    if (error) {
        throw new Error(error.message)
    }

    return data
}