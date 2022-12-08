import { Dialog } from "@headlessui/react";
import { forwardRef } from "react";

// eslint-disable-next-line react/display-name
export const Backdrop = () => {
  return <Dialog.Backdrop className="fixed inset-0 bg-neutral-900/[20%] backdrop-blur-[2px] " />
};
