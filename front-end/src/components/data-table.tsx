import { Button } from "@/components/ui/button"
import {
  type ColumnDef,
  type Row,
  type RowData,
  type SortingState,
  type PaginationState,
  type OnChangeFn,
  flexRender,
  useTable,
  tableFeatures,
  columnFilteringFeature,
  globalFilteringFeature,
  rowSortingFeature,
  rowPaginationFeature,
  rowExpandingFeature,
  columnSizingFeature,
  columnResizingFeature,
  columnVisibilityFeature,
  rowSelectionFeature,
  createFilteredRowModel,
  createSortedRowModel,
  createExpandedRowModel,
  createPaginatedRowModel,
  filterFns,
  sortFns,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import React, { Fragment, useMemo, useState, type ReactNode } from "react"
import { Skeleton } from "./ui/skeleton"

const dataTableFeatures = tableFeatures({
  columnFilteringFeature,
  globalFilteringFeature,
  rowSortingFeature,
  rowPaginationFeature,
  rowExpandingFeature,
  columnSizingFeature,
  columnResizingFeature,
  columnVisibilityFeature,
  rowSelectionFeature,
  filteredRowModel: createFilteredRowModel(),
  sortedRowModel: createSortedRowModel(),
  expandedRowModel: createExpandedRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  filterFns,
  sortFns,
})

export type DataTableFeatures = typeof dataTableFeatures
export type DataTableColumnDef<TData extends RowData, TValue = unknown> = ColumnDef<DataTableFeatures, TData, TValue>
export type DataTableRow<TData extends RowData> = Row<DataTableFeatures, TData>

export interface DataTableProps<TData extends RowData, TValue = unknown> {
  columns: ColumnDef<DataTableFeatures, TData, TValue>[] | ColumnDef<DataTableFeatures, TData, unknown>[]
  data: TData[]
  globalFilter?: unknown
  setGlobalFilter?: React.Dispatch<React.SetStateAction<unknown>>
  isLoading?: boolean
  expandableRow?: ({ row }: { row: Row<DataTableFeatures, TData> }) => ReactNode

  // Paginação controlada pelo backend (baseada em 1)
  page?: number
  perPage?: number
  onPageChange?: (page: number) => void
  onPerPageChange?: (perPage: number) => void

  // Paginação padrão TanStack Table (baseada em 0)
  pagination?: PaginationState
  onPaginationChange?: OnChangeFn<PaginationState>

  manualPagination?: boolean
  pageCount?: number
  totalCount?: number
}

export function DataTable<TData extends RowData, TValue = unknown>({
  columns,
  data,
  globalFilter,
  setGlobalFilter,
  isLoading = false,
  expandableRow,
  page,
  perPage,
  onPageChange,
  onPerPageChange,
  pagination,
  onPaginationChange,
  manualPagination,
  pageCount,
  totalCount,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])

  const isServerPaginated =
    manualPagination ??
    (page !== undefined ||
      onPageChange !== undefined ||
      pagination !== undefined ||
      onPaginationChange !== undefined)

  const [internalPagination, setInternalPagination] = useState<PaginationState>({
    pageIndex: page !== undefined ? Math.max(0, page - 1) : 0,
    pageSize: perPage ?? 10,
  })

  const resolvedPagination: PaginationState = useMemo(() => {
    if (pagination) {
      return pagination
    }
    return {
      pageIndex: page !== undefined ? Math.max(0, page - 1) : internalPagination.pageIndex,
      pageSize: perPage ?? internalPagination.pageSize,
    }
  }, [pagination, page, perPage, internalPagination])

  const handlePaginationChange: OnChangeFn<PaginationState> = (updaterOrValue) => {
    const nextPagination =
      typeof updaterOrValue === "function" ? updaterOrValue(resolvedPagination) : updaterOrValue

    if (nextPagination.pageIndex !== resolvedPagination.pageIndex) {
      onPageChange?.(nextPagination.pageIndex + 1)
    }

    if (nextPagination.pageSize !== resolvedPagination.pageSize) {
      onPerPageChange?.(nextPagination.pageSize)
    }

    onPaginationChange?.(updaterOrValue)

    if (page === undefined && !pagination) {
      setInternalPagination(nextPagination)
    }
  }

  const table = useTable<DataTableFeatures, TData>({
    features: dataTableFeatures,
    data,
    columns: columns as ColumnDef<DataTableFeatures, TData, unknown>[],
    manualPagination: isServerPaginated,
    pageCount: pageCount ?? -1,
    state: {
      sorting,
      globalFilter,
      pagination: resolvedPagination,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: handlePaginationChange,
    getRowCanExpand: () => true,
    columnResizeMode: "onChange",
  })

  const canPreviousPage = resolvedPagination.pageIndex > 0 && !isLoading

  const canNextPage = useMemo(() => {
    if (isLoading) return false
    if (pageCount !== undefined && pageCount > 0) {
      return resolvedPagination.pageIndex < pageCount - 1
    }
    if (totalCount !== undefined) {
      return (resolvedPagination.pageIndex + 1) * resolvedPagination.pageSize < totalCount
    }
    // Quando o back não retorna info de paginação:
    // Se a quantidade de itens for menor que o tamanho da página, chegamos ao final.
    return data.length >= resolvedPagination.pageSize && data.length > 0
  }, [isLoading, pageCount, totalCount, resolvedPagination, data.length])

  const showingText = useMemo(() => {
    if (data.length === 0) {
      return "Nenhum resultado"
    }
    const from = resolvedPagination.pageIndex * resolvedPagination.pageSize + 1
    const to = resolvedPagination.pageIndex * resolvedPagination.pageSize + data.length

    if (totalCount !== undefined) {
      return `Mostrando ${from} até ${to} de ${totalCount}`
    }

    return `Mostrando ${from} até ${to}`
  }, [data.length, resolvedPagination, totalCount])

  return (
    <div>
      {isLoading ? (
        <div className="w-full space-y-2 rounded-md border p-2">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </div>
      ) : (
        <>
          <div className="overflow-hidden rounded-md border">
            <Table className="table-auto">
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead style={{ width: header.getSize() }} key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      )
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <Fragment key={row.id}>
                      <TableRow data-state={row.getIsSelected() && "selected"}>
                        {row.getVisibleCells().map((cell) => (
                          <TableCell style={{ width: cell.column.getSize() }} key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        ))}
                      </TableRow>
                      {row.getIsExpanded() && expandableRow && (
                        <TableRow className="bg-muted">
                          <TableCell colSpan={row.getVisibleCells().length}>
                            {expandableRow({ row })}
                          </TableCell>
                        </TableRow>
                      )}
                    </Fragment>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      Nenhum resultado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-between py-3">
            <span className="text-muted-foreground text-sm">{showingText}</span>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePaginationChange((prev) => ({ ...prev, pageIndex: 0 }))}
                disabled={!canPreviousPage}
                title="Primeira página"
              >
                <ChevronsLeft />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() =>
                  handlePaginationChange((prev) => ({
                    ...prev,
                    pageIndex: Math.max(0, prev.pageIndex - 1),
                  }))
                }
                disabled={!canPreviousPage}
                title="Página anterior"
              >
                <ChevronLeft />
              </Button>
              <span className="text-sm font-medium">
                {pageCount && pageCount > 0
                  ? `Página ${resolvedPagination.pageIndex + 1} de ${pageCount}`
                  : `Página ${resolvedPagination.pageIndex + 1}`}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() =>
                  handlePaginationChange((prev) => ({
                    ...prev,
                    pageIndex: prev.pageIndex + 1,
                  }))
                }
                disabled={!canNextPage}
                title="Próxima página"
              >
                <ChevronRight />
              </Button>
              {pageCount && pageCount > 0 ? (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    handlePaginationChange((prev) => ({
                      ...prev,
                      pageIndex: pageCount - 1,
                    }))
                  }
                  disabled={resolvedPagination.pageIndex >= pageCount - 1 || isLoading}
                  title="Última página"
                >
                  <ChevronsRight />
                </Button>
              ) : null}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
