import z from "zod";

export const InquirySchema = z.object({
    name: z.string().min(1,"Name is required"),
    email: z.string().email("Invalid email address").min(1, "Email is required"),
    phone: z.string().optional(),
    description: z.string().min(1, "Description is required"),
})

export type InquiryCreateForm = z.infer<typeof InquirySchema>;
