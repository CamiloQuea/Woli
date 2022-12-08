import React from "react";
import { MainLayout } from "../layout/MainLayout";

const Nosotros = () => {
  return (
    <MainLayout className="flex h-full flex-col">
      <div className=" flex flex-grow flex-col bg-gradient-to-br from-green-500  to-blue-500">
        {/* <div className="absolute  inset-0   scale-110 bg-gradient-to-br from-green-600  to-blue-200 opacity-70 blur" /> */}
        <div className="relative flex h-40 items-center overflow-hidden border-b bg-white px-10  py-6   text-4xl font-medium text-neutral-600 shadow">
          <h1 className="">Nosotros</h1>
        </div>

        {/* Nosotros component with information about the company */}
        <div className="mx-auto flex  w-[900px] grow flex-col gap-10 border-x bg-white  px-10  text-justify text-white  divide-y-[1px] [&>section]:pt-8 pb-10">
          <section className="">
            <div className="text-3xl  text-neutral-600">Misión:</div>
            <p className="pt-4 text-sm font-thin tracking-[1px] text-neutral-500">
              La misión de la pagina WOLI es la de contribuir a la conservación
              y manejo sostenible de los recursos naturales y del medio ambiente
              desde la justicia y solidaridad, participando en la ejecución y
              administración de proyectos estratégicos de desarrollo ambiental
              en el ámbito local, nacional e internacional.
            </p>
          </section>
          <section>
            <div className="text-3xl text-neutral-600">Visión:</div>
            <p className="pt-4 text-sm font-thin tracking-[1px] text-neutral-900">
              Woli quiere ser reconocida como una organización líder y
              consolidada en materia ambiental, comprometida con el mejoramiento
              de la calidad de vida de la población y el manejo sostenible de
              los recursos naturales, en un mundo donde los pueblos vivan en
              igualdad y dignidad y en armonía con la naturaleza.
            </p>
          </section>
          <section>
            <div className="mx-auto w-[900px] text-3xl  text-neutral-600">
              Valores:
            </div>
            <ul className="flex flex-col gap-4 text-center">
              <li className="flex  flex-col gap-3 pt-4 text-sm text-neutral-500">
                <span className="text-lg font-medium">Compromiso:</span>
                <p className="font-thin tracking-wide text-neutral-900">
                  Es la responsabilidad de cada uno de los miembros de la
                  organización con la misión y visión de la organización.
                </p>
              </li>
              <li className="flex flex-col gap-3 pt-4 text-sm text-neutral-500">
                <span className="text-lg font-medium ">Transparencia:</span>
                <p className="font-thin tracking-wide text-neutral-900">
                  Es la capacidad de la organización para ser honesta y abierta
                  en sus acciones y decisiones.
                </p>
              </li>
              <li className="flex flex-col gap-3 pt-4 text-sm text-neutral-500">
                <span className="text-lg font-medium">Respeto:</span>
                <p className="font-thin tracking-wide text-neutral-900">
                  Es la capacidad de la organización para reconocer y valorar la
                  diversidad de personas, ideas y opiniones.
                </p>
              </li>
              <li className="flex flex-col gap-3 pt-4 text-sm text-neutral-500">
                <span className="text-lg font-medium">Solidaridad:</span>
                <p className="font-thin tracking-wide text-neutral-900">
                  Es la capacidad de la organización para trabajar en equipo y
                  compartir los recursos disponibles.
                </p>
              </li>
              <li className="flex flex-col gap-3 pt-4 text-sm text-neutral-500">
                <span className="text-lg font-medium">Responsabilidad:</span>
                <p className="font-thin tracking-wide text-neutral-900">
                  Es la capacidad de la organización para cumplir con sus
                  compromisos y asumir las consecuencias de sus acciones.
                </p>
              </li>
              <li className="flex flex-col gap-3 pt-4 text-sm text-neutral-500">
                <span className="text-lg font-medium">Innovación:</span>
                <p className="font-thin tracking-wide text-neutral-900">
                  Es la capacidad de la organización para generar nuevas ideas y
                  soluciones.
                </p>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </MainLayout>
  );
};

export default Nosotros;
