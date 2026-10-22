export class Slug {
  private constructor(private readonly value: string) {}

  public static create(raw: string): Slug {
    const sanitized = raw
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    if (!sanitized) {
      throw new Error(`Invalid slug string from input: ${raw}`);
    }
    return new Slug(sanitized);
  }

  public toString(): string {
    return this.value;
  }

  public equals(other: Slug): boolean {
    return this.value === other.value;
  }
}
