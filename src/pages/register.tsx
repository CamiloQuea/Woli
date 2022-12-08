import type { GetServerSideProps } from "next";

import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

import { GoogleLogin } from "../components/buttons/GoogleLogin";
import { AuthLayout } from "../layout/AuthLayout";
import { getServerAuthSession } from "../server/common/get-server-auth-session";
import type { RouterInputs } from "../utils/trpc";
import { trpc } from "../utils/trpc";

const Register = () => {
  const { handleSubmit, register } = useForm<RouterInputs["user"]["create"]>();

  const { mutate } = trpc.user.create.useMutation();

  const { push } = useRouter();

  const onSubmit = handleSubmit((data) => {
    mutate(data, {
      onSuccess: () => {
        console.log("user created");
        push("/login");
      },
      onError: (err) => {
        console.log(err.data);
      },
    });
  });

  return (
    <AuthLayout>
      <div className=" relative mx-auto h-full max-w-[400px] ">
        <button
          onClick={() => push("/")}
          className="absolute top-0 left-0 flex items-center gap-2  text-sm font-light  text-neutral-400 transition-colors hover:text-neutral-600"
        >
          <AiOutlineArrowLeft />
          Inicio
        </button>
        <button
          onClick={() => push("/login")}
          className="absolute top-0 right-0 flex items-center gap-2  text-sm font-light  text-neutral-400 transition-colors hover:text-neutral-600"
        >
          Iniciar sesión
          <AiOutlineArrowRight />
        </button>
        <div className="flex h-1/4  items-end justify-center p-3 px-4 text-center text-xl font-medium text-neutral-500">
          <h1 className="text-2xl font-medium text-neutral-600">Registrate</h1>
        </div>

        <form onSubmit={onSubmit} className={"mx-auto flex  flex-col gap-3"}>
          <input
            {...register("username", { required: true })}
            autoCapitalize="off"
            autoCorrect="off"
            autoComplete="off"
            type="text"
            placeholder="Usuario"
            className=""
          />
          <input
            {...register("password", { required: true })}
            type="password"
            autoComplete="off"
            placeholder="Contraseña"
            autoCapitalize="off"
            autoCorrect="off"
            className=""
          />
          <button
            type="submit"
            className="rounded bg-gradient-to-br from-blue-400 to-indigo-500 py-2 font-medium text-white"
          >
            Ingresar
          </button>
        </form>

        <div className="flex items-center justify-center py-3">
          <div className="h-0.5 w-1/5 bg-neutral-200"></div>
          <div className="mx-2 text-neutral-400">o</div>
          <div className="h-0.5 w-1/5 bg-neutral-200"></div>
        </div>
        <div className=" px-3 py-3">
          <div className="flex justify-center">
            <GoogleLogin />
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerAuthSession(context);

  if (session)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  return {
    props: {},
  };
};
export default Register;
