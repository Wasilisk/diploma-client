import {z} from "zod";

export const guideRegistrationFormSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    phone: z.string(),
    description: z.string()
})