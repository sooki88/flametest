import "react-data-grid/lib/styles.css";
import DataGrid, { Column, RenderEditCellProps, SortDirection } from "react-data-grid";
import { useEffect, useState } from "react";
import { Test2DatasType } from "../../types/test2.type";
import { test2Years } from "../../constants";
import getDepthStyles from "../../lib/getDepthStyles";

function autoFocusAndSelect(input: HTMLInputElement | null) {
  input?.focus();
  input?.select();
}

function getYearValue(years: { [key: string]: string | null }[], yearKey: string) {
  const yearObj = years.find((year) => year.hasOwnProperty(yearKey));
  return yearObj ? yearObj[yearKey] : "";
}

function CustomTextEditor<TRow extends { years?: { [key: string]: string | null }[] }, TSummaryRow>({
  row,
  column,
  onRowChange,
  onClose,
}: RenderEditCellProps<TRow, TSummaryRow>) {
  return (
    <input
      className="edit-cell-styles"
      ref={autoFocusAndSelect}
      value={row[column.key as keyof TRow] as unknown as string}
      onChange={(e) => {
        const newValue = e.target.value;
        if (!/^\d*$/.test(newValue)) {
          alert("숫자만 입력해주세요.");
          return;
        }

        const updatedRow = {
          ...row,
          years: row.years?.map((year) =>
            year[column.key] !== undefined ? { ...year, [column.key]: newValue } : year,
          ),
        };
        onRowChange(updatedRow);
      }}
      onBlur={() => onClose(true, false)}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          onClose(true);
        }
      }}
    />
  );
}

const columns: Column<any, any>[] = [
  {
    key: "name",
    name: "계정명",
    resizable: false,
    sortable: false,
    width: 225,
    headerCellClass: "th-styles",
    cellClass: "td-styles",
    renderCell: ({ row }) => {
      return getDepthStyles(row.kdDepth, true, row.name);
    },
  },
  {
    key: "20221231",
    name: "2022.12.31 ⇩",
    resizable: false,
    sortable: true,
    width: 225,
    headerCellClass: "th-styles",
    cellClass: "td-styles",
    renderCell: ({ row }) => {
      return getDepthStyles(row.kdDepth, false, getYearValue(row.years || [], "20221231"));
    },
    renderEditCell: CustomTextEditor,
  },
  {
    key: "20231231",
    name: "2023.12.31 ⇩",
    resizable: false,
    sortable: true,
    width: 225,
    headerCellClass: "th-styles",
    cellClass: "td-styles",
    renderCell: ({ row }) => {
      return getDepthStyles(row.kdDepth, false, getYearValue(row.years || [], "20231231"));
    },
    renderEditCell: CustomTextEditor,
  },
  {
    key: "20241231",
    name: "2024.12.31 ⇩",
    resizable: false,
    sortable: true,
    width: 225,
    headerCellClass: "th-styles",
    cellClass: "td-styles",
    renderCell: ({ row }) => {
      return getDepthStyles(row.kdDepth, false, getYearValue(row.years || [], "20241231"));
    },
    renderEditCell: CustomTextEditor,
  },
];

export default function Test2Table({ test2Datas }: { test2Datas: Test2DatasType[] }) {
  const [datas, setDatas] = useState<Test2DatasType[]>([]);

  useEffect(() => {
    const mappingYears = test2Datas.map((data) => {
      if (!data.years) {
        return { ...data, years: test2Years.map((year) => ({ [year]: null })) };
      } else {
        return data;
      }
    });

    setDatas(mappingYears);
  }, [test2Datas]);

  const handleExport = (sortColumns: { columnKey: string; direction: SortDirection }[]) => {
    const columnKey = sortColumns[0].columnKey;
    const output = datas.map((data) => {
      const updatedYears = data.years?.filter((yearObj: { [key: string]: string | null }) => {
        return yearObj.hasOwnProperty(columnKey);
      });
      return {
        ...data,
        years: updatedYears,
      };
    });

    console.log(JSON.stringify(output, null, 2));
  };

  return (
    <div className="w-full overflow-hidden rounded-lg">
      <DataGrid
        columns={columns}
        rows={datas}
        headerRowHeight={32}
        rowHeight={32}
        className="rdg-light h-full w-full border border-gray-200"
        onSortColumnsChange={handleExport}
        onRowsChange={(newRows) => setDatas(newRows as unknown as Test2DatasType[])}
      />
    </div>
  );
}
