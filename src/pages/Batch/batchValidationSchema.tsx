import { z } from "zod";

const isValidDate = (date: string) => !isNaN(Date.parse(date));

export const batchCreateSchema = z
  .object({
    name: z.string().min(1, "Batch name is required"),
    startDate: z
      .string()
      .min(1, "Start date is required")
      .refine(isValidDate, { message: "Start date must be a valid date" }),
    endDate: z
      .string()
      .min(1, "End date is required")
      .refine(isValidDate, { message: "End date must be a valid date" }),
    capacity: z
      .string()
      .min(1, "Capacity is required")
      .transform((val) => Number(val))
      .refine((val) => !isNaN(val), {
        message: "Capacity must be a valid number",
      })
      .refine((val) => Number.isInteger(val), {
        message: "Capacity must be an integer",
      })
      .refine((val) => val >= 1 && val <= 100, {
        message: "Capacity must be between 1 and 100",
      }),

    courseId: z.string().min(1, "Course ID is required"),
  })
  .refine((data) => new Date(data.startDate) < new Date(data.endDate), {
    message: "Start date must be before end date",
    path: ["startDate"],
  });

export type batchCreateForm = z.infer<typeof batchCreateSchema>;
