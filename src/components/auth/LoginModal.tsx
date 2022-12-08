import { Dialog, Transition } from "@headlessui/react";
import { signIn } from "next-auth/react";
import React, { Fragment } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";

interface RegisterProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LoginModal = ({ isOpen, setIsOpen }: RegisterProps) => {
  const { register, handleSubmit } = useForm();
  const onSubmit = handleSubmit((data) => console.log(data));
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={() => setIsOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
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
          <div className="fixed inset-0 overflow-y-auto ">
            <div className="flex min-h-full items-center justify-center p-4">
              <Dialog.Panel className={`mx-auto rounded-lg bg-white `}>
                <div className=" w-[350px] py-5">
                  <div className="p-3 px-4 text-center text-xl font-medium text-neutral-500">
                    Inicia sesión
                  </div>
                  <div className="py-3 ">
                    <form
                      onSubmit={onSubmit}
                      className={
                        "flex flex-col items-center justify-center gap-5"
                      }
                    >
                      <input
                        {...register("exampleRequired", { required: true })}
                        type="text"
                        placeholder="Usuario"
                        className="w-80"
                      />
                      <input
                        {...register("exampleRequired", { required: true })}
                        type="text"
                        placeholder="Contraseña"
                        className="w-80 "
                      />
                    </form>
                  </div>

                  <div className="flex items-center justify-center py-3">
                    <div className="h-0.5 w-1/5 bg-neutral-200"></div>
                    <div className="mx-2 text-neutral-400">o</div>
                    <div className="h-0.5 w-1/5 bg-neutral-200"></div>
                  </div>
                  <div className=" px-3 py-3">
                    <div className="flex justify-center">
                      <div
                        className="flex cursor-pointer select-none items-center space-x-2 rounded-xl border px-4 py-2 shadow-md hover:bg-neutral-50"
                        onClick={() => signIn("google")}
                      >
                        <FcGoogle />
                        <div className="text-sm font-medium ">
                          Continuar con Google
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};
