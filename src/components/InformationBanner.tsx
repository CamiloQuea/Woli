import React from "react";

export const InformationBanner = () => {
  return (
    <section className="relative bg-neutral-800">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="pt-24 pb-12 md:pt-32 md:pb-32">
          {/* 3 price cards */}
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
              <span className="block">¿Que es Woli?</span>
              <span className="block text-blue-500">
                Woli es una plataforma que te ayuda a reciclar
              </span>
            </h2>
            <p className="mx-auto mt-5 max-w-prose text-xl text-neutral-300">
                Te permite encontrar personas que necesiten tus residuos y agilizara el proceso administrativo de reciclarlos.
            </p>
          </div>
        </div>
       
      </div>
    </section>
  );
};
