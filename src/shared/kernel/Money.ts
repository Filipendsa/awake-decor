export class Money {
  private constructor(private readonly amountInCents: number) {
    if (!Number.isInteger(amountInCents) || amountInCents < 0) {
      throw new Error(`Money must be a non-negative integer amount in cents. Received: ${amountInCents}`);
    }
  }

  public static fromCents(cents: number): Money {
    return new Money(Math.round(cents));
  }

  public static fromReais(reais: number): Money {
    return new Money(Math.round(reais * 100));
  }

  public static zero(): Money {
    return new Money(0);
  }

  public get cents(): number {
    return this.amountInCents;
  }

  public get reais(): number {
    return this.amountInCents / 100;
  }

  public add(other: Money): Money {
    return new Money(this.amountInCents + other.amountInCents);
  }

  public multiply(factor: number): Money {
    if (factor < 0) throw new Error("Multiplier must be non-negative.");
    return new Money(Math.round(this.amountInCents * factor));
  }

  public formatBRL(): string {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(this.reais);
  }

  public equals(other: Money): boolean {
    return this.amountInCents === other.amountInCents;
  }
}
