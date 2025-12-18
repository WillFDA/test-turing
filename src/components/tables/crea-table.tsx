'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
  ColumnDef,
  SortingState,
} from '@tanstack/react-table'
import { ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useFilteredData } from '@/hooks/use-filtered-data'
import { Ad, STATUT_COLORS, Statut } from '@/lib/types'
import { formatCurrency, formatDecimal, cn } from '@/lib/utils'

export function CreaTable() {
  const data = useFilteredData()
  const router = useRouter()
  const [sorting, setSorting] = useState<SortingState>([])

  const columns: ColumnDef<Ad>[] = useMemo(
    () => [
      {
        accessorKey: 'nomAnnonce',
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="-ml-4 h-8 font-medium"
          >
            Nom de l&apos;annonce
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => (
          <div className="max-w-[300px] truncate font-medium">
            {row.getValue('nomAnnonce')}
          </div>
        ),
      },
      {
        accessorKey: 'produit',
        header: 'Produit',
        cell: ({ row }) => (
          <Badge variant="outline" className="font-normal">
            {row.getValue('produit')}
          </Badge>
        ),
      },
      {
        accessorKey: 'createur',
        header: 'Créateur',
        cell: ({ row }) => {
          const value = row.getValue('createur') as string
          return (
            <span className={value === '—' ? 'text-muted-foreground' : ''}>
              {value}
            </span>
          )
        },
      },
      {
        accessorKey: 'typeContenu',
        header: 'Type',
        cell: ({ row }) => (
          <Badge variant="secondary" className="font-normal">
            {row.getValue('typeContenu')}
          </Badge>
        ),
      },
      {
        accessorKey: 'mois',
        header: 'Mois',
      },
      {
        accessorKey: 'statut',
        header: 'Statut',
        cell: ({ row }) => {
          const statut = row.getValue('statut') as Statut
          const colors = STATUT_COLORS[statut] || STATUT_COLORS['Arrêtée']
          return (
            <Badge className={cn(colors.bg, colors.text, 'font-normal')}>
              {statut}
            </Badge>
          )
        },
      },
      {
        accessorKey: 'budgetDepense',
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="-ml-4 h-8 font-medium"
          >
            Budget
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => (
          <div className="text-right">
            {formatCurrency(row.getValue('budgetDepense'))}
          </div>
        ),
      },
      {
        accessorKey: 'conversions',
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="-ml-4 h-8 font-medium"
          >
            Conv.
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => (
          <div className="text-right">{row.getValue('conversions')}</div>
        ),
      },
      {
        accessorKey: 'roas',
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="-ml-4 h-8 font-medium"
          >
            ROAS
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => {
          const roas = row.getValue('roas') as number
          return (
            <div
              className={cn(
                'text-right font-medium',
                roas >= 1 ? 'text-green-600' : 'text-red-600'
              )}
            >
              {formatDecimal(roas, 2)}
            </div>
          )
        },
      },
      {
        accessorKey: 'coutParConversion',
        header: 'Coût/conv.',
        cell: ({ row }) => (
          <div className="text-right">
            {formatCurrency(row.getValue('coutParConversion'))}
          </div>
        ),
      },
    ],
    []
  )

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: { pageSize: 20 },
    },
  })

  return (
    <div className="space-y-4">
      <div className="rounded-xl border bg-white">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="cursor-pointer"
                  onClick={() => router.push(`/crea/${row.original.id}`)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Aucun résultat trouvé.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-2">
        <p className="text-sm text-muted-foreground">
          {table.getFilteredRowModel().rows.length} résultat(s)
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="h-4 w-4" />
            Précédent
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {table.getState().pagination.pageIndex + 1} sur{' '}
            {table.getPageCount()}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Suivant
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
