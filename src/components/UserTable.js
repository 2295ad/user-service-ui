import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";


const columns = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "dateOfBirth",
    header: "Date of Birth",
    cell: ({ getValue }) => {
      const date = getValue();
      return date ? new Date(date).toLocaleDateString() : "-";
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ getValue }) => {
      const date = getValue();
      return date ? new Date(date).toLocaleString() : "-";
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    cell: ({ getValue }) => {
      const date = getValue();
      return date ? new Date(date).toLocaleString() : "-";
    },
  },
];


export default function UserTable({data=[],paginationAllowed=true}) {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 20,
  });

  const table = useReactTable({
    data,
    columns,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div>
      <table border="1" cellPadding="10">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(
                    cell.column.columnDef.cell ?? cell.column.columnDef.accessorKey,
                    cell.getContext()
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* PAGINATION */}
      {
        paginationAllowed && (
            <>
            <div style={{ marginTop: 10 }}>
                <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                ⬅ Prev
                </button>

                <span style={{ margin: "0 10px" }}>
                Page {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
                </span>

                <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                Next ➡
                </button>
            </div>
            </>
        )
      }
      
    </div>
  );
}