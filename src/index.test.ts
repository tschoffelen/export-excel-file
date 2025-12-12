import { describe, it, expect, vi } from "vitest";
import { downloadAsSpreadsheet } from "./index";

describe("downloadAsSpreadsheet", () => {
  it("should create a download link with correct filename", () => {
    const data = [
      { name: "John", age: 30 },
      { name: "Jane", age: 25 },
    ];

    const createElementSpy = vi.spyOn(document, "createElement");
    const appendChildSpy = vi.spyOn(document.body, "appendChild");
    const removeChildSpy = vi.spyOn(document.body, "removeChild");

    downloadAsSpreadsheet(data, { filename: "test.xlsx" });

    expect(createElementSpy).toHaveBeenCalledWith("a");
    expect(appendChildSpy).toHaveBeenCalled();
    expect(removeChildSpy).toHaveBeenCalled();

    const linkElement = createElementSpy.mock.results[0]?.value as HTMLAnchorElement;
    expect(linkElement.download).toBe("test.xlsx");
  });

  it("should add .xlsx extension if not provided", () => {
    const data = [["Name", "Age"], ["John", 30]];

    const createElementSpy = vi.spyOn(document, "createElement");
    vi.spyOn(document.body, "appendChild");
    vi.spyOn(document.body, "removeChild");

    downloadAsSpreadsheet(data, { filename: "test" });

    const linkElement = createElementSpy.mock.results[0]?.value as HTMLAnchorElement;
    expect(linkElement.download).toBe("test.xlsx");
  });
});
