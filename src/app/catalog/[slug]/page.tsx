import React, { Suspense } from "react";
import { notFound } from "next/navigation";
import { Header } from "@/shared/design-system/Header";
import { BottomNav } from "@/shared/design-system/BottomNav";
import { InMemoryProductRepository } from "@/catalog/infrastructure/InMemoryProductRepository";
import { GetProductBySlugUseCase } from "@/catalog/application/ProductUseCases";
import { ProductDetailView } from "./ProductDetailView";



interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const repo = new InMemoryProductRepository();
  const all = await repo.findAll();
  return all.map((p) => ({
    slug: p.slug.toString(),
  }));
}

export async function generateMetadata({ params }: ProductPageProps) {
  const resolved = await params;
  const repo = new InMemoryProductRepository();
  const useCase = new GetProductBySlugUseCase(repo);
  const product = await useCase.execute(resolved.slug);

  if (!product) return { title: "Produto não encontrado | Awake Home Decor" };

  return {
    title: `${product.name} | Awake Home Decor`,
    description: product.subtitle,
    openGraph: {
      images: [product.mockupImage],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolved = await params;
  const repo = new InMemoryProductRepository();
  const useCase = new GetProductBySlugUseCase(repo);
  const product = await useCase.execute(resolved.slug);

  if (!product) {
    notFound();
  }

  const serializedProduct = {
    id: product.id,
    name: product.name,
    slug: product.slug.toString(),
    subtitle: product.subtitle,
    description: product.description,
    category: product.category,
    basePriceReais: product.basePrice.reais,
    dimensions: product.dimensions,
    deliveryDaysMin: product.deliveryDaysMin,
    deliveryDaysMax: product.deliveryDaysMax,
    mockupImage: product.mockupImage,
    propSvg: product.propSvg,
    availableFinishes: product.availableFinishes,
  };

  return (
    <div className="mobile-app-shell">
      <Header theme="white" />
      <main className="page-bottom-pad">
        <Suspense fallback={<div style={{ padding: 40, textAlign: "center" }}>Carregando produto...</div>}>
          <ProductDetailView product={serializedProduct} />
        </Suspense>
      </main>
      <BottomNav />
    </div>
  );
}