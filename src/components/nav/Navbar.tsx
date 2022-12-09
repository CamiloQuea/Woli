import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../buttons/Button";
import Input from "../forms/Input";
import Logo from "../icons/Logo";
import { AuthMenu } from "./AuthMenu";

export const Navbar = () => {
  const { push, query } = useRouter();
  const { register, reset, handleSubmit } = useForm<{ q: string }>({});

  const { status } = useSession();

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
    <div className="sticky top-0 z-10 flex h-16 items-center  gap-2  bg-white/90 border-b backdrop-blur-md">
      <div className="flex items-center ">
        <Logo
          className="stroke ml-4 flex h-10 w-10  shrink-0 grow-0  cursor-pointer items-center stroke-2 text-blue-500 transition-transform ease-in-out hover:-rotate-12"
          onClick={() => push("/")}
        />

        <nav className="ml-5 font-medium text-neutral-500 hover:underline">
          <Link href={"/nosotros"}>Nosotros</Link>
        </nav>
      </div>
      {status === "authenticated" ? (
        <div className=" ml-auto flex w-96 items-center justify-center self-center">
          <form
            onSubmit={onSubmit}
            className="flex w-full max-w-xl items-center rounded-full bg-neutral-100"
          >
            <Input
              {...register("q")}
              className="h-10 w-full rounded-lg bg-white px-5 focus:outline-none"
              type="text"
              placeholder="Buscar..."
              autoComplete="off"
              autoCorrect="off"
            />
          </form>
        </div>
      ) : null}
      {status === "authenticated" ? (
        <AuthMenu className=" ml-auto px-4" />
      ) : (
        <div className="ml-auto  flex items-center gap-3 whitespace-nowrap px-4">
          <Button
            size={"sm"}
            className="rounded"
            intent={"transparent"}
            onClick={() => push("/login")}
          >
            Iniciar sesión
          </Button>
          <Button
            size={"sm"}
            className="rounded"
            onClick={() => push("/register")}
          >
            Registrarse
          </Button>
        </div>
      )}
    </div>
  );
};
