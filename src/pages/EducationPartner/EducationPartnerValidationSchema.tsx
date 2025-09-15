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
  partnerType: z.enum(
    ["INSTITUTE", "UNIVERSITY", "COLLEGE"],
    "Partner Type is required"
  ),
  logo_img: z.union([
    z.instanceof(File),
    z.string().min(1, "Logo image is required"),
  ]),
  bg_img: z.union([
    z.instanceof(File),
    z.string().min(1, "Background image is required"),
  ]),
});

export type EducationPartnerCreateForm = z.infer<typeof EducationPartnerSchema>;

export type EducationPartnerUpdateForm = z.infer<typeof EducationPartnerSchema>;
