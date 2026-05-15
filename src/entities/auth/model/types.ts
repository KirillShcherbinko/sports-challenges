import z from "zod";
import { loginSchema, registerSchema } from "./shemas";

export type TLoginSchema = z.infer<typeof loginSchema>;
export type TRegisterSchema = z.infer<typeof registerSchema>;
