import type { FC } from 'react';
import React from 'react';
import { MdClose } from 'react-icons/md';

interface CloseButtonProps {
  onClick?: () => void;
  className?: string;
}

export const CloseButton: FC<CloseButtonProps> = ({ onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`rounded-full p-1 text-neutral-400 ${className}`}
    >
      <MdClose />
    </button>
  );
};
