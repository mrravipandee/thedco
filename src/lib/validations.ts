import { z } from "zod";

export const ContactFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(100, { message: "Name cannot exceed 100 characters" }),
  email: z
    .string()
    .email({ message: "Please enter a valid email address" }),
  company: z
    .string()
    .min(2, { message: "Company name must be at least 2 characters" })
    .max(100, { message: "Company name cannot exceed 100 characters" }),
  phone: z
    .string()
    .min(6, { message: "Please enter a valid phone number" })
    .max(30, { message: "Phone number cannot exceed 30 characters" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" })
    .max(2000, { message: "Message cannot exceed 2000 characters" }),
});

export type ContactFormData = z.infer<typeof ContactFormSchema>;

export const EnquiryFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Please enter your name." })
    .max(100, { message: "Name cannot exceed 100 characters." }),
  email: z
    .string()
    .email({ message: "Please enter a valid email address." }),
  company: z
    .string()
    .max(100, { message: "Company name cannot exceed 100 characters." })
    .optional()
    .or(z.literal("")),
  phone: z
    .string()
    .min(6, { message: "Please enter a valid phone number." })
    .max(30, { message: "Phone number cannot exceed 30 characters." }),
  projectType: z
    .string()
    .min(1, { message: "Please select a project type." }),
  location: z
    .string()
    .max(100, { message: "Location cannot exceed 100 characters." })
    .optional()
    .or(z.literal("")),
  projectStage: z
    .string()
    .optional()
    .or(z.literal("")),
  businessStatus: z
    .string()
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .min(10, { message: "Please tell us about your project (min 10 characters)." })
    .max(2000, { message: "Message cannot exceed 2000 characters." }),
  website: z
    .string()
    .optional(),
});

export type EnquiryFormData = z.infer<typeof EnquiryFormSchema>;
