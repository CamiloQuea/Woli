import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { FaUserCircle } from "react-icons/fa";

interface UserIconProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl?: string;
  currentUser?: boolean;
}

export const UserIcon = ({
  className,
  imageUrl,
  currentUser,
  ...props
}: UserIconProps) => {
  const { data: session } = useSession();

  return (
    <div
      className={` ${className} h-7 w-7 shrink-0 rounded-full bg-white text-neutral-600 `}
      {...props}
    >
      {currentUser && session?.user?.image ? (
        <Image
          src={session?.user?.image}
          alt="User profile picture"
          width={35}
          height={35}
          className="h-full w-full rounded-full border-[1px]"
        />
      ) : imageUrl ? (
        <Image
          src={imageUrl}
          alt="User profile picture"
          width={35}
          height={35}
          className="h-full w-full rounded-full border-[1px]"
        />
      ) : (
        <FaUserCircle className="h-full w-full " />
      )}

      {/*       
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt="User profile picture"
          width={35}
          height={35}
          className="h-full w-full rounded-full border-[1px]"
        />
      ) : session?.user?.image ? (
        <>
          <Image
            src={session.user.image}
            alt="User profile picture"
            width={35}
            height={35}
            className="h-full w-full rounded-full border-[1px]"
          />
        </>
      ) : (
        <FaUserCircle className="h-full w-full " />
      )}
 */}
    </div>
  );
};
