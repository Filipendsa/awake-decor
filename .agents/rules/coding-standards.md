# Padrão de Engenharia & Arquitetura — Awake Home Decor

## 1. Princípios Fundamentais
- **Screaming Architecture**: As pastas e módulos devem "gritar" as capacidades do negócio (`catalog`, `room-visualizer`, `cart`, `checkout`, `planned-furniture`), e não convenções de framework.
- **Clean Code & Domínios Ricos**:
  - Entidades com encapsulamento e validação de invariantes.
  - Value Objects (VOs) imutáveis (`Money`, `Dimensions`, `Transform2D`, `PerspectiveQuad`, `Slug`).
  - Sem modelo anêmico: regras de cálculo, transformações de cena e estimativas de entrega residem nos domínios.
- **Isolamento de Domínio**:
  - `domain/` puro em TypeScript. Zero dependência de React ou Next.js.
  - Testável isoladamente via testes de unidade.
- **Fluxo de Dependência Unidirecional (Clean / Hexagonal)**:
  - `ui` -> `application` -> `domain` <- `infrastructure`
  - Interfaces/Portas no domínio e implementadas em `infrastructure`.

## 2. Design System & Identidade Visual
- **Diretriz**: Minimalista de luxo, moderno, jovial e sofisticado.
- **Paleta Oficial**:
  - Azul Awake: `#223D92`
  - Rosa Awake: `#EC008C`
  - Branco Puro: `#FFFFFF`
  - Apoios: Off-white/warm sand (`#F8F7F4`), carvão suave (`#171923`), tons amadeirados.
