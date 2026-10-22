import { Product } from "../domain/Product";
import { Slug } from "@/shared/kernel/Slug";

export interface IProductRepository {
  findAll(): Promise<Product[]>;
  findBySlug(slug: Slug): Promise<Product | null>;
  findFeatured(): Promise<Product[]>;
  findByCategory(category: string): Promise<Product[]>;
}
