import requiredUser from "@/hooks/requiredUser";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

async function getUserData(id: string) {
    const supabase = await createClient()

    const { data: creator } = await supabase.from("creators")
        .select("handle, platform, tier, niche, follower_count, engagement_rate, contract_status, rate, notes, full_name")
        .eq("id", id)
        .single()

    if (!creator?.handle || !creator?.platform || !creator?.tier || !creator?.niche || !creator?.follower_count || !creator?.engagement_rate || !creator?.contract_status || !creator.rate || !creator?.notes || !creator?.full_name) {
        redirect("/onboarding")
    }
}

export default async function layout({children}: { children: React.ReactNode}) {
  const session = await requiredUser();
  const data = await getUserData(session.id as string)
  return (
    <div>
        {children}
    </div>
  )
}
