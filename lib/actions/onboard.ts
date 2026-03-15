"use server"
import { redirect } from "next/navigation";
import { createClient } from "../supabase/server";
import { parseWithZod } from "@conform-to/zod";
import { creatorOnboardingSchema } from "../zodSchemas";

export async function onboardingAction(prevState: any, formData: FormData) {
    const supabase = await createClient()

    const {
        data: { user }
    } = await supabase.auth.getUser()

    if (!user) {
        redirect("/sign-in")
    }

    const submission = parseWithZod(formData, {
        schema: creatorOnboardingSchema
    })
    
    if(submission.status !== 'success') {
        return submission.reply()
    }

    const { error } = await supabase.from("creators").update({
        handle: submission.value.creator_handle,
        platform: submission.value.platform,
        tier: submission.value.tier,
        niche: submission.value.niche,
        follower_count: submission.value.follower_count,
        engagement_rate: submission.value.engagement_rate,
        contract_status: submission.value.contract_status,
        rate: submission.value.rate,
        notes: submission.value.notes,
        full_name: `${user.user_metadata.firstname} ${user.user_metadata.lastname}`
    }).eq("id", user.id)

    if (error) {
        console.log(error)
        throw new Error(error.message)
    }

    redirect("/dashboard")
}