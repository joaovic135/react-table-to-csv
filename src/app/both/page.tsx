'use client'
import React, { useMemo } from 'react';
import { 
  ColumnDef, 
  flexRender,
  getCoreRowModel, 
  getPaginationRowModel,
  useReactTable 
} from '@tanstack/react-table';
import { CSVLink } from 'react-csv';
import Papa from 'papaparse';

// Definição tipada dos dados do usuário
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  role: 'Admin' | 'User' | 'Manager';
  active: boolean;
}

// Dados de exemplo com tipagem
const MOCK_USERS: User[] = [
  { 
    id: 1, 
    name: 'João Silva', 
    email: 'joao.silva@example.com', 
    age: 30, 
    role: 'Admin',
    active: true 
  },
  { 
    id: 2, 
    name: 'Maria Souza', 
    email: 'maria.souza@example.com', 
    age: 28, 
    role: 'User',
    active: true 
  },
  { 
    id: 3, 
    name: 'Pedro Santos', 
    email: 'pedro.santos@example.com', 
    age: 35, 
    role: 'Manager',
    active: false 
  }
];

export default function UserManagementTable() {
  // Definição das colunas com tipos
  const columns = useMemo<ColumnDef<User>[]>(() => [
    {
      accessorKey: 'id',
      header: 'ID',
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'name',
      header: 'Nome',
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'age',
      header: 'Idade',
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'role',
      header: 'Função',
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: 'active',
      header: 'Ativo',
      cell: (info) => info.getValue() ? 'Sim' : 'Não',
    }
  ], []);

  // Configuração da tabela com tipos
  const table = useReactTable({
    data: MOCK_USERS,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // Função de exportação personalizada com Papa Parse
  const handlePapaParseCsvExport = () => {
    const csv = Papa.unparse(MOCK_USERS, {
      quotes: true,
      delimiter: ",",
      header: true, // Inclui cabeçalho
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'usuarios_papaparse_with_header.csv';
    link.click();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gestão de Usuários</h1>

      <div className="flex space-x-4 mb-4">
        {/* Exportação com React CSV */}
        <CSVLink 
          data={MOCK_USERS}
          filename={'usuarios_react_csv_alternative.csv'}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Exportar CSV (React CSV)
        </CSVLink>

        {/* Exportação com Papa Parse */}
        <button 
          onClick={handlePapaParseCsvExport}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Exportar CSV (Papa Parse)
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th 
                    key={header.id} 
                    className="border p-2 text-left"
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
              <tr 
                key={row.id} 
                className="hover:bg-gray-50 border-b"
              >
                {row.getVisibleCells().map(cell => (
                  <td 
                    key={cell.id} 
                    className="p-2"
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
      </div>

      <div className="flex justify-center items-center space-x-4 mt-4">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <span>
          Página {table.getState().pagination.pageIndex + 1} de{' '}
          {table.getPageCount()}
        </span>
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