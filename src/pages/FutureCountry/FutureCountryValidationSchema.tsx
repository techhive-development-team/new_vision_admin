import z from "zod";

export const FutureCountryCreateSchema = z.object({
    country : z.string().min(1, "Future Countr is required"),
});

export type FutureCountryCreateForm = z.infer<typeof FutureCountryCreateSchema>;