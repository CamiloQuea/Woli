import { Transition } from "@headlessui/react";
import React, { FC } from "react";
import toast, {
  resolveValue,
  Toast,
  ToastIcon,
  ToastType,
} from "react-hot-toast";
// import { useToasterStore } from 'react-hot-toast';

interface ToastModalProps {
  toast: Toast;
}

const bg: { [key in ToastType]: string } = {
  success: "bg-green-100",
  error: "bg-red-100",
  loading: "bg-blue-100",
  custom: "bg-gray-100",
  blank: "bg-gray-100",
};

export const ToastModal: FC<ToastModalProps> = ({ toast: t }) => {


  return (
    <Transition
      appear
      show={t.visible}
      onClick={() => {

        toast.dismiss(t.id);
      }}
      className={`flex transform cursor-pointer select-none items-center rounded border-[1px] px-2 py-3 shadow-lg ${
        bg[t.type]
      }`}
      enter="transition-all duration-150"
      enterFrom="opacity-0 scale-50"
      enterTo="opacity-100 scale-100"
      leave="transition-all duration-150"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-75"
    >
      <ToastIcon toast={t} />
      {/* {toast.icon} */}
      <p className="z-50 px-2 text-sm font-medium">
        {resolveValue(t.message, t)}
      </p>
    </Transition>
  );
};
