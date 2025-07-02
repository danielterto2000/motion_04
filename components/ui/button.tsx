
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-button-gradient text-white shadow-medium hover:shadow-large hover:scale-105",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border-2 border-primary-200 bg-background hover:bg-primary-50 hover:border-secondary-400 hover:text-secondary-700 transition-all duration-300",
        secondary:
          "bg-white text-primary-800 border-2 border-primary-200 hover:border-secondary-400 hover:bg-primary-50 shadow-soft hover:shadow-medium",
        ghost: "text-primary-700 hover:bg-primary-100 hover:text-primary-900",
        link: "text-primary underline-offset-4 hover:underline",
        gradient: "bg-gradient-to-r from-secondary-500 to-purple-600 text-white shadow-medium hover:shadow-glow hover:scale-105",
        success: "bg-gradient-to-r from-accent-500 to-emerald-600 text-white shadow-medium hover:shadow-large hover:scale-105",
        warning: "bg-gradient-to-r from-warning-500 to-orange-600 text-white shadow-medium hover:shadow-large hover:scale-105",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-lg px-4",
        lg: "h-12 rounded-xl px-8 text-base",
        xl: "h-14 rounded-xl px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
