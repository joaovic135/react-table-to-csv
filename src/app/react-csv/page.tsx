/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React, { useState } from 'react';
import { 
  ColumnDef, 
  useReactTable, 
  getCoreRowModel, 
  getPaginationRowModel, 
  flexRender
} from '@tanstack/react-table';
import dynamic from 'next/dynamic';
const CSVLink = dynamic(() => import('react-csv').then((mod) => mod.CSVLink), { ssr: false });

type User = {
  id: number;
  name: string;
  email: string;
  age: number;
}

export default function ReactCsvExport() {
  const [data, setData] = useState<User[]>([
      { id: 1, name: 'João Silva', email: 'joao@example.com', age: 30 },
      { id: 2, name: 'Maria Souza', email: 'maria@example.com', age: 25 },
      { id: 3, name: 'Pedro Santos', email: 'pedro@example.com', age: 35 },
      { id: 4, name: 'Ana Oliveira', email: 'ana@example.com', age: 28 },
      { id: 5, name: 'Carlos Pereira', email: 'carlos@example.com', age: 40 },
      { id: 6, name: 'Beatriz Costa', email: 'beatriz@example.com', age: 22 },
      { id: 7, name: 'Ricardo Almeida', email: 'ricardo@example.com', age: 33 },
      { id: 8, name: 'Fernanda Lima', email: 'fernanda@example.com', age: 27 },
      { id: 9, name: 'Gustavo Rocha', email: 'gustavo@example.com', age: 45 },
      { id: 10, name: 'Larissa Martins', email: 'larissa@example.com', age: 31 },
      { id: 11, name: 'Felipe Mendes', email: 'felipe@example.com', age: 29 },
      { id: 12, name: 'Juliana Ferreira', email: 'juliana@example.com', age: 38 },
      { id: 13, name: 'Rafael Souza', email: 'rafael@example.com', age: 36 },
      { id: 14, name: 'Juliana Costa', email: 'julianacosta@example.com', age: 24 },
      { id: 15, name: 'Sergio Alves', email: 'sergio@example.com', age: 41 },
      { id: 16, name: 'Roberta Silva', email: 'roberta@example.com', age: 26 },
      { id: 17, name: 'Vitor Barbosa', email: 'vitor@example.com', age: 32 },
      { id: 18, name: 'Mariana Pereira', email: 'mariana@example.com', age: 23 },
      { id: 19, name: 'Lucas Cardoso', email: 'lucas@example.com', age: 34 },
      { id: 20, name: 'Camila Gomes', email: 'camila@example.com', age: 30 }
      ]);
  

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'name',
      header: 'Nome',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'age',
      header: 'Idade',
    }
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Tabela de Usuários - React CSV Export</h1>
      
      <CSVLink 
        data={data}
        filename={'usuarios-react-csv.csv'}
        className="inline-block bg-green-500 text-white px-4 py-2 rounded mb-4"
      >
        Exportar CSV (React CSV)
      </CSVLink>

      <table className="w-full border-collapse border">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th 
                  key={header.id} 
                  className="border p-2 bg-gray-100"
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


        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td 
                  key={cell.id} 
                  className="border p-2"
                >
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center gap-2 mt-4">
        <button 
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <button 
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Próximo
        </button>
      </div>
    </div>
  );
}