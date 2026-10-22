import { describe, it, expect } from "vitest";
import { PlacedItem, RoomScene } from "./RoomScene";

describe("RoomScene & PlacedItem Aggregate", () => {
  it("initializes a room scene and places a decor item", () => {
    let scene = RoomScene.create("photo_upload", "/products/salmo-23.png");
    const item = PlacedItem.create({
      id: "item-1",
      productId: "prod-1",
      productName: "Salmo 23",
      propSvgUrl: "/props/salmo-23.svg",
      xPercent: 50,
      yPercent: 35,
      scale: 1.0,
      rotationDeg: 0,
      opacity: 1.0,
    });

    scene = scene.addItem(item);
    expect(scene.items.length).toBe(1);
    expect(scene.selectedItemId).toBe("item-1");
    expect(scene.selectedItem?.xPercent).toBe(50);
  });

  it("applies transforms and perspective accurately without mutating original", () => {
    const item = PlacedItem.create({
      id: "item-1",
      productId: "prod-1",
      productName: "Salmo 23",
      propSvgUrl: "/props/salmo-23.svg",
      xPercent: 50,
      yPercent: 35,
      scale: 1.0,
      rotationDeg: 0,
      opacity: 1.0,
    });

    const moved = item.move(10, -5);
    expect(moved.xPercent).toBe(60);
    expect(moved.yPercent).toBe(30);
    expect(item.xPercent).toBe(50); // Original intact

    const scaled = item.adjustScale(1.5);
    expect(scaled.scale).toBe(1.5);

    const tilted = item.setPerspectiveTilt(15, -20);
    expect(tilted.tiltXDeg).toBe(15);
    expect(tilted.tiltYDeg).toBe(-20);
  });
});
