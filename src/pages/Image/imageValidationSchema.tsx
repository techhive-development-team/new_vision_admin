import z from "zod";

const MAX_FILE_SIZE = 1024 * 1024 * 5; 
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const checkFileSize = () => ({
  message: `File size must be less than ${MAX_FILE_SIZE / (1024 * 1024)}MB`,
});

const checkFileType = () => ({
  message: "Only .jpg, .jpeg, .png and .webp formats are supported",
});

export const ImageSchema = z.object({
  mainText: z.string().min(2).max(100),
  subText: z.string().optional(),
  imageTypeId: z.string().min(1, "Image Type is required"),
  link: z.string().url().or(z.literal("")).optional(),
  bgImg: z
    .any()
    .refine(
      (files) => {
        return files;
      },
      { message: "Background Image is required" }
    )
    .refine((files) => {
      return files?.size <= MAX_FILE_SIZE;
    }, checkFileSize())
    .refine((files) => {
      return ACCEPTED_IMAGE_MIME_TYPES.includes(files?.type);
    }, checkFileType()),
});

export type ImageCreateForm = z.infer<typeof ImageSchema>;
