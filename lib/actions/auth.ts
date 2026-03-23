"use server"
import { redirect } from "next/navigation";
import { createClient } from "../supabase/server";
import { parseWithZod } from "@conform-to/zod";
import { signInSchema, signUpSchema } from "../zodSchemas";

export async function signUpAction(prevState: any, formData: FormData) {
    const supabase = await createClient();
    
    const submission = parseWithZod(formData, {
        schema: signUpSchema
    })

    if(submission.status !== 'success') {
        return submission.reply()
    }

    const { error, data } = await supabase.auth.signUp({
        email: submission.value.email,
        password: submission.value.password,
        options: {
            data: {
                firstname: submission.value.firstName,
                lastname: submission.value.lastName
            }
        }
    })

    // Supabase error
    if (error) {
        console.error("err", error);
        return submission.reply({
            formErrors: [error.message],
        })
    }

    redirect("/verify")
}

export async function signInAction(prevState: any, formData: FormData) {
    const supabase = await createClient();
    
    const submission = parseWithZod(formData, {
        schema: signInSchema
    })

    if(submission.status !== 'success') {
        return submission.reply()
    }

    const { error, data } = await supabase.auth.signInWithPassword({
        email: submission.value.email,
        password: submission.value.password
    })

    // Supabase error
    if (error) {
        console.error("err", error);
        return submission.reply({
            formErrors: [error.message],
        })
    }

    const { data: existingUser } = await supabase
        .from("users")
        .select("*")
        .eq("email", submission.value.email)
        .limit(1)
        .single();

    const { data: { user } } = await supabase.auth.getUser()

    if(!existingUser) {
        // fresh user
        const { error: insertErr } = await supabase.from("users").insert({
            email: submission.value.email,
            full_name: `${user?.user_metadata.firstname} ${user?.user_metadata.lastname}`
        })

        if(insertErr) {
            console.error("signin insert err: ", insertErr);
            return submission.reply({
                formErrors: [insertErr.message],
            })
        }
    }

    redirect("/dashboard")
}

export async function signOutAction() {
    const supabase = await createClient()

    const { error } = await supabase.auth.signOut();
    if(error) {
        redirect("/not-found")
    }

    redirect("/sign-in")
}