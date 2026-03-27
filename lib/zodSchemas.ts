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

// add-creator schema
export const creatorSchema = z.object({
    full_name: z.string().min(2).max(100),
    email: z.string().email(),
    creator_handle: z.string().min(2).max(100),
    platform: z.enum(["instagram", "tiktok"]),
    tier: z.enum(["nano", "micro", "macro", "mega"]),
    niche: z.enum([
        "food",
        "lifestyle",
        "college life",
        "dating",
        "genz entertainment",
        "fitness",
        "travel",
    ]),
    follower_count: z.number().min(0, "Must be positive"),
    engagement_rate: z.number().min(0, "Must be positive"),
    contract_status: z.enum(["active", "inactive", "negotiating"]),
    rate: z.number().min(0, "Rate must be positive"),
    notes: z.string().max(500, "Notes cannot exceed 500 characters").optional()
});

export type CreatorOnboardingInput = z.infer<typeof creatorSchema>;

export enum CONTRACT_STATUS {
    ACTIVE = "active",
    INACTIVE = "inactive",
    NEGOTIATING = "negotiating"
}

export enum NICHES {
    FOOD = "food",
    LIFE_STYLE = "lifestyle",
    COLLEGE_LIFE = "college life",
    DATING = "dating",
    GENZ_ENTERTAINMENT = "genz entertainment",
    FITNESS = "fitness",
    TRAVEL = "travel",
}

export enum TIERS {
    NANO = "nano", 
    MICRO = "micro", 
    MACRO = "macro", 
    MEGA = "mega"
}

export enum PLATFORMS {
    INSTAGRAM = "instagram", 
    TIKTOK = "tiktok"
}

export const editCreatorSchema = z.object({
    full_name: z.string().min(2).max(100).optional(),
    creator_handle: z.string().min(2).max(100).optional(),
    platform: z.enum(["instagram", "tiktok"]).optional(),
    tier: z.enum(["nano", "micro", "macro", "mega"]).optional(),
    niche: z.enum([
        "food",
        "lifestyle",
        "college life",
        "dating",
        "genz entertainment",
        "fitness",
        "travel",
    ]).optional(),
    follower_count: z.number().min(0, "Must be positive").optional(),
    engagement_rate: z.number().min(0, "Must be positive").optional(),
    contract_status: z.enum(["active", "inactive", "negotiating"]).optional(),
    rate: z.number().min(0, "Rate must be positive").optional(),
    notes: z.string().max(500, "Notes cannot exceed 500 characters").optional()
});