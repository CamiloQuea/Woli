import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const button = cva(
  ["p-3 transition-colors font-medium flex items-center justify-center"],
  {
    variants: {
      intent: {
        primary: [
          "bg-gradient-to-br from-green-500 to-blue-400 text-white hover:from-green-400 hover:to-blue-500",
        ],
        secondary: ["bg-gradient-to-r from-red-500 to-black text-white"],
        transparent: ["bg-transparent text-gray-500"],
        brand: ["bg-blue-500 text-white"],
      },
      size: {
        sm: ["h-8 px-2 text-sm"],
        md: ["h-10 px-3 text-base"],
        lg: ["h-12 px-4 text-lg"],
        full: ["w-full"],
      },
      loading: {
        true: [" cursor-not-allowed"],
      },
    },
    defaultVariants: {
      intent: "primary",
      size: "full",
    },
  }
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof button>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, intent, size, children, loading, ...props }, ref) => {
    return (
      <button
        {...props}
        ref={ref}
        className={`${button({ className, intent, size, loading })}`}
      >
        {loading ? <AiOutlineLoading3Quarters className="animate-spin-fast"/> : children}
      </button>
    );
  }
);

Button.displayName = "Button";
