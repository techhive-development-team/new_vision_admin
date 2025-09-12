import z from "zod";

const MAX_FILE_SIZE = 1024 * 1024 * 5; // 5 MB
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

export const EducationPartnerSchema = z.object({
  overview: z.string().min(2, "Overview is required").max(2000),
  location: z.string().min(1, "Location is required"),
  foundedDate: z.string().optional(),
  partnerType: z.string().optional(),
  logo_img: z
    .any()
    .refine((file) => file, { message: "Logo image is required" })
    .refine((file) => file?.size <= MAX_FILE_SIZE, checkFileSize())
    .refine(
      (file) => ACCEPTED_IMAGE_MIME_TYPES.includes(file?.type),
      checkFileType()
    ),
  bg_img: z
    .any()
    .refine((file) => file, { message: "Background image is required" })
    .refine((file) => file?.size <= MAX_FILE_SIZE, checkFileSize())
    .refine(
      (file) => ACCEPTED_IMAGE_MIME_TYPES.includes(file?.type),
      checkFileType()
    ),
});

export type EducationPartnerCreateForm = z.infer<typeof EducationPartnerSchema>;

export type EducationPartnerUpdateForm = z.infer<typeof EducationPartnerSchema>;
