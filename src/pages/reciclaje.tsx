import type { RecyclingRequest } from "prisma/prisma-client";
import { createColumnHelper, getCoreRowModel } from "@tanstack/react-table";
import React from "react";
import { useForm } from "react-hook-form";
import { Table } from "../components/Table";
import { MainLayout } from "../layout/MainLayout";
import type { RouterInputs } from "../utils/trpc";
import { trpc } from "../utils/trpc";
import moment from "moment";

const Reciclaje = () => {
  const { data, refetch } = trpc.recyclingRequest.getAll.useQuery();
  const { mutate: create } = trpc.recyclingRequest.create.useMutation();
  const { register, handleSubmit } =
    useForm<RouterInputs["recyclingRequest"]["create"]>();
  const onSubmit = handleSubmit((data) => {
    create(
      {
        ...data,
        avgMaterialWeight: parseFloat(data.avgMaterialWeight.toString()),
      },
      {
        onSuccess: () => {
          
          refetch();
        },
      }
    );
  });

  

  const columnHelper = createColumnHelper<RecyclingRequest>();

  return (
    <MainLayout>
      <div className="mx-auto h-full w-full px-5 py-6 lg:w-[1000px] ">
        <form
          onSubmit={onSubmit}
          className="flex w-full  flex-col gap-4 rounded-xl border bg-white p-3 md:w-96"
        >
          <span className="text-xl">Ingreso</span>
          <div className="  flex w-full flex-col gap-10 xs:flex-row ">
            <input
              className="w-full xs:w-1/2"
              placeholder="Tipo de material..."
              {...register("material")}
              type="text"
            />
            <input
              className="w-full xs:w-1/2"
              placeholder="Peso del material..."
              {...register("avgMaterialWeight")}
              type="text"
            />
          </div>
          <textarea
            placeholder="Descripción"
            {...register("description")}
            className="w-full"
          />
          <button
            type="submit"
            className="rounded-3xl bg-red-600 py-1 text-white"
          >
            Ingresar
          </button>
        </form>
        <div>
          <h1 className="py-6 text-xl font-medium">
            Lista de peticiones de reciclaje
          </h1>
          <div>
            <Table
              columns={[
                columnHelper.accessor("material", {
                  header: "Material",
                  cell: (row) => row.getValue(),
                }),
                columnHelper.accessor("avgMaterialWeight", {
                  header: "Peso",
                  cell: (row) => row.getValue(),
                }),
                columnHelper.accessor("createdAt", {
                  header: "Fecha de creación",
                  cell: (row) => moment(row.getValue()).format("DD/MM/YYYY"),
                }),
                columnHelper.accessor("updatedAt", {
                  header: "Fecha de creación",
                  cell: (row) => moment(row.getValue()).format("DD/MM/YYYY"),
                }),
                columnHelper.accessor("status", {
                  header: "Estado",
                  cell: (row) => row.getValue(),
                }),
              ]}
              data={data || []}
              getCoreRowModel={getCoreRowModel()}
            />
            {/* {data?.map((recyclingRequest) => (
              <div key={recyclingRequest.id}>
              <h2>{recyclingRequest.id}</h2>
              <p>{recyclingRequest.status}</p>
              <p>{recyclingRequest.material}</p>
              <p>{recyclingRequest.avgMaterialWeight.toString()}</p>
              <p>{recyclingRequest.description}</p>
              <p>{recyclingRequest.description}</p>
              <p>{recyclingRequest.createdAt.toString()}</p>
              </div>
            ))} */}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Reciclaje;
