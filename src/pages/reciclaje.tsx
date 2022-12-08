import type { RecyclingRequest } from "prisma/prisma-client";
import { createColumnHelper, getCoreRowModel } from "@tanstack/react-table";
import React from "react";
import { useForm } from "react-hook-form";
import { Table } from "../components/Table";
import { MainLayout } from "../layout/MainLayout";
import type { RouterInputs } from "../utils/trpc";
import { trpc } from "../utils/trpc";
import moment from "moment";
import Input from "../components/forms/Input";

const Reciclaje = () => {
  const { data, refetch } = trpc.recyclingRequest.getAllMine.useQuery();
  const { mutate: create } = trpc.recyclingRequest.create.useMutation();
  const { data: allRequest, refetch: refetchPublicPetitions } =
    trpc.recyclingRequest.getAll.useQuery();
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
          refetchPublicPetitions();
        },
      }
    );
  });

  const columnHelper = createColumnHelper<RecyclingRequest>();
  const columnHelperAll =
    createColumnHelper<NonNullable<typeof allRequest>[0]>();

  return (
    <MainLayout secure={false}>
      <div className="mx-auto h-full w-full  py-6 px-10 ">
        <div className="flex h-full gap-2 ">
          <div className="grow rounded-xl border bg-white">
            <h1 className="border-b p-3 text-2xl font-bold">
              Informacion general
            </h1>
            {/* cantidad de peticiones de reciclaje */}
            <div className="flex flex-col gap-2 p-10 ">
              <span className="text-2xl font-bold">
                Peticiones de reciclaje
              </span>
              <span className="text-4xl font-bold">{data?.length || 0}</span>
            </div>
          </div>
          <form
            onSubmit={onSubmit}
            className="flex w-full  flex-col gap-4 rounded-xl border bg-white p-3 md:w-96"
          >
            <span className="text-xl font-bold">INGRESO</span>
            <div className="  flex w-full flex-col gap-10 xs:flex-row ">
              <Input
                className="w-full xs:w-1/2"
                placeholder="Tipo de material..."
                {...register("material")}
                type="text"
              />
              <Input
                className="w-full xs:w-1/2"
                placeholder="Peso del material..."
                {...register("avgMaterialWeight")}
                type="text"
              />
            </div>
            <textarea
              placeholder="Descripción"
              className="w-full border p-3"
              {...register("description")}
            />
            <button
              type="submit"
              className="rounded-3xl bg-red-600 py-1 text-white"
            >
              Ingresar
            </button>
          </form>
        </div>
        <div className="flex gap-5">
          <section className="w-full">
            <h1 className="py-6 text-xl font-medium">Tu lista de peticiones</h1>

            <Table
              className="h-full w-full"
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
                  header: "Fecha de actualización",
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
          </section>
          <section className="w-full">
            <h1 className="py-6 text-xl font-medium">Peticiones publicas</h1>

            <Table
              className="h-full w-full"
              columns={[
                columnHelperAll.accessor("material", {
                  header: "Material",
                  cell: (row) => row.getValue(),
                }),
                columnHelperAll.accessor("avgMaterialWeight", {
                  header: "Peso",
                  cell: (row) => row.getValue(),
                }),
                columnHelperAll.accessor("createdAt", {
                  header: "Fecha de creación",
                  cell: (row) => moment(row.getValue()).format("DD/MM/YYYY"),
                }),
                columnHelperAll.accessor("user", {
                  header: "Usuario",
                  cell: (row) =>
                    row.row.original.user.name ||
                    row.row.original.user.username,
                }),
                columnHelperAll.accessor("status", {
                  header: "Estado",
                  cell: (row) => row.getValue(),
                }),
              ]}
              data={allRequest || []}
              getCoreRowModel={getCoreRowModel()}
            />
          </section>
        </div>
      </div>
    </MainLayout>
  );
};

export default Reciclaje;
