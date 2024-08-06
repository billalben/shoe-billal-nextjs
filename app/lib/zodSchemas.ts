import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long")
    .max(30, "Name must be at most 30 characters long"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long"),
  status: z.enum(["draft", "published", "archived"]),
  price: z
    .number()
    .min(1, "Price must be at least 1")
    .max(100000, "Price must be less than 100000"),
  images: z.array(z.string()).min(1, "At least one image is required"),
  category: z.enum(["men", "women", "kids"]),
  isFeatured: z.boolean().optional(),
});

export const bannerSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  imageString: z.string(),
});
