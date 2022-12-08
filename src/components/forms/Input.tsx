import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import React from "react";

const input = cva(["px-3 py-2  border-[1px] outline-none "], {
  variants: {
    intent: {
      primary: ["text-neutral-600 "],
      secondary: ["bg-gray-500 text-white"],
      transparent: ["bg-transparent text-gray-500"],
    },
    size: {
      sm: ["h-8 px-2 text-sm"],
      md: ["h-10 px-3 text-base"],
      lg: ["h-12 px-4 text-lg"],
      full: ["w-full"],
    },
  },

  defaultVariants: {
    intent: "primary",
    size: "full",
  },
});

type InputProps = VariantProps<typeof input> &
  React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ intent, size, className, ...props }, ref) => {
    return (
      <input
        {...props}
        ref={ref}
        className={`${input({ intent, size, className })} `}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
