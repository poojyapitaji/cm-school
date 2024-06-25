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
} from "@nextui-org/react";
import React, { useEffect, useMemo, useState } from "react";

import SearchInput from "./search-input";
import { Delete, DownArrow, Edit, OpenEye, Plus } from "./icons";

import { convertToTitleCase } from "@/utils";
import { CMTableActionTypes, CMTableColumn, CMTableProps } from "@/types";

const CMTable: React.FC<CMTableProps> = ({
  columns = [],
  data = [],
  actions = [],
  paginationProps = undefined,
  searchPlaceholder = "Search",
  ...props
}) => {
  const actionColumn: CMTableColumn = {
    uid: "actions",
    name: "Actions",
    sortable: false,
  };

  const hasActions = actions.length > 0;
  const initialColumns = hasActions ? [...columns, actionColumn] : columns;

  const [tableColumns, setTableColumns] = useState(initialColumns);
  const [visibleColumns, setVisibleColumns] = useState<Set<string>>(
    new Set(initialColumns.map((column) => column.uid))
  );
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

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
  }, [page, data]);

  const headerColumns = useMemo(() => {
    return tableColumns.filter((column) => visibleColumns.has(column.uid));
  }, [visibleColumns, tableColumns]);

  const handleSelectionChange = (keys: "all" | Set<React.Key>) => {
    if (keys === "all") {
      setVisibleColumns(new Set(tableColumns.map((column) => column.uid)));
    } else {
      setVisibleColumns(new Set([...keys].map((key) => key.toString())));
    }
  };

  const topContent = useMemo(() => {
    return (
      <div className="flex gap-4">
        <div className="w-full sm:max-w-[44%]">
          <SearchInput placeholder={searchPlaceholder} size="sm" />
        </div>
        <div className="flex gap-3 flex-1 justify-end">
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
    );
  }, [tableColumns, visibleColumns]);

  const bottomContent = useMemo(() => {
    if (!pages) return null;

    return (
      <div className="flex w-full justify-end items-center">
        <Pagination
          showControls
          color="primary"
          page={page}
          size="sm"
          total={pages}
          onChange={(page) => setPage(page)}
          {...paginationProps}
        />
      </div>
    );
  }, [pages, page]);

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
        topContent={topContent}
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
