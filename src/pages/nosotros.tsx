import React from "react";
import Logo from "../components/icons/Logo";
import { MainLayout } from "../layout/MainLayout";

const Nosotros = () => {
  return (
    <MainLayout className="flex h-full flex-col" secure={false}>
      <div className=" flex flex-grow flex-col  whitespace-pre-wrap">
        {/* <div className="absolute  inset-0   scale-110 bg-gradient-to-br from-green-600  to-blue-200 opacity-70 blur" /> */}
        <div className=" relative flex h-[500px] flex-col items-center justify-center gap-10  font-medium">
          <span className="text-center bg-gradient-to-r text-6xl font-bold from-blue-500 to-blue-400 bg-clip-text pr-1 text-transparent p-3">
            ¿Quienes somos nosotros?
          </span>
        
          <Logo className="h-56 w-56 text-black" />
        </div>

        {/* Nosotros component with information about the company */}
        <div className="flex grow flex-col gap-10    text-justify  text-white">
          <section className="flex h-96 grow items-center justify-center gap-10 bg-neutral-800 p-10 py-20">
            <div className="flex flex-col lg:flex-row max-w-3xl  items-center justify-center gap-10 ">
              <div className="text-6xl font-bold text-blue-600 ">Misión</div>
              <p className="pt-4 font-light tracking-[1px]  ">
                La misión de la pagina WOLI es la de contribuir a la
                conservación y manejo sostenible de los recursos naturales y del
                medio ambiente desde la justicia y solidaridad, participando en
                la ejecución y administración de proyectos estratégicos de
                desarrollo ambiental en el ámbito local, nacional e
                internacional.
              </p>
            </div>
          </section>
          <section className="flex h-96 flex-row-reverse items-center  justify-center gap-10 p-10">
            <div className="flex max-w-3xl flex-col lg:flex-row-reverse   items-center justify-center gap-10">
              <div className="text-6xl font-bold text-neutral-600">Visión</div>
              <p className=" tracking-[1px]  text-neutral-900">
                Woli quiere ser reconocida como una organización líder y
                consolidada en materia ambiental, comprometida con el
                mejoramiento de la calidad de vida de la población y el manejo
                sostenible de los recursos naturales, en un mundo donde los
                pueblos vivan en igualdad y dignidad y en armonía con la
                naturaleza.
              </p>
            </div>
          </section>
          <section className="flex items-center justify-center gap-10 bg-neutral-800 p-10">
            <div className="flex flex-col max-w-3xl  items-center justify-center gap-10">
              <div className="mx-auto font-bold text-6xl text-white">
                Valores
              </div>
              <ul className="flex flex-col gap-4 text-center">
                <li className="flex  flex-col gap-3 pt-4 text-sm text-neutral-500">
                  <span className="text-lg font-bold text-blue-600">Compromiso:</span>
                  <p className="font-medium tracking-wide text-white">
                    Es la responsabilidad de cada uno de los miembros de la
                    organización con la misión y visión de la organización.
                  </p>
                </li>
                <li className="flex flex-col pt-4 text-sm text-neutral-500">
                  <span className="text-lg font-bold text-blue-600">Transparencia:</span>
                  <p className="font-medium  tracking-wide text-white">
                    Es la capacidad de la organización para ser honesta y
                    abierta en sus acciones y decisiones.
                  </p>
                </li>
                <li className="flex flex-col gap-3 pt-4 text-sm text-neutral-500">
                  <span className="text-lg font-bold text-blue-600">Respeto:</span>
                  <p className="font-medium tracking-wide text-white">
                    Es la capacidad de la organización para reconocer y valorar
                    la diversidad de personas, ideas y opiniones.
                  </p>
                </li>
                <li className="flex flex-col gap-3 pt-4 text-sm text-neutral-500">
                  <span className="text-lg font-bold text-blue-600">Solidaridad:</span>
                  <p className="font-medium tracking-wide text-white">
                    Es la capacidad de la organización para trabajar en equipo y
                    compartir los recursos disponibles.
                  </p>
                </li>
                <li className="flex flex-col gap-3 pt-4 text-sm text-neutral-500">
                  <span className="text-lg font-bold text-blue-600">Responsabilidad:</span>
                  <p className="font-medium tracking-wide text-white">
                    Es la capacidad de la organización para cumplir con sus
                    compromisos y asumir las consecuencias de sus acciones.
                  </p>
                </li>
                <li className="flex flex-col gap-3 pt-4 text-sm text-neutral-500">
                  <span className="text-lg font-bold text-blue-600">Innovación:</span>
                  <p className="font-medium tracking-wide text-white">
                    Es la capacidad de la organización para generar nuevas ideas
                    y soluciones.
                  </p>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </MainLayout>
  );
};

export default Nosotros;
