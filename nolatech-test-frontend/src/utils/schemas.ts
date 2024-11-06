import { z } from 'zod';

// Esquema para el login
export const loginSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 6 characters long" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// Esquema para el registro
export const registerSchema = z.object({
  username: z
    .string()
    .min(1, { message: "username is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),

  role: z
    .enum(["Admin", "Manager", "Employee"])
    .default("Employee"),  // Valor por defecto
})


export type RegisterFormData = z.infer<typeof registerSchema>;
