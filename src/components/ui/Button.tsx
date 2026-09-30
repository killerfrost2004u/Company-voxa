import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "action" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          // Base styles adhering to UI/UX directives (focus rings, minimum touch targets)
          "inline-flex items-center justify-center whitespace-nowrap rounded-full font-bold transition-all duration-300",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:pointer-events-none disabled:opacity-50 active:scale-95",
          
          // Variants
          variant === "default" && "bg-accent text-background hover:shadow-[0_0_20px_var(--color-accent)] hover:bg-accent-secondary",
          variant === "action" && "bg-action-gradient text-white hover:shadow-[0_0_40px_var(--color-action)]",
          variant === "outline" && "border border-white/10 bg-transparent text-foreground hover:bg-white/5",
          variant === "ghost" && "hover:bg-white/5 text-foreground hover:text-accent",
          
          // Sizes (minimum 44px height for mobile touch targets per UI/UX directives)
          size === "default" && "h-12 px-6 py-3 text-base",
          size === "sm" && "h-10 px-4 text-sm", // Caution: 40px is slightly under iOS 44px ideal, best for dense UIs
          size === "lg" && "h-14 px-8 text-lg",
          size === "icon" && "h-12 w-12",
          
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
