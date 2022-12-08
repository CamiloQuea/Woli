import Link from "next/link";
import { useRouter } from "next/router";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Logo from "../icons/Logo";
import { AuthMenu } from "./AuthMenu";

export const Navbar = () => {
  const { push, query } = useRouter();
  const { register, reset, handleSubmit } = useForm<{ q: string }>({});

  useEffect(() => {
    reset({
      q: (query.q as string) || "",
    });
  }, [query, reset]);

  const onSubmit = handleSubmit((data) => {
    push({
      pathname: "/search",
      query: {
        q: data.q,
      },
    });
  });

  return (
    <div className="sticky top-0 flex h-16 items-center gap-2 border-b bg-white shadow-md z-10">
      <Logo
        className="stroke ml-4  flex h-10  w-10 grow-0  cursor-pointer items-center stroke-2 text-blue-500 transition-transform ease-in-out hover:-rotate-12"
        onClick={() => push("/")}
      />

      <nav className="ml-5 font-medium text-neutral-500 hover:underline">
        <Link href={"/nosotros"}>Nosotros</Link>
      </nav>
      <div className=" ml-auto flex w-96 items-center justify-center self-center">
        <form
          onSubmit={onSubmit}
          className="flex w-full max-w-xl items-center rounded-full bg-neutral-100"
        >
          <input
            {...register("q")}
            className="h-10 w-full rounded-full bg-neutral-100 px-4 focus:outline-none"
            type="text"
            placeholder="Buscar..."
            autoComplete="off"
            autoCorrect="off"
          />
        </form>
      </div>
      <AuthMenu className=" mr-5" />
    </div>
  );
};
