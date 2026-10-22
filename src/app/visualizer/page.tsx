
import React from "react";
import { Header } from "@/shared/design-system/Header";
import { BottomNav } from "@/shared/design-system/BottomNav";
import { InMemoryProductRepository } from "@/catalog/infrastructure/InMemoryProductRepository";
import { VisualizerStage } from "@/room-visualizer/ui/VisualizerStage";

export const metadata = {
  title: "Simulador no Meu Espaço | Awake Home Decor",
  description: "Projete as peças decorativas Awake na sua parede em tempo real via câmera ou foto.",
};

interface VisualizerPageProps {
  searchParams: Promise<{ product?: string }>;
}

export default async function VisualizerPage({ searchParams }: VisualizerPageProps) {
  const resolvedParams = await searchParams;
  const repo = new InMemoryProductRepository();
  const allProducts = await repo.findAll();

  const formattedForStage = allProducts.map((p) => ({
    id: p.id,
    name: p.name,
    slug: p.slug.toString(),
    propSvg: p.propSvg,
    mockupImage: p.mockupImage,
    basePriceReais: p.basePrice.reais,
  }));

  return (
    <div className="mobile-app-shell" style={{ backgroundColor: "#0F121C" }}>
      <Header theme="blue" showSimulatorBadge={false} />
      <main>
        <VisualizerStage
          initialProducts={formattedForStage}
          selectedProductSlug={resolvedParams.product}
        />
      </main>
      <BottomNav />
    </div>
  );
}
