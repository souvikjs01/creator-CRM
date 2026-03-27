"use server"
import { redirect } from "next/navigation";
import { createClient } from "../supabase/server";
import { parseWithZod } from "@conform-to/zod";
import { creatorSchema } from "../zodSchemas";
import { Database } from "@/types/database"

export type Creator = Database["public"]["Tables"]["creators"]["Row"]


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