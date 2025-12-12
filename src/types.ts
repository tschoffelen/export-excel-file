export type InputData = Record<string, any>[] | any[][];

export type DownloadExcelFileOptions = {
  filename?: string;
  cellPadding?: number;
  maxCellWidth?: number;
  minCellWidth?: number;
  sheetTitle?: string;
  wrapCells?: boolean;
};
