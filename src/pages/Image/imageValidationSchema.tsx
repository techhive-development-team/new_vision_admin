import z from "zod";

const MAX_FILE_SIZE = 1024 * 1024 * 30;
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
];

const fileValidator = (hasDefault = false, fieldName = "Image") =>
  z
    .union([z.instanceof(File), z.string().min(1, `${fieldName} is required`)])
    .refine(
      (file) => hasDefault || file instanceof File,
      `${fieldName} is required`
    )
    .refine(
      (file) =>
        file instanceof File
          ? ACCEPTED_IMAGE_MIME_TYPES.includes(file.type)
          : true,
      `Only ${ACCEPTED_IMAGE_MIME_TYPES.join(", ")} formats are supported`
    )
    .refine(
      (file) => (file instanceof File ? file.size <= MAX_FILE_SIZE : true),
      `${fieldName} must be less than ${MAX_FILE_SIZE / (1024 * 1024)}MB`
    );

export const ImageSchema = (hasDefaultBg = false) =>
  z.object({
    mainText: z.string().min(2).max(1000),
    subText: z.string().optional(),
    imageTypeId: z.string().min(1, "Image Type is required"),
    link: z.string().url().or(z.literal("")).optional(),
    bg_img: fileValidator(hasDefaultBg, "Background image"),
  });

export type ImageCreateForm = z.infer<ReturnType<typeof ImageSchema>>;
export type ImageUpdateForm = z.infer<ReturnType<typeof ImageSchema>>;
