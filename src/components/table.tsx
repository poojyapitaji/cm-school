import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  Pagination,
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
  TableRow,
  TableCell,
  getKeyValue,
  Tooltip,
  Selection,
} from "@nextui-org/react";

import SearchInput from "./search-input";
import { Delete, DownArrow, Edit, Filter, OpenEye } from "./icons";

import { convertToTitleCase } from "@/utils";
import {
  CMTableActionTypes,
  CMTableColumn,
  CMTableDataItem,
  CMTableProps,
} from "@/types";

const getSelectedData = (
  selectedKeys: Set<string>,
  data: CMTableDataItem[]
): CMTableDataItem[] => {
  const selectedKeysSet = Array.from(selectedKeys);

  return selectedKeysSet.reduce((acc: CMTableDataItem[], d: string) => {
    const dataItem = data.find((item) => item.key === d);

    if (dataItem) {
      acc.push(dataItem);
    }

    return acc;
  }, []);
};

const CMTable: React.FC<CMTableProps> = ({
  columns = [],
  tableData = [],
  actions = [],
  paginationProps = undefined,
  searchPlaceholder = "Search",
  isFilterable = false,
  filterContent: FilterContent = undefined,
  showTotalCount = true,
  showRowsPerPageSelector = true,
  showSelectedCount = true,
  rowPerPage = 10,
  pageSizeInterval = 5,
  bulkActionContent = () => null,
  onBulkDelete = () => {},
  ...props
}) => {
  const actionColumn: CMTableColumn = {
    uid: "actions",
    name: "Actions",
    sortable: false,
  };

  const hasActions = actions.length > 0;
  const initialColumns = hasActions ? [...columns, actionColumn] : columns;

  const [data, setData] = useState<CMTableDataItem[]>(tableData);

  const [tableColumns, setTableColumns] = useState(initialColumns);
  const [visibleColumns, setVisibleColumns] = useState<Set<string>>(
    new Set(initialColumns.map((column) => column.uid))
  );
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(rowPerPage);
  const [showFilterContent, setShowFilterContent] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());

  useEffect(() => {
    const updatedColumns = hasActions ? [...columns, actionColumn] : columns;

    setTableColumns(updatedColumns);
    setVisibleColumns(new Set(updatedColumns.map((column) => column.uid)));
  }, [columns, actions, hasActions]);

  const pages = useMemo(
    () => Math.ceil(data.length / rowsPerPage),
    [data.length, rowsPerPage]
  );

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;

    return data.slice(start, start + rowsPerPage);
  }, [page, data, rowsPerPage]);

  const headerColumns = useMemo(() => {
    return tableColumns.filter((column) => visibleColumns.has(column.uid));
  }, [visibleColumns, tableColumns]);

  const handleSelectionChange = useCallback((keys: Selection) => {
    setVisibleColumns(new Set(Array.from(keys).map(String)));
  }, []);

  const toggleFilterContent = useCallback(() => {
    setShowFilterContent((prevState) => !prevState);
  }, []);

  const onRowsPerPageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSelectionChangeHandler = useCallback(
    (keys: Selection) => {
      setSelectedKeys(
        keys === "all"
          ? new Set(data.map((d) => d.key))
          : new Set(keys as Set<string>)
      );
    },
    [data, visibleColumns]
  );

  useEffect(() => {
    if (selectedKeys.size !== 0) {
      setVisibleColumns((prevVisibleColumns) => {
        const updatedColumnsArray = Array.from(prevVisibleColumns).filter(
          (c) => c !== "actions"
        );

        return new Set(updatedColumnsArray);
      });
    } else {
      setVisibleColumns(
        (prevVisibleColumns) =>
          new Set([...prevVisibleColumns, actionColumn.uid])
      );
    }
  }, [selectedKeys, onBulkDelete]);

  const rowOptions = useMemo(() => {
    const options = [];
    const maxPerPage =
      Math.ceil(data.length / pageSizeInterval) * pageSizeInterval;

    for (let i = pageSizeInterval; i <= maxPerPage; i += pageSizeInterval) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }

    return options;
  }, [data.length, pageSizeInterval]);

  const topContent = useMemo(() => {
    return showSelectedCount && selectedKeys.size == 0 ? (
      <div>
        {showFilterContent && FilterContent && (
          <FilterContent
            data={data}
            onDataFilter={(filteredData) => setData(filteredData)}
          />
        )}
        <div className="flex gap-4">
          <div className="w-full sm:max-w-[44%]">
            <SearchInput placeholder={searchPlaceholder} size="sm" />
          </div>
          <div className="flex gap-2 flex-1 items-center justify-end">
            {isFilterable && (
              <Tooltip content={"Toggle filter options"}>
                <Button
                  className="w-auto min-w-[auto] px-2"
                  size="sm"
                  startContent={<Filter size={22} />}
                  variant="light"
                  onPress={toggleFilterContent}
                />
              </Tooltip>
            )}
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<DownArrow size={20} />}
                  size="sm"
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="table columns"
                closeOnSelect={false}
                selectedKeys={Array.from(visibleColumns)}
                selectionMode="multiple"
                onSelectionChange={handleSelectionChange}
              >
                {tableColumns.map((column) => (
                  <DropdownItem key={column.uid}>{column.name}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="flex justify-between items-center mt-2">
          {showTotalCount && (
            <span className="text-default-400 text-small">
              Total {data.length} items
            </span>
          )}
          {showRowsPerPageSelector && (
            <label className="flex items-center text-default-400 text-small">
              Rows per page:
              <select
                className="bg-transparent outline-none text-default-400 text-small ml-2"
                value={rowsPerPage}
                onChange={onRowsPerPageChange}
              >
                {rowOptions}
              </select>
            </label>
          )}
        </div>
      </div>
    ) : (
      <div className="flex items-center mt-2">
        {bulkActionContent &&
          bulkActionContent(getSelectedData(selectedKeys, data))}
        <Button
          color="danger"
          size="sm"
          startContent={<Delete size={18} />}
          variant="flat"
          onPress={() => onBulkDelete(getSelectedData(selectedKeys, data))}
        >
          Delete
        </Button>
      </div>
    );
  }, [
    tableColumns,
    visibleColumns,
    showFilterContent,
    FilterContent,
    searchPlaceholder,
    isFilterable,
    rowsPerPage,
    data.length,
    showTotalCount,
    showRowsPerPageSelector,
    selectedKeys,
    getSelectedData,
    bulkActionContent,
  ]);

  const bottomContent = useMemo(() => {
    if (!pages) return null;

    return (
      <div className="flex w-full justify-between items-center">
        <Pagination
          showControls
          color="primary"
          page={page}
          size="sm"
          total={pages}
          onChange={(page) => setPage(page)}
          {...paginationProps}
        />
        {showSelectedCount && (
          <div className="flex items-center mt-2">
            <span className="text-small text-default-400 ml-4">
              {selectedKeys.size === data.length
                ? "All items selected"
                : `${selectedKeys.size} of ${data.length} selected`}
            </span>
          </div>
        )}
      </div>
    );
  }, [
    pages,
    page,
    paginationProps,
    showSelectedCount,
    selectedKeys,
    bulkActionContent,
  ]);

  const renderIcon = (type: CMTableActionTypes) => {
    switch (type) {
      case "VIEW":
        return <OpenEye size={18} />;
      case "EDIT":
        return <Edit size={18} />;
      case "DELETE":
        return <Delete className="text-red-500" size={18} />;
      default:
        return type;
    }
  };

  const renderActionButtons = (item: any) => {
    return (
      <div className="flex flex-row justify-center items-center gap-0.5">
        {actions.map((action) => (
          <Tooltip
            key={action.type}
            color={action.type === "DELETE" ? "danger" : "default"}
            content={convertToTitleCase(action.type)}
          >
            <Button
              className="p-1 min-w-0 w-auto h-auto bg-transparent rounded-full text-default-400"
              size="sm"
              startContent={action.icon ? action.icon : renderIcon(action.type)}
              variant="flat"
              onClick={() => action.callback(item)}
            />
          </Tooltip>
        ))}
      </div>
    );
  };

  return (
    <div>
      <Table
        aria-labelledby="cm-table"
        bottomContent={bottomContent}
        radius="sm"
        selectionMode={showSelectedCount ? "multiple" : "none"}
        topContent={topContent}
        onSelectionChange={onSelectionChangeHandler}
        {...props}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No rows to display."} items={items}>
          {(item) => (
            <TableRow key={item.key}>
              {(columnKey) => (
                <TableCell className="truncate">
                  {columnKey === "actions"
                    ? renderActionButtons(item)
                    : getKeyValue(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CMTable;
