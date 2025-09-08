import z from "zod";

export const ImageTypeCreateSchema = z.object({
  typeName: z.string().min(1, "ImageType is required"),
});

export type ImageTypeCreateForm = z.infer<typeof ImageTypeCreateSchema>;

export const ImageTypeEditSchema = z.object({
  typeName: z.string().min(1, "ImageType is required"),
});

export type ImageTypeEditForm = z.infer<typeof ImageTypeEditSchema>;
