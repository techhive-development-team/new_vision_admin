import z from "zod";

const MAX_FILE_SIZE = 1024 * 1024 * 2;
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

const ScheduleSchema = z.object({
  day: z.enum([
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY",
  ]),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
}).refine(
  (data) => {
    if (data.startTime || data.endTime) {
      return data.startTime && data.endTime;
    }
    return true;
  },
  {
    message: "Both start time and end time must be provided",
    path: ["startTime"],
  }
).refine(
  (data) => {
    if (data.startTime && data.endTime) {
      return data.endTime > data.startTime;
    }
    return true;
  },
  {
    message: "End time must be after start time",
    path: ["endTime"],
  }
);

export const CourseCreateSchema = (hasDefaultImage = false) =>
  z.object({
    name: z.string().min(1, "Course name is required"),
    programOverview: z.string().min(1, "Program overview is required"),
    duration: z.string().min(1, "Duration is required"),
    level: z.string().optional(),
    location: z.enum(["online", "onsite"], "Location is required"),
    programType: z.enum(
      ["ART_DESIGN", "TECHNOLOGY", "CHILDRENS_CREATIVE"],
      "Program type is required"
    ),
    expireDate: z
      .string()
      .optional()
      .refine((val) => !val || !isNaN(Date.parse(val)), {
        message: "Invalid date format",
      })
      .refine(
        (val) => {
          if (!val) return true;
          const selectedDate = new Date(val);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          return selectedDate >= today;
        },
        {
          message: "Expiration date cannot be in the past",
        }
      ),
    price: z
      .string()
      .optional()
      .refine((val) => !val || !isNaN(Number(val)), {
        message: "Price must be a number",
      }),
    quiz: z.string().url().or(z.literal("")).optional(),
    image: fileValidator(hasDefaultImage, "Image"),
    schedules: z.array(ScheduleSchema).optional(),
  });

export const CourseEditSchema = (hasDefaultImage = false) =>
  z.object({
    name: z.string().min(1, "Course name is required"),
    programOverview: z.string().min(1, "Program overview is required"),
    duration: z.string().min(1, "Duration is required"),
    level: z.string().optional(),
    location: z.enum(["online", "onsite"], "Location is required"),
    programType: z.enum(
      ["ART_DESIGN", "TECHNOLOGY", "CHILDRENS_CREATIVE"],
      "Program type is required"
    ),
    expireDate: z
      .string()
      .optional()
      .refine((val) => !val || !isNaN(Date.parse(val)), {
        message: "Invalid date format",
      })
      .refine(
        (val) => {
          if (!val) return true;
          const selectedDate = new Date(val);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          return selectedDate >= today;
        },
        {
          message: "Expiration date cannot be in the past",
        }
      ),
    price: z
      .string()
      .optional()
      .refine((val) => !val || !isNaN(Number(val)), {
        message: "Price must be a number",
      }),
    quiz: z.string().url().or(z.literal("")).optional(),
    image: fileValidator(hasDefaultImage, "Image"),
    isOpened: z.boolean(),
    schedules: z.array(ScheduleSchema).optional(),
  });

export type CourseCreateForm = z.infer<ReturnType<typeof CourseCreateSchema>>;
export type CourseEditForm = z.infer<ReturnType<typeof CourseEditSchema>>;