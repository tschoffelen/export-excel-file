import * as XLSX from "xlsx";

import { DownloadExcelFileOptions, InputData } from "./types";

export const autoSizeColumns = (
  worksheet: XLSX.WorkSheet,
  headers: string[],
  data: InputData,
  options: DownloadExcelFileOptions = {}
) => {
  const columnWidths = headers.map((header, colIndex) => {
    let maxWidth = header.length;

    data.forEach((row) => {
      let cellValue: string;
      if (Array.isArray(row)) {
        cellValue = String(row[colIndex] ?? "");
      } else {
        cellValue = String(row[header] ?? "");
      }
      maxWidth = Math.max(maxWidth, cellValue.length);
    });

    return {
      wch: Math.min(Math.max(maxWidth + (options.cellPadding ?? 2), 10), 50),
    };
  });

  worksheet["!cols"] = columnWidths;
};

export const makeHeaderBold = (
  worksheet: XLSX.WorkSheet,
  headers: string[]
) => {
  headers.forEach((_, colIndex) => {
    const cellAddress = XLSX.utils.encode_cell({ r: 0, c: colIndex });
    if (!worksheet[cellAddress]) return;

    worksheet[cellAddress].s = {
      font: { bold: true },
    };
  });
};

export const downloadFile = (blob: Blob, filename: string) => {
  const url = window.URL.createObjectURL(blob);
  
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  
  document.body.appendChild(link);
  link.click();
  
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};
