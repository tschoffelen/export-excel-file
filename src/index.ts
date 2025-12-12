import ExcelJS from "exceljs";

import { DownloadExcelFileOptions, InputData } from "./types";
import { downloadFile } from "./utils";

export type { DownloadExcelFileOptions, InputData };

export const downloadAsSpreadsheet = async (
  data: InputData,
  options: DownloadExcelFileOptions = {}
) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(options.sheetTitle || "Data");

  let headers: string[] = [];
  let rows: any[][] = [];

  if (data.length > 0 && Array.isArray(data[0])) {
    // Data is array of arrays - first array is the header row
    headers = data[0].map(String);
    rows = data.slice(1) as any[][];
  } else {
    // Data is array of objects - keys represent the header row
    headers = data.length > 0 ? Object.keys(data[0]) : [];
    rows = (data as Record<string, any>[]).map(row =>
      headers.map(header => row[header])
    );
  }

  // Add header row with bold styling
  const headerRow = worksheet.addRow(headers);
  headerRow.font = { bold: true };

  // Add data rows
  rows.forEach(row => {
    worksheet.addRow(row);
  });

  // Apply text wrapping if enabled
  if (options.wrapCells) {
    worksheet.eachRow((row) => {
      row.eachCell((cell) => {
        cell.alignment = { wrapText: true };
      });
    });
  }

  // Auto-size columns
  const cellPadding = options.cellPadding ?? 2;
  const minCellWidth = options.minCellWidth ?? 10;
  const maxCellWidth = options.maxCellWidth ?? 50;

  worksheet.columns.forEach((column, colIndex) => {
    let maxWidth = headers[colIndex]?.length || 0;

    rows.forEach(row => {
      const cellValue = String(row[colIndex] ?? "");
      maxWidth = Math.max(maxWidth, cellValue.length);
    });

    column.width = Math.min(
      Math.max(maxWidth + cellPadding, minCellWidth),
      maxCellWidth
    );
  });

  // Generate Excel file
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  let filename = options.filename || "data.xlsx";
  if (filename.slice(-5).toLowerCase() !== ".xlsx") {
    filename += ".xlsx";
  }

  downloadFile(blob, filename);
};
