import z from "zod";

export const HappeningTypeCreateSchema = z.object({
    typeName: z.string().min(1, "HappeningType is required"),
});

export type HappeningTypeCreateForm = z.infer<typeof HappeningTypeCreateSchema>;

export const HappeningTypeEditSchema = z.object({
    typeName: z.string().min(1, "HappeningType is required"),
});

export type HappeningTypeEditForm = z.infer<typeof HappeningTypeEditSchema>;