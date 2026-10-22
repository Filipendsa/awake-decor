import { describe, it, expect } from "vitest";
import { Money } from "./Money";
import { Slug } from "./Slug";

describe("Money Value Object", () => {
  it("converts reais to cents accurately", () => {
    const price = Money.fromReais(189.9);
    expect(price.cents).toBe(18990);
    expect(price.reais).toBe(189.9);
  });

  it("formats BRL currency correctly", () => {
    const price = Money.fromReais(250);
    expect(price.formatBRL()).toContain("250,00");
  });

  it("adds and multiplies immutably", () => {
    const m1 = Money.fromReais(100);
    const m2 = Money.fromReais(50);
    const sum = m1.add(m2);
    expect(sum.reais).toBe(150);
    expect(m1.reais).toBe(100);

    const doubled = m1.multiply(2);
    expect(doubled.reais).toBe(200);
  });
});

describe("Slug Value Object", () => {
  it("normalizes special characters and accents", () => {
    const slug = Slug.create("Cópia de #1 Salmo 23: O Senhor é Meu Pastor");
    expect(slug.toString()).toBe("copia-de-1-salmo-23-o-senhor-e-meu-pastor");
  });
});
