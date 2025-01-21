import { describe, it, expect } from "vitest";
import { calculateTotalDiscount } from "../lib/helpers";

describe("calculateTotalDiscount", () => {
  it("should calculate effective discount correctly for products with various discounts", () => {
    const products: any = [
      { price: 100, discountPercentage: 15 },
      { price: 200, discountPercentage: 20 },
    ];

    const result = calculateTotalDiscount(products);

    expect(result.effectiveDiscount).toBe("20.00");
  });

  it("should handle no discounts correctly", () => {
    const products: any = [{ price: 100 }, { price: 200 }];

    const result = calculateTotalDiscount(products);

    expect(result.effectiveDiscount).toBe("0.00");
  });

  it("should handle empty product list", () => {
    const products: any[] = [];

    const result = calculateTotalDiscount(products);

    expect(result.effectiveDiscount).toBe("NaN");
  });

  it("should handle single product correctly", () => {
    const products: any = [{ price: 100, discountPercentage: 15 }];

    const result = calculateTotalDiscount(products);

    expect(result.effectiveDiscount).toBe("20.00");
  });

  it("should handle all products with no price (zero price)", () => {
    const products: any = [
      { price: 0, discountPercentage: 10 },
      { price: 0, discountPercentage: 20 },
    ];

    const result = calculateTotalDiscount(products);

    expect(result.effectiveDiscount).toBe("NaN");
  });
});
