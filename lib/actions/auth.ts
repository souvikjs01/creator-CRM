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
        console.log("err", error);
        return submission.reply({
            formErrors: [error.message],
        })
    }

    redirect("/sign-in")
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
        console.log("err", error);
        return submission.reply({
            formErrors: [error.message],
        })
    }

    const { data: existingUser } = await supabase
        .from("creators")
        .select("*")
        .eq("email", submission.value.email)
        .limit(1)
        .single();

    if(!existingUser) {
        const { error: insertErr } = await supabase.from("creators").insert({
            email: submission.value.email
        })

        if(insertErr) {
            console.log("signin insert err: ", insertErr);
            return submission.reply({
                formErrors: [insertErr.message],
            })
        }
    }

    redirect("/dashboard")
}