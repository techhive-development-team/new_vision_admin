import z from "zod";

const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
];

const fileValidator = (hasDefault = false, fieldName = "studentImage") =>
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

export const StudentSchema = (hasDefaultImage = false) =>
  z.object({
    name: z.string().min(1, "Name is required"),
    parentName: z.string().min(1, "Parent name is required"),
    parentJob: z.string().min(1, "Parent job is required"),
    dob: z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date" }),
    email: z.string().email("Invalid email"),
    address: z.string().min(1, "Address is required"),
    postalCode: z.string().min(1, "Postal code is required"),
    phone: z.string().min(1, "Phone is required"),
    studentImage: fileValidator(hasDefaultImage, "Student image").optional(),
    school: z.enum(["GOVERNMENT", "INTERNATIONAL", "BOTH", "NOTHING"]),
    studyAbroad: z.boolean(),
    futurePlan: z.string().min(1, "Future plan is required"),
    futureCountryId: z.string().optional(),
    futureCountryName: z.string().optional(),
    futureuniversityName: z.string().optional(),
    potentialYearOfStudy: z
      .string()
      .optional()
      .refine((val) => !val || !isNaN(Date.parse(val)), {
        message: "Invalid date",
      }),
    joinRaffles: z.enum(["YES", "NO", "MAYBE"]),
    paymentOption: z.enum(["CASH", "BANK_TRANSFER"]),
    status: z.enum(["NONE", "PENDING", "COMPLETED", "FAILED"]),
    transactionId: z.string().optional(),
    coursesId: z.string().min(1, "Course is required"), 
  });

export type StudentEditForm = z.infer<ReturnType<typeof StudentSchema>>;
