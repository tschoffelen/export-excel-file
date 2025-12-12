import * as XLSX from "xlsx";

import { DownloadExcelFileOptions, InputData } from "./types";
import { autoSizeColumns, downloadFile, makeHeaderBold } from "./utils";

export type { DownloadExcelFileOptions, InputData };

export const downloadAsSpreadsheet = (
  data: InputData,
  options: DownloadExcelFileOptions = {}
) => {
  let worksheet: XLSX.WorkSheet;
  let headers: string[] = [];

  if (data.length > 0 && Array.isArray(data[0])) {
    // Data is array of arrays - first array is the header row
    worksheet = XLSX.utils.aoa_to_sheet(data as any[][]);
    headers = data[0].map(String);
  } else {
    // Data is array of objects - keys represent the header row
    worksheet = XLSX.utils.json_to_sheet(data as Record<string, any>[]);
    headers = data.length > 0 ? Object.keys(data[0]) : [];
  }

  autoSizeColumns(worksheet, headers, data, options);
  makeHeaderBold(worksheet, headers);

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    options.sheetTitle || "Data"
  );

  // Generate Excel file
  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
    cellStyles: true
  });
  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  let filename = options.filename || "data.xlsx";
  if (filename.slice(-5).toLowerCase() !== ".xlsx") {
    filename += ".xlsx";
  }

  downloadFile(blob, filename);
};
