export type InputData = Record<string, any>[] | any[][];

export type DownloadExcelFileOptions = {
  filename?: string;
  cellPadding?: number;
  sheetTitle?: string;
};
