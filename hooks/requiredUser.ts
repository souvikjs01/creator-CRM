import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function requiredUser() {
    const supabase = await createClient()

    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
        redirect("/sign-in")
    }

    if(!data.user.email_confirmed_at) {
        redirect("/sign-up")
    }

    return data.user;
}