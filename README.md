# export-excel-file

Download a basic layout Excel file with CSV-style data.

## Installation

```bash
npm install export-excel-file
```

## Usage

```typescript
import { downloadAsSpreadsheet } from "export-excel-file";

// With array of objects
await downloadAsSpreadsheet([
  { name: "John", age: 30 },
  { name: "Jane", age: 25 }
]);

// With array of arrays
await downloadAsSpreadsheet([
  ["Name", "Age"],
  ["John", 30],
  ["Jane", 25]
]);

// With options
await downloadAsSpreadsheet(data, {
  filename: "report.xlsx",
  sheetTitle: "Data",
  wrapCells: true
});
```
