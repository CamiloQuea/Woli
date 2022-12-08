import { Dialog, Transition } from "@headlessui/react";
import type { FC } from "react";
import React, { Fragment } from "react";
import { CloseButton } from "../../buttons/CloseButton";

interface ModalProps {
  children?: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  showCloseButton?: boolean;
  tittle?: string;
}

export const Modal: FC<ModalProps> = ({
  children,
  isOpen,
  onClose,
  className,
  showCloseButton,
  tittle,
}) => {
  return (
    // <Transition appear show={isOpen} as={Fragment}>
    //   <Dialog
    //     as="div"
    //     className="absolute inset-0 z-10 overflow-y-auto flex items-center justify-center px-4 "
    //     onClose={onClose}
    //   >
    //     {/* <div className="flex items-center justify-center min-h-screen px-4"> */}
    //     <Transition.Child
    //       as={Fragment}
    //       enter="ease-out duration-300"
    //       enterFrom="opacity-0"
    //       enterTo="opacity-100"
    //       leave="ease-in duration-200"
    //       leaveFrom="opacity-100"
    //       leaveTo="opacity-0"
    //     >
    //       <Dialog.Backdrop className="fixed inset-0 bg-neutral-900/[20%] backdrop-blur-[2px] " />
    //     </Transition.Child>

    //     <Transition.Child
    //       as={Fragment}
    //       enter="ease-out duration-300"
    //       enterFrom="opacity-0 scale-95"
    //       enterTo="opacity-100 scale-100"
    //       leave="ease-in duration-200"
    //       leaveFrom="opacity-100 scale-100"
    //       leaveTo="opacity-0 scale-95"
    //     >
    //       <Dialog.Panel as='div' className={`${className} bg-white min-w-0 absolute m-2`}>

    //         <Dialog.Title
    //           as="div"
    //           className="text-lg font-medium leading-6 text-neutral-500 py-5 px-4 border-b border-neutral-200"
    //         >
    //           {tittle}
    //         </Dialog.Title>
    //         {showCloseButton && (
    //           <CloseButton
    //             className="absolute top-0 right-0 m-2"
    //             onClick={onClose}
    //           />)
    //         }

    //         {children}

    //       </Dialog.Panel>
    //     </Transition.Child>
    //     {/* </div> */}
    //   </Dialog>
    // </Transition>
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Backdrop className="fixed inset-0 z-20 bg-neutral-900/[20%] backdrop-blur-[2px] " />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Dialog.Panel
                className={`mx-auto rounded-lg bg-white relative ${className}`}
              >
                <div className="relative">
                  {tittle ? (
                    <Dialog.Title
                      as="div"
                      className="border-b border-neutral-200 py-5 px-4 text-lg font-medium leading-6 text-neutral-500"
                    >
                      {tittle}
                    </Dialog.Title>
                  ) : null}
                </div>

                {children}
                {showCloseButton && (
                  <CloseButton
                    className="absolute top-0 right-0 m-2"
                    onClick={onClose}
                  />
                )}
              </Dialog.Panel>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};
