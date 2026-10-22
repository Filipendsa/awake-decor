import { Money } from "@/shared/kernel/Money";
import { Slug } from "@/shared/kernel/Slug";

export interface Dimensions {
  widthCm: number;
  heightCm: number;
  depthMm?: number;
}

export type FinishType = "mdf_cru" | "mdf_dourado" | "mdf_preto" | "acrilico_branco" | "madeira_natural";

export interface ProductFinish {
  id: FinishType;
  name: string;
  colorHex: string;
  priceModifierPercent: number;
}

export type ProductCategory = "frases" | "fe" | "familia" | "abstrato" | "natureza" | "infantil";

export interface ProductProps {
  id: string;
  name: string;
  slug: Slug;
  subtitle: string;
  description: string;
  category: ProductCategory;
  basePrice: Money;
  dimensions: Dimensions;
  deliveryDaysMin: number;
  deliveryDaysMax: number;
  mockupImage: string;
  propSvg: string;
  availableFinishes: ProductFinish[];
  isFeatured?: boolean;
}

export class Product {
  private constructor(private readonly props: ProductProps) {
    if (!props.name || props.name.trim().length === 0) {
      throw new Error("Product must have a non-empty name.");
    }
    if (props.dimensions.widthCm <= 0 || props.dimensions.heightCm <= 0) {
      throw new Error("Product dimensions must be positive numbers.");
    }
    if (props.deliveryDaysMin > props.deliveryDaysMax) {
      throw new Error("Minimum delivery days cannot exceed maximum delivery days.");
    }
  }

  public static create(props: ProductProps): Product {
    return new Product(props);
  }

  public get id(): string { return this.props.id; }
  public get name(): string { return this.props.name; }
  public get slug(): Slug { return this.props.slug; }
  public get subtitle(): string { return this.props.subtitle; }
  public get description(): string { return this.props.description; }
  public get category(): ProductCategory { return this.props.category; }
  public get basePrice(): Money { return this.props.basePrice; }
  public get dimensions(): Dimensions { return this.props.dimensions; }
  public get deliveryDaysMin(): number { return this.props.deliveryDaysMin; }
  public get deliveryDaysMax(): number { return this.props.deliveryDaysMax; }
  public get mockupImage(): string { return this.props.mockupImage; }
  public get propSvg(): string { return this.props.propSvg; }
  public get availableFinishes(): ProductFinish[] { return [...this.props.availableFinishes]; }
  public get isFeatured(): boolean { return !!this.props.isFeatured; }

  public calculatePriceForFinish(finishId: FinishType): Money {
    const finish = this.props.availableFinishes.find(f => f.id === finishId);
    if (!finish) return this.props.basePrice;
    const modifier = 1 + (finish.priceModifierPercent / 100);
    return this.props.basePrice.multiply(modifier);
  }

  public getDeliveryPromiseText(): string {
    return `Produção expressa: entrega em ${this.props.deliveryDaysMin} a ${this.props.deliveryDaysMax} dias úteis`;
  }
}
