import { describe, it, expect } from "vitest";
import { InMemoryProductRepository } from "./InMemoryProductRepository";
import { ListProductsUseCase, GetProductBySlugUseCase } from "../application/ProductUseCases";

describe("Catalog Use Cases", () => {
  const repo = new InMemoryProductRepository();

  it("lists all 11 products", async () => {
    const useCase = new ListProductsUseCase(repo);
    const products = await useCase.execute();
    expect(products.length).toBe(11);
  });

  it("filters products by category", async () => {
    const useCase = new ListProductsUseCase(repo);
    const faithProducts = await useCase.execute("fe");
    expect(faithProducts.length).toBe(2);
    expect(faithProducts.map(p => p.slug.toString())).toContain("salmo-23");
  });

  it("finds product by slug and calculates finish price", async () => {
    const useCase = new GetProductBySlugUseCase(repo);
    const product = await useCase.execute("salmo-23");
    expect(product).not.toBeNull();
    expect(product?.name).toBe("Lettering Salmo 23");

    // Gold finish has +18% modifier
    const goldPrice = product!.calculatePriceForFinish("mdf_dourado");
    expect(goldPrice.reais).toBeCloseTo(289 * 1.18, 0);
  });
});
