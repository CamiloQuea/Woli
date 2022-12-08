import type { GetServerSideProps } from "next";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { GoogleLogin } from "../components/buttons/GoogleLogin";
import Input from "../components/forms/Input";
import { AuthLayout } from "../layout/AuthLayout";
import { getServerAuthSession } from "../server/common/get-server-auth-session";

const Login = () => {
  const { register, handleSubmit } = useForm<{
    username: string;
    password: string;
  }>();
  const { push } = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    
    const status = await signIn("credentials", {
      ...data,
      redirect: false,
      callbackUrl: "/",
    });

    if (status?.ok) {
      push("/");
    }
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
          onClick={() => push("/register")}
          className="absolute top-0 right-0 flex items-center gap-2  text-sm font-light  text-neutral-400 transition-colors hover:text-neutral-600"
        >
          Registrarse
          <AiOutlineArrowRight />
        </button>
        <div className="flex h-1/4  items-end justify-center p-3 px-4 text-center text-xl font-medium text-neutral-500">
          <h1 className="text-2xl font-medium text-neutral-600">
            Inicia sesión
          </h1>
        </div>

        <form onSubmit={onSubmit} className={"mx-auto flex  flex-col gap-3"}>
          <Input
            {...register("username", { required: true })}
            autoCapitalize="off"
            autoCorrect="off"
            type="text"
            placeholder="Usuario"
            className=""
          />
          <Input
            {...register("password", { required: true })}
            type="password"
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

// server side props function with typescript types

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

export default Login;
