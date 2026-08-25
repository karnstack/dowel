import {
  columnResizingFeature,
  columnSizingFeature,
  columnVisibilityFeature,
  createColumnHelper,
  createSortedRowModel,
  rowSelectionFeature,
  rowSortingFeature,
  tableFeatures,
  useTable,
} from "@tanstack/react-table";
import type {
  ColumnDef,
  ColumnVisibilityState,
  OnChangeFn,
  RowData,
  RowSelectionState,
  SortingState,
  Updater,
} from "@tanstack/react-table";
import * as stylex from "@stylexjs/stylex";
import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import type {
  ChangeEvent,
  ComponentPropsWithoutRef,
  CSSProperties,
  KeyboardEvent,
  MouseEvent,
  ReactNode,
} from "react";

import * as styles from "./data-table.stylex";

export type DataTableDensity = "compact" | "comfortable";
export type DataTableAlign = "start" | "center" | "end";
export type DataTableCellTone = "primary" | "secondary" | "tertiary";

export type DataTableColumnMeta = {
  /** Cell and header alignment. */
  align?: DataTableAlign;
  /** Lets this column absorb space left after fixed columns are measured. */
  grow?: boolean;
  /** Renders values in the package monospace face. */
  mono?: boolean;
  /** Visual text hierarchy for body cells. */
  tone?: DataTableCellTone;
  /** Clips long values to one line. Defaults to true. */
  truncate?: boolean;
};

const dataTableFeatures = tableFeatures({
  columnMeta: {} as DataTableColumnMeta,
  columnResizingFeature,
  columnSizingFeature,
  columnVisibilityFeature,
  rowSelectionFeature,
  rowSortingFeature,
  sortedRowModel: createSortedRowModel(),
});

export type DataTableColumnDef<
  TData extends RowData,
  TValue = unknown,
> = ColumnDef<typeof dataTableFeatures, TData, TValue>;

export function createDataTableColumnHelper<TData extends RowData>() {
  return createColumnHelper<typeof dataTableFeatures, TData>();
}

type DivProps = ComponentPropsWithoutRef<"div">;

export interface DataTableProps<TData extends RowData>
  extends Omit<DivProps, "children"> {
  "aria-label": string;
  columns: ReadonlyArray<DataTableColumnDef<TData, any>>;
  data: ReadonlyArray<TData>;
  defaultColumnVisibility?: ColumnVisibilityState;
  defaultRowSelection?: RowSelectionState;
  defaultSorting?: SortingState;
  density?: DataTableDensity;
  emptyDescription?: ReactNode;
  emptyTitle?: ReactNode;
  getRowId?: (row: TData, index: number) => string;
  loading?: boolean;
  loadingRows?: number;
  onColumnVisibilityChange?: OnChangeFn<ColumnVisibilityState>;
  onRowActivate?: (row: TData) => void;
  onRowSelectionChange?: OnChangeFn<RowSelectionState>;
  onSortingChange?: OnChangeFn<SortingState>;
  resizable?: boolean;
  rowSelection?: RowSelectionState;
  selectable?: boolean;
  showHeader?: boolean;
  sorting?: SortingState;
  columnVisibility?: ColumnVisibilityState;
}

function mergeClassName(internal?: string, external?: string) {
  return [internal, external].filter(Boolean).join(" ");
}

function applyUpdater<T>(updater: Updater<T>, current: T) {
  return typeof updater === "function"
    ? (updater as (value: T) => T)(current)
    : updater;
}

