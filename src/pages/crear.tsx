import Head from "next/head";
import React from "react";
import { MainLayout } from "../layout/MainLayout";

const Crear = () => {
  return (
    <>
      <Head>
        <title>Woli</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="png" href="/a.png" />
      </Head>
      <MainLayout>
        <div className="flex h-full w-full flex-col p-3">
          <h1 className=" text-xl font-bold text-neutral-500">CREATE POST</h1>
          <p className=" text-neutral-500">Comparte tus conocimientos</p>
        </div>

        <div className="p-3">
          <form className="flex flex-col gap-3">
            <input type="text" placeholder="Titulo" />
            <textarea placeholder="Contenido..." className="h-48" />
            <div>
              <button
                className="rounded-xl bg-red-600 px-3 py-2 text-white "
                type="submit"
              >
                Publicar
              </button>
            </div>
          </form>
        </div>
      </MainLayout>
    </>
  );
};

export default Crear;