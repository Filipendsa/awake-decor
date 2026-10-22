export interface Point2D {
  x: number; // Normalized 0-100% or absolute canvas pixels
  y: number;
}

export interface QuadCorners {
  topLeft: Point2D;
  topRight: Point2D;
  bottomRight: Point2D;
  bottomLeft: Point2D;
}

export interface PlacedItemProps {
  id: string;
  productId: string;
  productName: string;
  propSvgUrl: string;
  xPercent: number; // 0-100% horizontal center
  yPercent: number; // 0-100% vertical center
  scale: number; // 0.2 to 3.0
  rotationDeg: number; // -180 to +180
  opacity: number; // 0.1 to 1.0
  wallColorHex?: string;
  tiltXDeg?: number; // 3D wall perspective pitch
  tiltYDeg?: number; // 3D wall perspective yaw
}

export class PlacedItem {
  private constructor(private readonly props: PlacedItemProps) {}

  public static create(props: PlacedItemProps): PlacedItem {
    return new PlacedItem({
      ...props,
      scale: Math.max(0.1, Math.min(props.scale, 4.0)),
      opacity: Math.max(0.1, Math.min(props.opacity, 1.0)),
      rotationDeg: (props.rotationDeg % 360),
      tiltXDeg: props.tiltXDeg ? Math.max(-60, Math.min(props.tiltXDeg, 60)) : 0,
      tiltYDeg: props.tiltYDeg ? Math.max(-60, Math.min(props.tiltYDeg, 60)) : 0,
    });
  }

  public get id(): string { return this.props.id; }
  public get productId(): string { return this.props.productId; }
  public get productName(): string { return this.props.productName; }
  public get propSvgUrl(): string { return this.props.propSvgUrl; }
  public get xPercent(): number { return this.props.xPercent; }
  public get yPercent(): number { return this.props.yPercent; }
  public get scale(): number { return this.props.scale; }
  public get rotationDeg(): number { return this.props.rotationDeg; }
  public get opacity(): number { return this.props.opacity; }
  public get tiltXDeg(): number { return this.props.tiltXDeg || 0; }
  public get tiltYDeg(): number { return this.props.tiltYDeg || 0; }

  public move(deltaXPercent: number, deltaYPercent: number): PlacedItem {
    return PlacedItem.create({
      ...this.props,
      xPercent: Math.max(0, Math.min(100, this.props.xPercent + deltaXPercent)),
      yPercent: Math.max(0, Math.min(100, this.props.yPercent + deltaYPercent)),
    });
  }

  public setPosition(xPercent: number, yPercent: number): PlacedItem {
    return PlacedItem.create({
      ...this.props,
      xPercent: Math.max(0, Math.min(100, xPercent)),
      yPercent: Math.max(0, Math.min(100, yPercent)),
    });
  }

  public adjustScale(factor: number): PlacedItem {
    return PlacedItem.create({
      ...this.props,
      scale: this.props.scale * factor,
    });
  }

  public rotate(degreesDelta: number): PlacedItem {
    return PlacedItem.create({
      ...this.props,
      rotationDeg: this.props.rotationDeg + degreesDelta,
    });
  }

  public setPerspectiveTilt(tiltX: number, tiltY: number): PlacedItem {
    return PlacedItem.create({
      ...this.props,
      tiltXDeg: tiltX,
      tiltYDeg: tiltY,
    });
  }

  public getTransformStyle(): React.CSSProperties {
    return {
      transform: `translate(-50%, -50%) perspective(800px) rotateX(${this.props.tiltXDeg || 0}deg) rotateY(${this.props.tiltYDeg || 0}deg) rotateZ(${this.props.rotationDeg}deg) scale(${this.props.scale})`,
      opacity: this.props.opacity,
    };
  }
}

export type SceneSourceType = "sample" | "photo_upload" | "camera_live";

export interface RoomSceneProps {
  id: string;
  sourceType: SceneSourceType;
  backgroundMediaUrl: string;
  items: PlacedItem[];
  selectedItemId: string | null;
}

export class RoomScene {
  private constructor(private readonly props: RoomSceneProps) {}

  public static create(sourceType: SceneSourceType, backgroundUrl: string): RoomScene {
    return new RoomScene({
      id: "scene-" + Date.now(),
      sourceType,
      backgroundMediaUrl: backgroundUrl,
      items: [],
      selectedItemId: null,
    });
  }

  public get id(): string { return this.props.id; }
  public get sourceType(): SceneSourceType { return this.props.sourceType; }
  public get backgroundMediaUrl(): string { return this.props.backgroundMediaUrl; }
  public get items(): PlacedItem[] { return [...this.props.items]; }
  public get selectedItemId(): string | null { return this.props.selectedItemId; }

  public get selectedItem(): PlacedItem | null {
    if (!this.props.selectedItemId) return null;
    return this.props.items.find(i => i.id === this.props.selectedItemId) || null;
  }

  public addItem(item: PlacedItem): RoomScene {
    return new RoomScene({
      ...this.props,
      items: [...this.props.items, item],
      selectedItemId: item.id,
    });
  }

  public updateItem(updated: PlacedItem): RoomScene {
    return new RoomScene({
      ...this.props,
      items: this.props.items.map(i => i.id === updated.id ? updated : i),
    });
  }

  public removeItem(itemId: string): RoomScene {
    return new RoomScene({
      ...this.props,
      items: this.props.items.filter(i => i.id !== itemId),
      selectedItemId: this.props.selectedItemId === itemId ? null : this.props.selectedItemId,
    });
  }

  public selectItem(itemId: string | null): RoomScene {
    return new RoomScene({
      ...this.props,
      selectedItemId: itemId,
    });
  }

  public changeBackground(url: string, sourceType: SceneSourceType): RoomScene {
    return new RoomScene({
      ...this.props,
      backgroundMediaUrl: url,
      sourceType,
    });
  }
}
