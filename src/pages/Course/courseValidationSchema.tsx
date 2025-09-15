import z from "zod";

export const CourseCreateSchema = z.object({
  name: z.string().min(1, "Course name is required"),
  programOverview: z.string().min(1, "Program overview is required"),
  duration: z.string().min(1, "Duration is required"),
  level: z.string().min(1, "Course level is required"),
  location: z.enum(["online", "onsite"], "Location is required"),
  expireDate: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    }),
  price: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(Number(val)), {
      message: "Price must be a number",
    }),
  quiz: z.string().url().or(z.literal("")).optional(),
  image: z.union([
    z.instanceof(File),
    z.string().min(1, "Background image is required"),
  ]),
  skills: z.array(z.string().min(1, "At least one skill is required")),
});

export const CourseEditSchema = z.object({
  name: z.string().min(1, "Course name is required"),
  programOverview: z.string().min(1, "Program overview is required"),
  duration: z.string().min(1, "Duration is required"),
  level: z.string().min(1, "Course level is required"),
  location: z.enum(["online", "onsite"], "Location is required"),
  expireDate: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    }),
  price: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(Number(val)), {
      message: "Price must be a number",
    }),
  quiz: z.string().url().or(z.literal("")).optional(),
  image: z.union([
    z.instanceof(File),
    z.string().min(1, "Background image is required"),
  ]),
  skills: z.array(z.string().min(1, "At least one skill is required")),
  isOpened: z.boolean(),
});

export type CourseCreateForm = z.infer<typeof CourseCreateSchema>;
export type CourseEditForm = z.infer<typeof CourseEditSchema>;
