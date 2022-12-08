import { Popover, Transition } from "@headlessui/react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React, { Fragment } from "react";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineLogin, AiOutlineLogout, AiOutlineUser } from "react-icons/ai";
import { LoginModal } from "../auth/LoginModal";
import { useRouter } from "next/router";

interface AuthMenuProps {
  className?: string;
}

export const AuthMenu = ({ className }: AuthMenuProps) => {
  // const [isOpen, setIsOpen] = React.useState(false);
  const { data: session } = useSession();
  const { push } = useRouter();
 
  return (
    <>
      <Popover className={`relative ${className}`}>
        {({ open, close }) => (
          <>
            <div className="flex items-center">
              <span className="mr-2 text-xs text-neutral-500">
                {session?.user?.name}
              </span>
              <Popover.Button className={"flex items-center outline-none"}>
                <div className="h-7 w-7 ">
                  {session ? (
                    session.user?.image ? (
                      <Image
                        src={session.user.image}
                        alt="User profile picture"
                        width={35}
                        height={35}
                        className="h-full w-full rounded-full border-[1px]"
                      />
                    ) : (
                      <FaUserCircle className="h-full w-full text-neutral-600" />
                    )
                  ) : (
                    <FaUserCircle className="h-full w-full text-neutral-600" />
                  )}
                </div>
              </Popover.Button>
            </div>

            <Transition
              show={open}
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Popover.Panel
                className={
                  "absolute top-full right-0 z-20 mt-1 w-40 border bg-neutral-50 shadow"
                }
              >
                {!session ? (
                  <ul className="flex flex-col text-sm ">
                    <li
                      className="flex cursor-pointer items-center gap-2 p-2 hover:bg-neutral-100"
                      onClick={() => {
                        push(`/login`);
                      }}
                    >
                      <AiOutlineLogin />
                      <span>Ingresa</span>
                    </li>
                    <li
                      className="flex cursor-pointer items-center gap-2 p-2 hover:bg-neutral-100"
                      onClick={() => {
                        push(`/register`);
                      }}
                    >
                      <AiOutlineLogin />
                      <span>Registrarse</span>
                    </li>
                  </ul>
                ) : (
                  <ul className="flex flex-col text-sm ">
                    <li
                      className="flex cursor-pointer items-center gap-2 p-2 text-sm font-medium text-neutral-500 hover:bg-neutral-100"
                      onClick={() => {
                        push(`/${session?.user?.id}`);
                      }}
                    >
                      <AiOutlineUser />
                      <span>Perfil</span>
                    </li>
                    <li
                      className="flex cursor-pointer items-center gap-2 p-2 text-sm font-medium text-red-500 hover:bg-neutral-100"
                      onClick={async () => {
                        await signOut({});
                        close();
                      }}
                    >
                      <AiOutlineLogout />
                      <span>Cerrar sesión</span>
                    </li>
                  </ul>
                )}
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
      {/* <LoginModal isOpen={isOpen} setIsOpen={setIsOpen} /> */}
    </>
  );
};
