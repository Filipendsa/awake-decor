export type RoomEnvironment = "cozinha" | "living" | "dormitorio" | "closet" | "banheiro" | "corporativo";

export interface FurnitureQuoteProps {
  id: string;
  customerName: string;
  phone: string;
  environment: RoomEnvironment;
  approximateAreaM2?: number;
  estimatedBudget: string;
  description: string;
  preferredFinish: string;
  wants3DProject: boolean;
}

export class FurnitureQuote {
  private constructor(private readonly props: FurnitureQuoteProps) {}

  public static create(props: FurnitureQuoteProps): FurnitureQuote {
    if (!props.customerName || !props.phone) {
      throw new Error("Nome e telefone são obrigatórios para orçamento de móveis planejados.");
    }
    return new FurnitureQuote(props);
  }

  public get propsData(): FurnitureQuoteProps {
    return { ...this.props };
  }

  public generateWhatsAppQuoteMessage(): string {
    const lines = [
      `*SOLICITAÇÃO DE ORÇAMENTO — MÓVEIS PLANEJADOS AWAKE* 📐`,
      `*Cliente:* ${this.props.customerName}`,
      `*WhatsApp:* ${this.props.phone}`,
      `*Ambiente:* ${this.props.environment.toUpperCase()}`,
      this.props.approximateAreaM2 ? `*Metragem estimada:* ${this.props.approximateAreaM2} m²` : "",
      `*Faixa de Investimento:* ${this.props.estimatedBudget}`,
      `*Acabamento de Interesse:* ${this.props.preferredFinish}`,
      `*Deseja Projeto 3D no Local:* ${this.props.wants3DProject ? "Sim" : "Não"}`,
      this.props.description ? `*Observações:* ${this.props.description}` : "",
      ``,
      `_Diferencial Awake: Entrega e montagem no prazo com garantia de acabamento impecável._`
    ].filter(Boolean);

    return encodeURIComponent(lines.join("\n"));
  }
}
