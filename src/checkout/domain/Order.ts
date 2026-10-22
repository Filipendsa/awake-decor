import { Cart } from "@/cart/domain/Cart";
import { Money } from "@/shared/kernel/Money";

export interface CustomerData {
  fullName: string;
  phone: string;
  cep: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
}

export type PaymentMethod = "pix" | "cartao_credito";

export interface OrderProps {
  orderId: string;
  customer: CustomerData;
  cart: Cart;
  deliveryDaysMin: number;
  deliveryDaysMax: number;
  paymentMethod: PaymentMethod;
  shippingFee: Money;
  createdAt: Date;
}

export class Order {
  private constructor(private readonly props: OrderProps) {}

  public static create(props: OrderProps): Order {
    if (!props.customer.fullName || !props.customer.phone) {
      throw new Error("Customer name and phone are required.");
    }
    if (props.cart.items.length === 0) {
      throw new Error("Cannot place an order with an empty cart.");
    }
    return new Order(props);
  }

  public get orderId(): string { return this.props.orderId; }
  public get customer(): CustomerData { return this.props.customer; }
  public get cart(): Cart { return this.props.cart; }
  public get paymentMethod(): PaymentMethod { return this.props.paymentMethod; }
  public get shippingFee(): Money { return this.props.shippingFee; }

  public get total(): Money {
    return this.props.cart.subtotal.add(this.props.shippingFee);
  }

  public get deliveryPromise(): string {
    return `${this.props.deliveryDaysMin} a ${this.props.deliveryDaysMax} dias úteis`;
  }

  public generateWhatsAppMessage(): string {
    const lines = [
      `*NOVO PEDIDO — AWAKE HOME DECOR* ✨`,
      `*Pedido:* #${this.props.orderId}`,
      `*Cliente:* ${this.props.customer.fullName}`,
      `*Telefone:* ${this.props.customer.phone}`,
      `*Entrega:* ${this.props.customer.street}, ${this.props.customer.number} - ${this.props.customer.neighborhood}, ${this.props.customer.city}/${this.props.customer.state} (CEP: ${this.props.customer.cep})`,
      `*Prazo acordado:* ${this.deliveryPromise} (Diferencial Awake)`,
      ``,
      `*Itens do Pedido:*`
    ];

    this.props.cart.items.forEach(i => {
      lines.push(`• *${i.productName}* (${i.finishName}) x${i.quantity} — ${i.subtotal.formatBRL()}`);
    });

    lines.push(``);
    lines.push(`*Subtotal:* ${this.props.cart.subtotal.formatBRL()}`);
    lines.push(`*Frete Express:* ${this.props.shippingFee.formatBRL()}`);
    lines.push(`*TOTAL:* ${this.total.formatBRL()}`);
    lines.push(`*Forma de Pagamento:* ${this.props.paymentMethod === "pix" ? "PIX (5% OFF aplicado)" : "Cartão de Crédito"}`);
    lines.push(``);
    lines.push(`_Aguardando confirmação de pagamento para entrada em fabricação expressa._`);

    return encodeURIComponent(lines.join("\n"));
  }
}