function CheckIcon({ mixed = false }: { mixed?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
    >
      {mixed ? (
        <path d="M2.25 5h5.5" stroke="currentColor" strokeWidth="1.4" />
      ) : (
        <path
          d="m2.1 5.1 1.8 1.8 4-4"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

type CheckboxProps = {
  checked: boolean;
  disabled?: boolean;
  indeterminate?: boolean;
  label: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

function Checkbox({
  checked,
  disabled,
  indeterminate = false,
  label,
  onChange,
}: CheckboxProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <label
      {...stylex.props(
        styles.parts.checkboxLabel,
        disabled && styles.parts.checkboxDisabled,
      )}
      data-dowel-row-interactive=""
    >
      <input
        ref={inputRef}
        {...stylex.props(styles.parts.checkboxInput)}
        type="checkbox"
        aria-label={label}
        checked={checked}
        disabled={disabled}
        onBlur={() => setFocused(false)}
        onChange={onChange}
        onFocus={() => setFocused(true)}
      />
      <span
        {...stylex.props(
          styles.parts.checkboxVisual,
          (checked || indeterminate) && styles.parts.checkboxChecked,
          focused && styles.parts.checkboxFocus,
        )}
        aria-hidden="true"
      >
        {checked || indeterminate ? <CheckIcon mixed={indeterminate} /> : null}
      </span>
    </label>
  );
}

function SortIcon({ direction }: { direction: false | "asc" | "desc" }) {
  return (
    <span
      {...stylex.props(
        styles.parts.sortIcon,
        direction && styles.parts.sorted,
        direction === "desc" && styles.parts.descending,
      )}
      aria-hidden="true"
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path
          d="m3.5 7 2.5-2.5L8.5 7"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function alignmentStyle(align: DataTableAlign | undefined) {
  if (align === "center") return styles.parts.alignCenter;
  if (align === "end") return styles.parts.alignEnd;
  return null;
}

function isInteractiveTarget(target: EventTarget | null) {
  return (
    target instanceof Element &&
    Boolean(
      target.closest(
        "a,button,input,select,textarea,[role='button'],[data-dowel-row-interactive]",
      ),
    )
  );
}

function triggerRow<TData extends RowData>(
  event: MouseEvent<HTMLTableRowElement> | KeyboardEvent<HTMLTableRowElement>,
  row: TData,
  onRowActivate: ((row: TData) => void) | undefined,
) {
  if (!onRowActivate || isInteractiveTarget(event.target)) return;
  if ("key" in event && event.key !== "Enter" && event.key !== " ") return;
  event.preventDefault();
  onRowActivate(row);
}

export const DataTable = forwardRef(function DataTable<TData extends RowData>(
  {
    "aria-label": ariaLabel,
    columns,
    data,
    defaultColumnVisibility,
    defaultRowSelection,
    defaultSorting,
    density = "compact",
    emptyDescription,
    emptyTitle = "No results",
    getRowId,
    loading = false,
    loadingRows = 5,
    onColumnVisibilityChange,
    onRowActivate,
    onRowSelectionChange,
    onSortingChange,
    resizable = true,
    rowSelection,
    selectable = false,
    showHeader = true,
    sorting,
    columnVisibility,
    className,
    style,
    ...props
  }: DataTableProps<TData>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const selectionColumn = useMemo<DataTableColumnDef<TData>>(
    () => ({
      id: "__dowel_selection",
      enableHiding: false,
      enableResizing: false,
      enableSorting: false,
      size: 36,
      minSize: 36,
      maxSize: 36,
      meta: { align: "center", truncate: false },
      header: ({ table }) => (
        <Checkbox
          label="Select all rows"
          checked={table.getIsAllRowsSelected()}
          indeterminate={table.getIsSomeRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          label={`Select row ${row.getDisplayIndex() + 1}`}
          checked={row.getIsSelected()}
          disabled={!row.getCanSelect()}
          indeterminate={row.getIsSomeSelected()}
          onChange={row.getToggleSelectedHandler()}
        />
      ),
    }),
    [],
  );

  const resolvedColumns = useMemo(
    () => (selectable ? [selectionColumn, ...columns] : columns),
    [columns, selectable, selectionColumn],
  );
  const [internalSorting, setInternalSorting] = useState<SortingState>(
    defaultSorting ?? [],
  );
  const [internalRowSelection, setInternalRowSelection] =
    useState<RowSelectionState>(defaultRowSelection ?? {});
  const [internalColumnVisibility, setInternalColumnVisibility] =
    useState<ColumnVisibilityState>(defaultColumnVisibility ?? {});

  const table = useTable({
    features: dataTableFeatures,
    columns: resolvedColumns,
    data,
    defaultColumn: {
      minSize: 48,
      size: 144,
      maxSize: 720,
    },
    enableColumnResizing: resizable,
    enableRowSelection: selectable,
    getRowId,
    initialState: {
      ...(defaultColumnVisibility === undefined
        ? null
        : { columnVisibility: defaultColumnVisibility }),
      ...(defaultRowSelection === undefined
        ? null
        : { rowSelection: defaultRowSelection }),
      ...(defaultSorting === undefined ? null : { sorting: defaultSorting }),
    },
    state: {
      sorting: sorting ?? internalSorting,
      rowSelection: rowSelection ?? internalRowSelection,
      columnVisibility: columnVisibility ?? internalColumnVisibility,
    },
    sortDescFirst: false,
    onColumnVisibilityChange: (updater) => {
      if (columnVisibility === undefined) {
        setInternalColumnVisibility((current) =>
          applyUpdater(updater, current),
        );
      }
      onColumnVisibilityChange?.(updater);
    },
    onRowSelectionChange: (updater) => {
      if (rowSelection === undefined) {
        setInternalRowSelection((current) => applyUpdater(updater, current));
      }
      onRowSelectionChange?.(updater);
    },
    onSortingChange: (updater) => {
      if (sorting === undefined) {
        setInternalSorting((current) => applyUpdater(updater, current));
      }
      onSortingChange?.(updater);
    },
    columnResizeMode: "onEnd",
  });

  const visibleColumns = table.getVisibleLeafColumns();
  const rows = table.getRowModel().rows;
  const tableWidth = Math.max(table.getTotalSize(), 480);
  const growingColumns = visibleColumns.filter(
    (column) => column.columnDef.meta?.grow,
  );
  const fixedColumnsWidth = visibleColumns
    .filter((column) => !column.columnDef.meta?.grow)
    .reduce((total, column) => total + column.getSize(), 0);
  const rootStyles = stylex.props(styles.parts.root);

  return (
    <div
      ref={ref}
      {...props}
      className={mergeClassName(rootStyles.className, className)}
      style={{ ...rootStyles.style, ...style }}
      data-dowel-component="data-table"
      data-density={density}
    >
      <table
        {...stylex.props(styles.parts.table)}
        style={{ width: `max(100%, ${tableWidth}px)` } as CSSProperties}
        aria-label={ariaLabel}
        aria-busy={loading || undefined}
      >
        <colgroup>
          {visibleColumns.map((column) => (
            <col
              key={column.id}
              style={{
                width: column.columnDef.meta?.grow
                  ? `max(${column.getSize()}px, calc((100% - ${fixedColumnsWidth}px) / ${growingColumns.length}))`
                  : `${column.getSize()}px`,
              }}
            />
          ))}
        </colgroup>
        {showHeader ? (
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                {...stylex.props(styles.parts.headerRow)}
              >
                {headerGroup.headers.map((header) => {
                  const meta = header.column.columnDef.meta;
                  const sorted = header.column.getIsSorted();
                  const canSort = header.column.getCanSort();
                  const canResize = resizable && header.column.getCanResize();
                  const min = header.column.columnDef.minSize ?? 48;
                  const max = header.column.columnDef.maxSize ?? 720;
                  return (
                    <th
                      key={header.id}
                      {...stylex.props(
                        styles.parts.headerCell,
                        alignmentStyle(meta?.align),
                        header.column.id === "__dowel_selection" &&
                          styles.parts.selectionCell,
                      )}
                      scope="col"
                      aria-sort={
                        sorted === "asc"
                          ? "ascending"
                          : sorted === "desc"
                            ? "descending"
                            : canSort
                              ? "none"
                              : undefined
                      }
                    >
                      {header.isPlaceholder ? null : canSort ? (
                        <button
                          {...stylex.props(
                            styles.parts.headerButton,
                            alignmentStyle(meta?.align),
                          )}
                          type="button"
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          <span {...stylex.props(styles.parts.headerLabel)}>
                            <table.FlexRender header={header} />
                          </span>
                          <SortIcon direction={sorted} />
                        </button>
                      ) : (
                        <div
                          {...stylex.props(
                            styles.parts.cellContent,
                            alignmentStyle(meta?.align),
                          )}
                        >
                          <table.FlexRender header={header} />
                        </div>
                      )}
                      {canResize ? (
                        <div
                          {...stylex.props(styles.parts.resizeHandle)}
                          role="separator"
                          tabIndex={0}
                          aria-label={`Resize ${header.column.id} column`}
                          aria-orientation="vertical"
                          aria-valuemin={min}
                          aria-valuemax={max}
                          aria-valuenow={header.getSize()}
                          data-resizing={
                            header.column.getIsResizing() ? "" : undefined
                          }
                          onDoubleClick={() => header.column.resetSize()}
                          onKeyDown={(event) => {
                            const step = event.shiftKey ? 24 : 8;
                            let next = header.getSize();
                            if (event.key === "ArrowLeft") next -= step;
                            else if (event.key === "ArrowRight") next += step;
                            else if (event.key === "Home") next = min;
                            else if (event.key === "End") next = max;
                            else return;
                            event.preventDefault();
                            header.column.table.setColumnSizing((current) => ({
                              ...current,
                              [header.column.id]: Math.min(
                                Math.max(next, min),
                                max,
                              ),
                            }));
                          }}
                          onMouseDown={header.getResizeHandler()}
                          onTouchStart={header.getResizeHandler()}
                        />
                      ) : null}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
        ) : null}
        <tbody>
          {loading
            ? Array.from(
                { length: Math.max(1, loadingRows) },
                (_, rowIndex) => (
                  <tr
                    key={`loading-${rowIndex}`}
                    {...stylex.props(styles.parts.row)}
                  >
                    {visibleColumns.map((column) => (
                      <td
                        key={column.id}
                        {...stylex.props(
                          styles.parts.cell,
                          density === "compact"
                            ? styles.parts.compactCell
                            : styles.parts.comfortableCell,
                          column.id === "__dowel_selection" &&
                            styles.parts.selectionCell,
                        )}
                      >
                        <span {...stylex.props(styles.parts.skeleton)} />
                      </td>
                    ))}
                  </tr>
                ),
              )
            : rows.map((row) => (
                <tr
                  key={row.id}
                  {...stylex.props(
                    styles.parts.row,
                    row.getIsSelected() && styles.parts.row,
                  )}
                  data-selected={row.getIsSelected() ? "" : undefined}
                  data-actionable={onRowActivate ? "" : undefined}
                  tabIndex={onRowActivate ? 0 : undefined}
                  onClick={(event) =>
                    triggerRow(event, row.original, onRowActivate)
                  }
                  onKeyDown={(event) =>
                    triggerRow(event, row.original, onRowActivate)
                  }
                >
                  {row.getVisibleCells().map((cell) => {
                    const meta = cell.column.columnDef.meta;
                    return (
                      <td
                        key={cell.id}
                        {...stylex.props(
                          styles.parts.cell,
                          density === "compact"
                            ? styles.parts.compactCell
                            : styles.parts.comfortableCell,
                          cell.column.id === "__dowel_selection" &&
                            styles.parts.selectionCell,
                        )}
                      >
                        <div
                          {...stylex.props(
                            styles.parts.cellContent,
                            meta?.truncate !== false && styles.parts.truncate,
                            alignmentStyle(meta?.align),
                            meta?.tone === "secondary" &&
                              styles.parts.secondary,
                            meta?.tone === "tertiary" && styles.parts.tertiary,
                            meta?.mono && styles.parts.mono,
                          )}
                        >
                          <table.FlexRender cell={cell} />
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
          {!loading && rows.length === 0 ? (
            <tr>
              <td
                {...stylex.props(styles.parts.emptyCell)}
                colSpan={Math.max(visibleColumns.length, 1)}
              >
                <p {...stylex.props(styles.parts.emptyTitle)}>{emptyTitle}</p>
                {emptyDescription ? (
                  <p {...stylex.props(styles.parts.emptyDescription)}>
                    {emptyDescription}
                  </p>
                ) : null}
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
}) as <TData extends RowData>(
  props: DataTableProps<TData> & { ref?: React.ForwardedRef<HTMLDivElement> },
) => React.ReactElement;
