# download-excel-file

Download a basic layout Excel file with CSV-style data.

## Installation

```bash
npm install download-excel-file
```

## Usage

```typescript
import { downloadExcelFile } from 'download-excel-file';

// With array of objects
downloadExcelFile([
  { name: 'John', age: 30 },
  { name: 'Jane', age: 25 }
]);

// With array of arrays
downloadExcelFile([
  ['Name', 'Age'],
  ['John', 30],
  ['Jane', 25]
]);

// With options
downloadExcelFile(data, {
  filename: 'report.xlsx',
  sheetTitle: 'Data',
  cellPadding: 2
});
```

## License

MIT
