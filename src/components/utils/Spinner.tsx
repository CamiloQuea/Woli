import type { FC } from "react";
import { AiOutlineLoading } from "react-icons/ai";

interface SpinnerProps {
  className?: HTMLDivElement["className"];
}

export const Spinner: FC<SpinnerProps> = ({ className }) => {
  return <AiOutlineLoading className={`animate-spin-fast ${className}`} />;
};
