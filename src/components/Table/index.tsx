import type { TableOptions } from "@tanstack/react-table";
import { flexRender, useReactTable } from "@tanstack/react-table";

interface TableProps<TValue> extends TableOptions<TValue> {
  className?: string;
  isLoading?: boolean;
}

export const Table = <T,>({
  className,
  isLoading,
  ...props
}: TableProps<T>) => {
  // const data =
  const table = useReactTable({
    ...props,
  });

  return (
    <div
      className={`scrollbar scrollbar-dark flex flex-col overflow-auto  rounded-lg border-[1px] bg-white shadow-sm ${className}`}
    >
      <table className="w-full  table-auto ">
        <thead className="sticky top-0 bg-neutral-800/95">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="text-white">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="py-2 px-6 text-left text-sm font-medium"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        {!isLoading && (
          <tbody className="text-xs text-gray-500">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-gray-200 odd:bg-white even:bg-slate-50 "
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="py-3 px-6 text-left">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        )}
      </table>
      {/* {isLoading && (
        <div className="flex flex-1 items-center justify-center">
          <Spinner className="" />
        </div>
      )} */}

      {!isLoading && props.data.length === 0 && (
        <div className="flex flex-1 items-center justify-center">
          <p className="text-gray-500">No hay datos</p>
        </div>
      )}
    </div>
  );
};
