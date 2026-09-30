import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind classes dynamically, resolving any conflicts safely.
 * This ensures that a component's default styles can be seamlessly overridden via props.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
