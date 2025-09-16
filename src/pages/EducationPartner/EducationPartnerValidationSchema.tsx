import { z } from "zod";

const MAX_FILE_SIZE = 1024 * 1024 * 5;
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

export const EducationPartnerSchema = (
  hasDefaultLogo = false,
  hasDefaultBg = false
) =>
  z.object({
    overview: z.string().min(2, "Overview is required").max(2000),
    location: z.string().min(1, "Location is required"),
    foundedDate: z.string().optional(),
    partnerType: z.enum(["INSTITUTE", "UNIVERSITY", "COLLEGE"]),

    logo_img: fileValidator(hasDefaultLogo, "Logo image"),
    bg_img: fileValidator(hasDefaultBg, "Background image"),
  });

export type EducationPartnerCreateForm = z.infer<
  ReturnType<typeof EducationPartnerSchema>
>;
export type EducationPartnerUpdateForm = z.infer<
  ReturnType<typeof EducationPartnerSchema>
>;
