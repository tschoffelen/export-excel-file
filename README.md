# export-excel-file

Download a basic layout Excel file with CSV-style data.

## Installation

```bash
npm install export-excel-file
```

## Usage

```typescript
import { downloadAsSpreadsheet } from 'export-excel-file';

// With array of objects
downloadAsSpreadsheet([
  { name: 'John', age: 30 },
  { name: 'Jane', age: 25 }
]);

// With array of arrays
downloadAsSpreadsheet([
  ['Name', 'Age'],
  ['John', 30],
  ['Jane', 25]
]);

// With options
downloadAsSpreadsheet(data, {
  filename: 'report.xlsx',
  sheetTitle: 'Data',
  cellPadding: 2
});
```
