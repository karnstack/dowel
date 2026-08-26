import {
  columnOrderingFeature,
  columnPinningFeature,
  columnResizingFeature,
  columnSizingFeature,
  columnVisibilityFeature,
  createColumnHelper,
  createSortedRowModel,
  rowSelectionFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_text,
  tableFeatures,
  useTable,
} from "@tanstack/react-table";
import type {
  ColumnDef,
  ColumnOrderState,
  ColumnPinningPosition,
  ColumnPinningState,
  ColumnSizingState,
  ColumnVisibilityState,
  OnChangeFn,
  RowData,
  RowSelectionState,
  SortingState,
  Updater,
} from "@tanstack/react-table";
import { CheckIcon, ChevronUpIcon, MinusIcon } from "@heroicons/react/16/solid";
import * as stylex from "@stylexjs/stylex";
import {
  Fragment,
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type {
  ChangeEvent,
  ComponentPropsWithoutRef,
  CSSProperties,
  FocusEvent,
  KeyboardEvent,
  MouseEvent,
  ReactNode,
} from "react";

import { HoverActions } from "../hover-actions";
import * as styles from "./data-table.stylex";

export type DataTableDensity = "compact" | "comfortable";
export type DataTableAlign = "start" | "center" | "end";
export type DataTableCellTone = "primary" | "secondary" | "tertiary";
export type DataTableColumnOrderState = ColumnOrderState;
export type DataTableColumnPinningState = ColumnPinningState;
export type DataTableColumnSizingState = ColumnSizingState;
export type DataTableColumnVisibilityState = ColumnVisibilityState;
export type DataTableRowSelectionState = RowSelectionState;
export type DataTableSortingState = SortingState;

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

export type DataTableGroup = {
  /** Stable identity used by collapsed-group state. */
  id: string;
  /** Visible group heading. */
  label: ReactNode;
};

export type DataTableGroupContext<TData extends RowData> = {
  collapsed: boolean;
  group: DataTableGroup;
  rows: ReadonlyArray<TData>;
  toggle: () => void;
};

const dataTableFeatures = tableFeatures({
  columnMeta: {} as DataTableColumnMeta,
  columnResizingFeature,
  columnSizingFeature,
  columnOrderingFeature,
  columnPinningFeature,
  columnVisibilityFeature,
  rowSelectionFeature,
  rowSortingFeature,
  sortedRowModel: createSortedRowModel(),
  sortFns: {
    alphanumeric: sortFn_alphanumeric,
    text: sortFn_text,
  },
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
  collapsedGroupIds?: ReadonlyArray<string>;
  columnOrder?: ColumnOrderState;
  columnPinning?: ColumnPinningState;
  columnSizing?: ColumnSizingState;
  columns: ReadonlyArray<DataTableColumnDef<TData, any>>;
  data: ReadonlyArray<TData>;
  defaultCollapsedGroupIds?: ReadonlyArray<string>;
  defaultColumnOrder?: ColumnOrderState;
  defaultColumnPinning?: ColumnPinningState;
  defaultColumnSizing?: ColumnSizingState;
  defaultColumnVisibility?: ColumnVisibilityState;
  defaultRowSelection?: RowSelectionState;
  defaultSorting?: SortingState;
  density?: DataTableDensity;
  emptyDescription?: ReactNode;
  emptyTitle?: ReactNode;
  getRowId?: (row: TData, index: number) => string;
  /** Groups the final sorted rows into collapsible sections. */
  groupBy?: (row: TData) => DataTableGroup | null;
  /** Enables roving Arrow/Home/End row focus. Defaults to true. */
  keyboardNavigation?: boolean;
  loading?: boolean;
  loadingRows?: number;
  onCollapsedGroupIdsChange?: (groupIds: ReadonlyArray<string>) => void;
  onColumnOrderChange?: OnChangeFn<ColumnOrderState>;
  onColumnPinningChange?: OnChangeFn<ColumnPinningState>;
  onColumnSizingChange?: OnChangeFn<ColumnSizingState>;
  onColumnVisibilityChange?: OnChangeFn<ColumnVisibilityState>;
  onRowActivate?: (row: TData) => void;
  onRowSelectionChange?: OnChangeFn<RowSelectionState>;
  onSortingChange?: OnChangeFn<SortingState>;
  resizable?: boolean;
  /** Optional actions revealed when a row is hovered or contains focus. */
  renderRowActions?: (row: TData) => ReactNode;
  renderGroupHeader?: (context: DataTableGroupContext<TData>) => ReactNode;
  rowSelection?: RowSelectionState;
  selectable?: boolean;
  showHeader?: boolean;
  sorting?: SortingState;
  stickyHeader?: boolean;
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

function SelectionIcon({ mixed = false }: { mixed?: boolean }) {
  const Icon = mixed ? MinusIcon : CheckIcon;
  return <Icon width={16} height={16} />;
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
        {checked || indeterminate ? (
          <SelectionIcon mixed={indeterminate} />
        ) : null}
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
      <ChevronUpIcon width={16} height={16} />
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
  if ("key" in event && event.key !== "Enter") return;
  event.preventDefault();
  onRowActivate(row);
}

function pinnedPositionStyle(column: {
  getAfter: (position?: ColumnPinningPosition | "center") => number;
  getIsPinned: () => ColumnPinningPosition;
  getStart: (position?: ColumnPinningPosition | "center") => number;
}): CSSProperties | undefined {
  const pinned = column.getIsPinned();
  if (pinned === "start") {
    return { insetInlineStart: column.getStart("start") };
  }
  if (pinned === "end") {
    return { insetInlineEnd: column.getAfter("end") };
  }
  return undefined;
}

export const DataTable = forwardRef(function DataTable<TData extends RowData>(
  {
    "aria-label": ariaLabel,
    collapsedGroupIds,
    columnOrder,
    columnPinning,
    columnSizing,
    columns,
    data,
    defaultCollapsedGroupIds,
    defaultColumnOrder,
    defaultColumnPinning,
    defaultColumnSizing,
    defaultColumnVisibility,
    defaultRowSelection,
    defaultSorting,
    density = "compact",
    emptyDescription,
    emptyTitle = "No results",
    getRowId,
    groupBy,
    keyboardNavigation = true,
    loading = false,
    loadingRows = 5,
    onCollapsedGroupIdsChange,
    onColumnOrderChange,
    onColumnPinningChange,
    onColumnSizingChange,
    onColumnVisibilityChange,
    onRowActivate,
    onRowSelectionChange,
    onSortingChange,
    resizable = true,
    renderGroupHeader,
    renderRowActions,
    rowSelection,
    selectable = false,
    showHeader = true,
    sorting,
    stickyHeader = false,
    columnVisibility,
    className,
    style,
    ...props
  }: DataTableProps<TData>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const selectionAnchorRef = useRef<string | null>(null);
  const rowRefs = useRef(new Map<string, HTMLTableRowElement>());
  const [activeRowId, setActiveRowId] = useState<string | null>(null);
  const [activeActionsRowId, setActiveActionsRowId] = useState<string | null>(
    null,
  );
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
      cell: ({ row, table }) => (
        <Checkbox
          label={`Select row ${row.getDisplayIndex() + 1}`}
          checked={row.getIsSelected()}
          disabled={!row.getCanSelect()}
          indeterminate={row.getIsSomeSelected()}
          onChange={(event) => {
            const checked = event.currentTarget.checked;
            const shiftKey =
              "shiftKey" in event.nativeEvent && event.nativeEvent.shiftKey;
            const modelRows = table.getRowModel().rows;
            const anchorIndex = modelRows.findIndex(
              (candidate) => candidate.id === selectionAnchorRef.current,
            );
            const rowIndex = modelRows.findIndex(
              (candidate) => candidate.id === row.id,
            );

            if (shiftKey && anchorIndex >= 0 && rowIndex >= 0) {
              const start = Math.min(anchorIndex, rowIndex);
              const end = Math.max(anchorIndex, rowIndex);
              table.setRowSelection((current) => {
                const next = { ...current };
                for (const candidate of modelRows.slice(start, end + 1)) {
                  if (!candidate.getCanSelect()) continue;
                  if (checked) next[candidate.id] = true;
                  else delete next[candidate.id];
                }
                return next;
              });
            } else {
              row.toggleSelected(checked);
            }
            selectionAnchorRef.current = row.id;
          }}
        />
      ),
    }),
    [],
  );

  const actionsColumn = useMemo<DataTableColumnDef<TData> | null>(
    () =>
      renderRowActions
        ? {
            id: "__dowel_actions",
            enableHiding: false,
            enableResizing: false,
            enableSorting: false,
            size: 88,
            minSize: 48,
            maxSize: 160,
            meta: { align: "end", truncate: false },
            header: "",
            cell: ({ row }) => (
              <HoverActions
                label={`Actions for row ${row.getDisplayIndex() + 1}`}
                visible={activeActionsRowId === row.id}
              >
                {renderRowActions(row.original)}
              </HoverActions>
            ),
          }
        : null,
    [activeActionsRowId, renderRowActions],
  );

  const resolvedColumns = useMemo(
    () => [
      ...(selectable ? [selectionColumn] : []),
      ...columns,
      ...(actionsColumn ? [actionsColumn] : []),
    ],
    [actionsColumn, columns, selectable, selectionColumn],
  );
  const [internalColumnOrder, setInternalColumnOrder] =
    useState<ColumnOrderState>(defaultColumnOrder ?? []);
  const [internalColumnPinning, setInternalColumnPinning] =
    useState<ColumnPinningState>(
      defaultColumnPinning ?? { start: [], end: [] },
    );
  const [internalColumnSizing, setInternalColumnSizing] =
    useState<ColumnSizingState>(defaultColumnSizing ?? {});
  const [internalSorting, setInternalSorting] = useState<SortingState>(
    defaultSorting ?? [],
  );
  const [internalRowSelection, setInternalRowSelection] =
    useState<RowSelectionState>(defaultRowSelection ?? {});
  const [internalColumnVisibility, setInternalColumnVisibility] =
    useState<ColumnVisibilityState>(defaultColumnVisibility ?? {});
  const [internalCollapsedGroupIds, setInternalCollapsedGroupIds] = useState(
    defaultCollapsedGroupIds ?? [],
  );

  const publicColumnPinning = columnPinning ?? internalColumnPinning;
  const effectiveColumnPinning = useMemo<ColumnPinningState>(
    () => ({
      start: [
        ...(selectable ? ["__dowel_selection"] : []),
        ...publicColumnPinning.start.filter(
          (id) => id !== "__dowel_selection" && id !== "__dowel_actions",
        ),
      ],
      end: [
        ...publicColumnPinning.end.filter(
          (id) => id !== "__dowel_selection" && id !== "__dowel_actions",
        ),
        ...(actionsColumn ? ["__dowel_actions"] : []),
      ],
    }),
    [actionsColumn, publicColumnPinning, selectable],
  );

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
    enableColumnPinning: true,
    enableRowSelection: selectable,
    getRowId,
    initialState: {
      ...(defaultColumnOrder === undefined
        ? null
        : { columnOrder: defaultColumnOrder }),
      ...(defaultColumnPinning === undefined
        ? null
        : { columnPinning: defaultColumnPinning }),
      ...(defaultColumnSizing === undefined
        ? null
        : { columnSizing: defaultColumnSizing }),
      ...(defaultColumnVisibility === undefined
        ? null
        : { columnVisibility: defaultColumnVisibility }),
      ...(defaultRowSelection === undefined
        ? null
        : { rowSelection: defaultRowSelection }),
      ...(defaultSorting === undefined ? null : { sorting: defaultSorting }),
    },
    state: {
      columnOrder: columnOrder ?? internalColumnOrder,
      columnPinning: effectiveColumnPinning,
      columnSizing: columnSizing ?? internalColumnSizing,
      sorting: sorting ?? internalSorting,
      rowSelection: rowSelection ?? internalRowSelection,
      columnVisibility: columnVisibility ?? internalColumnVisibility,
    },
    sortDescFirst: false,
    onColumnOrderChange: (updater) => {
      if (columnOrder === undefined) {
        setInternalColumnOrder((current) => applyUpdater(updater, current));
      }
      onColumnOrderChange?.(updater);
    },
    onColumnPinningChange: (updater) => {
      const effective = applyUpdater(updater, effectiveColumnPinning);
      const next = {
        start: effective.start.filter(
          (id) => id !== "__dowel_selection" && id !== "__dowel_actions",
        ),
        end: effective.end.filter(
          (id) => id !== "__dowel_selection" && id !== "__dowel_actions",
        ),
      };
      if (columnPinning === undefined) setInternalColumnPinning(next);
      onColumnPinningChange?.(next);
    },
    onColumnSizingChange: (updater) => {
      if (columnSizing === undefined) {
        setInternalColumnSizing((current) => applyUpdater(updater, current));
      }
      onColumnSizingChange?.(updater);
    },
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
  const resolvedCollapsedGroupIds =
    collapsedGroupIds ?? internalCollapsedGroupIds;
  const collapsedGroupSet = useMemo(
    () => new Set(resolvedCollapsedGroupIds),
    [resolvedCollapsedGroupIds],
  );
  const groupedRows = useMemo(() => {
    if (!groupBy) return [{ group: null, rows }];

    const groups = new Map<
      string,
      { group: DataTableGroup; rows: typeof rows }
    >();
    for (const row of rows) {
      const group = groupBy(row.original);
      if (!group) {
        const fallback = { id: "__dowel_ungrouped", label: "Other" };
        const current = groups.get(fallback.id);
        if (current) current.rows.push(row);
        else groups.set(fallback.id, { group: fallback, rows: [row] });
        continue;
      }
      const current = groups.get(group.id);
      if (current) current.rows.push(row);
      else groups.set(group.id, { group, rows: [row] });
    }
    return [...groups.values()];
  }, [groupBy, rows]);
  const navigableRows = useMemo(
    () =>
      groupedRows.flatMap((entry) =>
        entry.group && collapsedGroupSet.has(entry.group.id) ? [] : entry.rows,
      ),
    [collapsedGroupSet, groupedRows],
  );
  const tableWidth = Math.max(table.getTotalSize(), 480);
  const growingColumns = visibleColumns.filter(
    (column) => column.columnDef.meta?.grow,
  );
  const fixedColumnsWidth = visibleColumns
    .filter((column) => !column.columnDef.meta?.grow)
    .reduce((total, column) => total + column.getSize(), 0);
  const rootStyles = stylex.props(styles.parts.root);

  useEffect(() => {
    if (
      activeRowId === null ||
      !navigableRows.some((row) => row.id === activeRowId)
    ) {
      setActiveRowId(navigableRows[0]?.id ?? null);
    }
  }, [activeRowId, navigableRows]);

  function setCollapsedGroups(next: ReadonlyArray<string>) {
    if (collapsedGroupIds === undefined) setInternalCollapsedGroupIds(next);
    onCollapsedGroupIdsChange?.(next);
  }

  function toggleGroup(groupId: string) {
    const next = new Set(resolvedCollapsedGroupIds);
    if (next.has(groupId)) next.delete(groupId);
    else next.add(groupId);
    setCollapsedGroups([...next]);
  }

  function selectRowRange(fromId: string, toId: string, selected = true) {
    const from = navigableRows.findIndex((row) => row.id === fromId);
    const to = navigableRows.findIndex((row) => row.id === toId);
    if (from < 0 || to < 0) return;
    const start = Math.min(from, to);
    const end = Math.max(from, to);
    table.setRowSelection((current) => {
      const next = { ...current };
      for (const row of navigableRows.slice(start, end + 1)) {
        if (!row.getCanSelect()) continue;
        if (selected) next[row.id] = true;
        else delete next[row.id];
      }
      return next;
    });
  }

  function handleRowKeyDown(
    event: KeyboardEvent<HTMLTableRowElement>,
    row: (typeof rows)[number],
  ) {
    if (isInteractiveTarget(event.target)) return;
    const currentIndex = navigableRows.findIndex(
      (candidate) => candidate.id === row.id,
    );
    let nextIndex = currentIndex;
    if (event.key === "ArrowDown") nextIndex = currentIndex + 1;
    else if (event.key === "ArrowUp") nextIndex = currentIndex - 1;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = navigableRows.length - 1;
    else if (event.key === " " && selectable) {
      event.preventDefault();
      row.toggleSelected(!row.getIsSelected());
      selectionAnchorRef.current = row.id;
      return;
    } else {
      triggerRow(event, row.original, onRowActivate);
      return;
    }

    const nextRow =
      navigableRows[Math.max(0, Math.min(nextIndex, navigableRows.length - 1))];
    if (!nextRow || nextRow.id === row.id) return;
    event.preventDefault();
    if (event.shiftKey && selectable) {
      const anchor = selectionAnchorRef.current ?? row.id;
      selectRowRange(anchor, nextRow.id);
      selectionAnchorRef.current = anchor;
    } else {
      selectionAnchorRef.current = nextRow.id;
    }
    setActiveRowId(nextRow.id);
    rowRefs.current.get(nextRow.id)?.focus();
  }

  function handleRowBlur(event: FocusEvent<HTMLTableRowElement>) {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      const rowId = event.currentTarget.dataset.rowId;
      setActiveActionsRowId((current) => (current === rowId ? null : current));
    }
  }

  function renderDataRow(row: (typeof rows)[number]) {
    const rowIsFocusable =
      keyboardNavigation &&
      Boolean(onRowActivate || selectable || renderRowActions);
    return (
      <tr
        key={row.id}
        ref={(node) => {
          if (node) rowRefs.current.set(row.id, node);
          else rowRefs.current.delete(row.id);
        }}
        {...stylex.props(styles.parts.row)}
        data-row-id={row.id}
        data-selected={row.getIsSelected() ? "" : undefined}
        data-actionable={onRowActivate ? "" : undefined}
        tabIndex={
          rowIsFocusable ? (activeRowId === row.id ? 0 : -1) : undefined
        }
        onBlurCapture={handleRowBlur}
        onClick={(event) => triggerRow(event, row.original, onRowActivate)}
        onFocusCapture={() => {
          setActiveRowId(row.id);
          setActiveActionsRowId(row.id);
        }}
        onKeyDown={(event) =>
          keyboardNavigation
            ? handleRowKeyDown(event, row)
            : triggerRow(event, row.original, onRowActivate)
        }
        onMouseEnter={() => setActiveActionsRowId(row.id)}
        onMouseLeave={() =>
          setActiveActionsRowId((current) =>
            current === row.id ? null : current,
          )
        }
      >
        {row.getVisibleCells().map((cell) => {
          const meta = cell.column.columnDef.meta;
          const pinned = cell.column.getIsPinned();
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
                pinned && styles.parts.pinnedCell,
                pinned === "start" &&
                  cell.column.getIsLastColumn("start") &&
                  styles.parts.pinnedStartEdge,
                pinned === "end" &&
                  cell.column.getIsFirstColumn("end") &&
                  styles.parts.pinnedEndEdge,
              )}
              style={pinnedPositionStyle(cell.column)}
            >
              <div
                {...stylex.props(
                  styles.parts.cellContent,
                  meta?.truncate !== false && styles.parts.truncate,
                  alignmentStyle(meta?.align),
                  meta?.tone === "secondary" && styles.parts.secondary,
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
    );
  }

  return (
    <div
      ref={ref}
      {...props}
      className={mergeClassName(rootStyles.className, className)}
      style={{ ...rootStyles.style, ...style }}
      data-dowel-component="data-table"
      data-density={density}
      data-sticky-header={stickyHeader || undefined}
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
          <thead {...stylex.props(stickyHeader && styles.parts.stickyHeader)}>
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
                        header.column.getIsPinned() &&
                          styles.parts.pinnedHeaderCell,
                        header.column.getIsPinned() === "start" &&
                          header.column.getIsLastColumn("start") &&
                          styles.parts.pinnedStartEdge,
                        header.column.getIsPinned() === "end" &&
                          header.column.getIsFirstColumn("end") &&
                          styles.parts.pinnedEndEdge,
                      )}
                      style={pinnedPositionStyle(header.column)}
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
            : groupedRows.map((entry, index) => {
                if (!entry.group) {
                  return (
                    <Fragment key={`rows-${index}`}>
                      {entry.rows.map(renderDataRow)}
                    </Fragment>
                  );
                }

                const collapsed = collapsedGroupSet.has(entry.group.id);
                const context: DataTableGroupContext<TData> = {
                  collapsed,
                  group: entry.group,
                  rows: entry.rows.map((row) => row.original),
                  toggle: () => toggleGroup(entry.group!.id),
                };
                return (
                  <Fragment key={entry.group.id}>
                    <tr {...stylex.props(styles.parts.groupRow)}>
                      <td
                        {...stylex.props(styles.parts.groupCell)}
                        colSpan={Math.max(visibleColumns.length, 1)}
                      >
                        {renderGroupHeader ? (
                          renderGroupHeader(context)
                        ) : (
                          <button
                            {...stylex.props(styles.parts.groupButton)}
                            type="button"
                            aria-expanded={!collapsed}
                            onClick={context.toggle}
                          >
                            <span
                              {...stylex.props(
                                styles.parts.groupChevron,
                                !collapsed && styles.parts.groupChevronExpanded,
                              )}
                              aria-hidden="true"
                            >
                              <span
                                {...stylex.props(
                                  styles.parts.groupChevronGlyph,
                                )}
                              />
                            </span>
                            <span {...stylex.props(styles.parts.groupLabel)}>
                              {entry.group.label}
                            </span>
                            <span {...stylex.props(styles.parts.groupCount)}>
                              {entry.rows.length}
                            </span>
                          </button>
                        )}
                      </td>
                    </tr>
                    {collapsed ? null : entry.rows.map(renderDataRow)}
                  </Fragment>
                );
              })}
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
