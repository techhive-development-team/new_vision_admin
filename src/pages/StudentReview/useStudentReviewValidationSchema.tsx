import z from "zod";

const MAX_FILE_SIZE = 1024 * 1024 * 2;
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

export const StudentReviewCreateSchema = z.object({
  name: z.string().min(2, "Name is required"),
  batch: z.string().min(2, "Batch is required"),
  student_img: z
    .any()
    .refine((file) => file instanceof File || typeof file === "string", {
      message: "Student Image is required",
    })
    .refine(
      (file) => !(file instanceof File) || file.size <= MAX_FILE_SIZE,
      checkFileSize()
    )
    .refine(
      (file) =>
        !(file instanceof File) ||
        ACCEPTED_IMAGE_MIME_TYPES.includes(file.type),
      checkFileType()
    ),
  educationPartnerId: z.string().min(1, "Education Partner Id is required"),
  review: z.string().optional(),
  qualification: z.string().optional(),
});

export type StudentReviewCreateForm = z.infer<typeof StudentReviewCreateSchema>;
export type StudentReviewUpdateForm = z.infer<typeof StudentReviewCreateSchema>;
