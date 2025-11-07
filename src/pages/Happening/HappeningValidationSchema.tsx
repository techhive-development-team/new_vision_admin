import { z } from "zod";

const MAX_FILE_SIZE = 1024 * 1024 * 20; // 20MB
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
];

const isFile = (value: unknown): value is File =>
  typeof File !== "undefined" && value instanceof File;

const fileValidator = (hasDefault = false, fieldName = "") =>
  z
    .union([
      z.custom<File>((val) => isFile(val), {
        message: `${fieldName} is required`,
      }),
      z.string().min(1, `${fieldName} is required`),
    ])
    .refine((file) => hasDefault || isFile(file), `${fieldName} is required`)
    .refine(
      (file) =>
        isFile(file) ? ACCEPTED_IMAGE_MIME_TYPES.includes(file.type) : true,
      `Only ${ACCEPTED_IMAGE_MIME_TYPES.join(", ")} formats are supported`
    )
    .refine(
      (file) => (isFile(file) ? file.size <= MAX_FILE_SIZE : true),
      `${fieldName} must be less than ${MAX_FILE_SIZE / (1024 * 1024)}MB`
    );

export const HappeningSchema = (hasMainImage = false) =>
  z.object({
    title: z.string().min(1, "Title is required").trim(),
    description: z.string().min(1, "Description is required").trim(),
    embeddedLink: z.string().url().or(z.literal("")).optional(),
    happeningTypeId: z.string().min(1, "Happening Type is required"),
    mainImage: fileValidator(hasMainImage, "Background Image"),
    album_images: z
      .array(z.custom<File>((val) => isFile(val)))
      .max(10, "You can upload up to 10 images only"),
  });

export type HappeningCreateForm = z.infer<ReturnType<typeof HappeningSchema>>;