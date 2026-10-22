import { IProductRepository } from "../domain/IProductRepository";
import { Product } from "../domain/Product";
import { Slug } from "@/shared/kernel/Slug";

export class ListProductsUseCase {
  constructor(private readonly repo: IProductRepository) {}

  async execute(category?: string): Promise<Product[]> {
    if (category && category !== "todos") {
      return this.repo.findByCategory(category);
    }
    return this.repo.findAll();
  }
}

export class GetProductBySlugUseCase {
  constructor(private readonly repo: IProductRepository) {}

  async execute(slugString: string): Promise<Product | null> {
    const slug = Slug.create(slugString);
    return this.repo.findBySlug(slug);
  }
}
