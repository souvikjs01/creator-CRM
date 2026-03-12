import { z } from "zod"

export const signUpSchema = z.object({
    firstName: z.string().min(2).max(100),
    lastName: z.string().min(2).max(100),    
    email: z.string().email(),
    password: z.string().min(5, "Password must be at least 6 characters")
        .max(40, "Password too long"),
})

export type SignUpType = z.infer<typeof signUpSchema>

export const signInSchema = z.object({    
    email: z.string().email(),
    password: z.string().min(5, "Password must be at least 6 characters")
        .max(40, "Password too long"),
})

export type SignInType = z.infer<typeof signUpSchema>