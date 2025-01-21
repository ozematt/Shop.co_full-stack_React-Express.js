import { describe, it, expect } from "vitest";
import { generatePagination } from "../lib/helpers/generatePagination";

describe("generatePagination", () => {
  it("should return all pages if totalPages <= 5", () => {
    expect(generatePagination(1, 3)).toEqual([1, 2, 3]);
    expect(generatePagination(2, 5)).toEqual([1, 2, 3, 4, 5]);
  });

  it("should handle case where currentPage is in the middle", () => {
    expect(generatePagination(5, 10)).toEqual([1, "...", 4, 5, 6, "...", 10]);
    expect(generatePagination(6, 12)).toEqual([1, "...", 5, 6, 7, "...", 12]);
  });

  it("should handle edge cases for invalid inputs", () => {
    expect(generatePagination(1, 1)).toEqual([1]);
    expect(generatePagination(0, 5)).toEqual([1, 2, 3, 4, 5]); // assuming page 0 maps to the start
    expect(generatePagination(-1, 5)).toEqual([1, 2, 3, 4, 5]); // invalid page number
    expect(generatePagination(3, 0)).toEqual([]); // no pages available
  });
});
