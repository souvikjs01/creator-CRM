"use server"

import { redirect } from "next/navigation";
import { createClient } from "../supabase/server";
import { parseWithZod } from "@conform-to/zod";
import { addCampaignSchema } from "../zodSchemas";

export async function addCampaignAction(prevState: any, formData: FormData) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/sign-in");
    }

    const submission = parseWithZod(formData, {
        schema: addCampaignSchema,
    });

    if (submission.status !== "success") {
        return submission.reply();
    }

    const creatorIds = formData.getAll("creatorIds") as string[];

    const { data: campaign, error } = await supabase
    .from("campaigns")
    .insert({
        campaign_name: submission.value.campaign_name,
        goal: submission.value.goal,
        status: submission.value.status,
        budget: submission.value.budget,
        start_date: submission.value.start_date.toISOString().split("T")[0], 
        end_date: submission.value.end_date.toISOString().split("T")[0],
        notes: submission.value.notes ?? null,
        total_reach: submission.value.total_reach ?? null,
        total_conversions: submission.value.total_conversions ?? null,
        cpa: submission.value.cpa ?? null,
        user_id: user.id,
    })
    .select("id")
    .single();

    if (error || !campaign) {
        return submission.reply({
            formErrors: ["Failed to create campaign. Please try again."],
        });
    }

    if (creatorIds.length > 0) {
        const paymentPerCreator = submission.value.budget / creatorIds.length;

       const rows = creatorIds.map((id) => ({
            creator_id: id,
            campaign_id: campaign.id,
            payment_amount: parseFloat(paymentPerCreator.toFixed(2)),
            payment_status: "pending",
            deliverables: submission.value.deliverables,
        }))

        const { error: joinError } = await supabase
            .from("creators_campaigns")
            .insert(rows); 

        if (joinError) {
            await supabase.from("campaigns").delete().eq("id", campaign.id);
            return submission.reply({
                formErrors: ["Failed to assign creators. Please try again."],
            });
        }
    }
    
    redirect("/dashboard/campaign"); 
}