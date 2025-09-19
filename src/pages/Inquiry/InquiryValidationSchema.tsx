import z from "zod";
// model Inquiry {
//   id          Int      @id @default(autoincrement())
//   name        String
//   email       String
//   phone       String?
//   description String
//   createdAt   DateTime @default(now())
// }
export const InquirySchema = z.object({
    name: z.string().min(1,"Name is required"),
    email: z.string().email("Invalid email address").min(1, "Email is required"),
    phone: z.string().optional(),
    description: z.string().min(1, "Description is required"),
})

export type InquiryCreateForm = z.infer<typeof InquirySchema>;
