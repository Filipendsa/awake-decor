import { Money } from "@/shared/kernel/Money";
import { FinishType } from "@/catalog/domain/Product";

export interface CartItemProps {
  id: string;
  productId: string;
  productName: string;
  productSlug: string;
  mockupImage: string;
  finishId: FinishType;
  finishName: string;
  unitPrice: Money;
  quantity: number;
}

export class CartItem {
  private constructor(private readonly props: CartItemProps) {
    if (props.quantity <= 0) throw new Error("Cart item quantity must be positive.");
  }

  public static create(props: CartItemProps): CartItem {
    return new CartItem(props);
  }

  public get id(): string { return this.props.id; }
  public get productId(): string { return this.props.productId; }
  public get productName(): string { return this.props.productName; }
  public get productSlug(): string { return this.props.productSlug; }
  public get mockupImage(): string { return this.props.mockupImage; }
  public get finishId(): FinishType { return this.props.finishId; }
  public get finishName(): string { return this.props.finishName; }
  public get unitPrice(): Money { return this.props.unitPrice; }
  public get quantity(): number { return this.props.quantity; }

  public get subtotal(): Money {
    return this.props.unitPrice.multiply(this.props.quantity);
  }

  public changeQuantity(qty: number): CartItem {
    return CartItem.create({ ...this.props, quantity: qty });
  }
}

export class Cart {
  private constructor(private readonly itemsList: CartItem[]) {}

  public static empty(): Cart {
    return new Cart([]);
  }

  public static fromItems(items: CartItem[]): Cart {
    return new Cart(items);
  }

  public get items(): CartItem[] {
    return [...this.itemsList];
  }

  public get totalItems(): number {
    return this.itemsList.reduce((acc, i) => acc + i.quantity, 0);
  }

  public get subtotal(): Money {
    return this.itemsList.reduce((acc, item) => acc.add(item.subtotal), Money.zero());
  }

  public addItem(item: CartItem): Cart {
    const existingIndex = this.itemsList.findIndex(
      i => i.productId === item.productId && i.finishId === item.finishId
    );

    if (existingIndex >= 0) {
      const existing = this.itemsList[existingIndex];
      const updated = existing.changeQuantity(existing.quantity + item.quantity);
      const newItems = [...this.itemsList];
      newItems[existingIndex] = updated;
      return new Cart(newItems);
    }

    return new Cart([...this.itemsList, item]);
  }

  public removeItem(itemId: string): Cart {
    return new Cart(this.itemsList.filter(i => i.id !== itemId));
  }

  public updateQuantity(itemId: string, qty: number): Cart {
    if (qty <= 0) return this.removeItem(itemId);
    return new Cart(
      this.itemsList.map(i => (i.id === itemId ? i.changeQuantity(qty) : i))
    );
  }
}
