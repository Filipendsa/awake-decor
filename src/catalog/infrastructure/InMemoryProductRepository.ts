import { Product, ProductFinish } from "../domain/Product";
import { IProductRepository } from "../domain/IProductRepository";
import { Slug } from "@/shared/kernel/Slug";
import { Money } from "@/shared/kernel/Money";

const defaultFinishes: ProductFinish[] = [
  { id: "madeira_natural", name: "Madeira Natural Warm Oak", colorHex: "#C59B63", priceModifierPercent: 0 },
  { id: "mdf_preto", name: "MDF Preto Fosco Prime", colorHex: "#1E1E24", priceModifierPercent: 5 },
  { id: "acrilico_branco", name: "Acrílico Branco Soft", colorHex: "#F7F6F2", priceModifierPercent: 12 },
  { id: "mdf_dourado", name: "Dourado Champagne Luxury", colorHex: "#D4AF37", priceModifierPercent: 18 }
];

export class InMemoryProductRepository implements IProductRepository {
  private products: Product[] = [];

  constructor() {
    this.seed();
  }

  private seed() {
    this.products = [
      Product.create({
        id: "prod-1",
        name: "Lettering Salmo 23",
        slug: Slug.create("salmo-23"),
        subtitle: "O Senhor é o Meu Pastor; nada me faltará",
        description: "Peça de parede em corte a laser de alta precisão. Acabamento refinado que transforma living, halls e cabeceiras em santuários de serenidade e presença estética.",
        category: "fe",
        basePrice: Money.fromReais(289),
        dimensions: { widthCm: 110, heightCm: 35, depthMm: 6 },
        deliveryDaysMin: 3,
        deliveryDaysMax: 5,
        mockupImage: "/products/salmo-23.png",
        propSvg: "/props/salmo-23.svg",
        availableFinishes: defaultFinishes,
        isFeatured: true
      }),
      Product.create({
        id: "prod-2",
        name: "Lettering Filipenses 4:13",
        slug: Slug.create("filipenses-413"),
        subtitle: "Tudo posso Naquele que me fortalece",
        description: "Tipografia fluida e contemporânea com presença marcante. Perfeito para compor ambientes corporativos de alto padrão, escritórios ou quartos master.",
        category: "fe",
        basePrice: Money.fromReais(279),
        dimensions: { widthCm: 105, heightCm: 32, depthMm: 6 },
        deliveryDaysMin: 3,
        deliveryDaysMax: 5,
        mockupImage: "/products/filipenses-413.png",
        propSvg: "/props/filipenses-413.svg",
        availableFinishes: defaultFinishes,
        isFeatured: true
      }),
      Product.create({
        id: "prod-3",
        name: "Abstrato Curvo Infinito",
        slug: Slug.create("abstrato-curvo"),
        subtitle: "Composição geométrica de curvas contínuas",
        description: "Escultura de parede com ritmo orgânico inspirada na arquitetura escandinava e minimalista. Cria jogos de luz e sombra elegantes ao longo do dia.",
        category: "abstrato",
        basePrice: Money.fromReais(380),
        dimensions: { widthCm: 130, heightCm: 50, depthMm: 9 },
        deliveryDaysMin: 4,
        deliveryDaysMax: 6,
        mockupImage: "/products/abstrato-curvo.png",
        propSvg: "/props/abstrato-curvo.svg",
        availableFinishes: defaultFinishes,
        isFeatured: true
      }),
      Product.create({
        id: "prod-4",
        name: "Abstrato Livre Orgânico",
        slug: Slug.create("abstrato-livre"),
        subtitle: "Formas fluídas em camadas esculturais",
        description: "Peça contemporânea volumétrica com traços livres. Proporciona sofisticação e atmosfera de galeria de arte a ambientes amplos.",
        category: "abstrato",
        basePrice: Money.fromReais(410),
        dimensions: { widthCm: 120, heightCm: 60, depthMm: 9 },
        deliveryDaysMin: 4,
        deliveryDaysMax: 6,
        mockupImage: "/products/abstrato-livre.png",
        propSvg: "/props/abstrato-livre.svg",
        availableFinishes: defaultFinishes,
        isFeatured: true
      }),
      Product.create({
        id: "prod-5",
        name: "Conjunto Revoada de Aves",
        slug: Slug.create("aves"),
        subtitle: "5 silhuetas dinâmicas em perspectiva",
        description: "Composição modular com 5 aves em voo. Permite montagem personalizada e distribuição fluida na parede para transmitir liberdade e amplitude.",
        category: "natureza",
        basePrice: Money.fromReais(249),
        dimensions: { widthCm: 140, heightCm: 45, depthMm: 6 },
        deliveryDaysMin: 3,
        deliveryDaysMax: 5,
        mockupImage: "/products/aves.png",
        propSvg: "/props/aves.svg",
        availableFinishes: defaultFinishes,
        isFeatured: true
      }),
      Product.create({
        id: "prod-6",
        name: "Lettering Pra Sempre, Nós",
        slug: Slug.create("pra-sempre-nos"),
        subtitle: "Traço contínuo com coração minimalista",
        description: "Simbolismo de afeto e compromisso em linhas suaves. Destaque elegante para cabeceiras de cama e cantos acolhedores.",
        category: "frases",
        basePrice: Money.fromReais(229),
        dimensions: { widthCm: 95, heightCm: 28, depthMm: 6 },
        deliveryDaysMin: 3,
        deliveryDaysMax: 5,
        mockupImage: "/products/pra-sempre-nos.png",
        propSvg: "/props/pra-sempre-nos.svg",
        availableFinishes: defaultFinishes
      }),
      Product.create({
        id: "prod-7",
        name: "Painel Lar Amor Família",
        slug: Slug.create("lar-amor-familia"),
        subtitle: "Trilogia essencial de valores e acolhimento",
        description: "Composição tipográfica em relevo que aquece a sala de jantar, circulação ou estar íntimo.",
        category: "familia",
        basePrice: Money.fromReais(269),
        dimensions: { widthCm: 115, heightCm: 30, depthMm: 6 },
        deliveryDaysMin: 3,
        deliveryDaysMax: 5,
        mockupImage: "/products/lar-amor-familia.png",
        propSvg: "/props/lar-amor-familia.svg",
        availableFinishes: defaultFinishes
      }),
      Product.create({
        id: "prod-8",
        name: "Lettering Família",
        slug: Slug.create("familia"),
        subtitle: "Onde a vida começa e o amor nunca termina",
        description: "Presença escultórica com acabamento em tons amadeirados nobres ou pintura acetinada.",
        category: "familia",
        basePrice: Money.fromReais(239),
        dimensions: { widthCm: 90, heightCm: 35, depthMm: 6 },
        deliveryDaysMin: 3,
        deliveryDaysMax: 5,
        mockupImage: "/products/familia.png",
        propSvg: "/props/familia.svg",
        availableFinishes: defaultFinishes
      }),
      Product.create({
        id: "prod-9",
        name: "Composição Pequeno Príncipe",
        slug: Slug.create("pequeno-principe"),
        subtitle: "Aqui repousa um pequeno príncipe com coroa de nuvem",
        description: "Peça lúdica e poética desenvolvida especialmente para quartos infantis e de bebês. Traços delicados e seguros.",
        category: "infantil",
        basePrice: Money.fromReais(249),
        dimensions: { widthCm: 100, heightCm: 40, depthMm: 6 },
        deliveryDaysMin: 3,
        deliveryDaysMax: 5,
        mockupImage: "/products/pequeno-principe.png",
        propSvg: "/props/pequeno-principe.svg",
        availableFinishes: defaultFinishes
      }),
      Product.create({
        id: "prod-10",
        name: "Escultura Botânica Flores Silvestres",
        slug: Slug.create("flores"),
        subtitle: "Linhas botânicas de caule duplo com leveza floral",
        description: "Design biofílico minimalista que traz frescor e delicadeza para lavabos, corredores e paredes de destaque.",
        category: "natureza",
        basePrice: Money.fromReais(219),
        dimensions: { widthCm: 60, heightCm: 70, depthMm: 6 },
        deliveryDaysMin: 3,
        deliveryDaysMax: 5,
        mockupImage: "/products/flores.png",
        propSvg: "/props/flores.svg",
        availableFinishes: defaultFinishes
      }),
      Product.create({
        id: "prod-11",
        name: "Lettering A Força",
        slug: Slug.create("a-forca"),
        subtitle: "Que move nossos dias com determinação",
        description: "Tipografia imponente com estilo contemporâneo para ambientes modernos e inspiradores.",
        category: "frases",
        basePrice: Money.fromReais(219),
        dimensions: { widthCm: 85, heightCm: 30, depthMm: 6 },
        deliveryDaysMin: 3,
        deliveryDaysMax: 5,
        mockupImage: "/products/a-forca.png",
        propSvg: "/props/a-forca.svg",
        availableFinishes: defaultFinishes
      })
    ];
  }

  async findAll(): Promise<Product[]> {
    return [...this.products];
  }

  async findBySlug(slug: Slug): Promise<Product | null> {
    const found = this.products.find(p => p.slug.toString() === slug.toString());
    return found || null;
  }

  async findFeatured(): Promise<Product[]> {
    return this.products.filter(p => p.isFeatured);
  }

  async findByCategory(category: string): Promise<Product[]> {
    if (!category || category === "todos") return this.findAll();
    return this.products.filter(p => p.category === category);
  }
}
