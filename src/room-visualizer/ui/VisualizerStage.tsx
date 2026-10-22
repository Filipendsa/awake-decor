"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { PlacedItem, RoomScene } from "@/room-visualizer/domain/RoomScene";
import styles from "./VisualizerStage.module.css";
import {
  Camera,
  Upload,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Trash2,
  Share2,
  Layers,
  ShoppingBag,
  Sliders,
} from "lucide-react";
import { useCartStore } from "@/cart/ui/cartStore";
import { Money } from "@/shared/kernel/Money";
import { useToast } from "@/shared/design-system/Toast";

interface ProductCatalogItem {
  id: string;
  name: string;
  slug: string;
  propSvg: string;
  mockupImage: string;
  basePriceReais: number;
}

interface VisualizerStageProps {
  initialProducts: ProductCatalogItem[];
  selectedProductSlug?: string;
}

let idCounter = 0;
function createUniqueId(prefix: string): string {
  idCounter += 1;
  return `${prefix}-${idCounter}`;
}

export const VisualizerStage: React.FC<VisualizerStageProps> = ({
  initialProducts,
  selectedProductSlug,
}) => {
  const [scene, setScene] = useState<RoomScene>(() => {
    const baseScene = RoomScene.create("sample", "/marketing/2.jpeg");
    const targetProd =
      initialProducts.find((p) => p.slug === selectedProductSlug) ||
      initialProducts[0];

    if (targetProd) {
      const initialItem = PlacedItem.create({
        id: createUniqueId("item-init"),
        productId: targetProd.id,
        productName: targetProd.name,
        propSvgUrl: targetProd.propSvg,
        xPercent: 50,
        yPercent: 40,
        scale: 1.0,
        rotationDeg: 0,
        opacity: 0.95,
      });
      return baseScene.addItem(initialItem);
    }

    return baseScene;
  });

  const [activeTab, setActiveTab] = useState<"controls" | "catalog" | "perspective">("controls");
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [showShareNotification, setShowShareNotification] = useState<boolean>(false);

  // Perspective 3D state for selected item
  const [tiltX, setTiltX] = useState<number>(0);
  const [tiltY, setTiltY] = useState<number>(0);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const addItemToCart = useCartStore((s) => s.addItem);
  const { showToast } = useToast();

  // Stop camera tracks on component unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    };
  }, []);

  // Start / Stop camera stream
  const toggleLiveCamera = async () => {
    if (isCameraActive) {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      setIsCameraActive(false);
      return;
    }

    try {
      let stream: MediaStream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: "environment" } },
          audio: false,
        });
      } catch {
        // Fallback for devices without rear environment camera (eg. desktop/laptop webcam)
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
      }

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        try {
          await videoRef.current.play();
        } catch {
          // Handled inline
        }
      }
      setIsCameraActive(true);
      setScene((prev) => prev.changeBackground("", "camera_live"));
      showToast("Câmera ao vivo conectada", "sparkle");
    } catch (err) {
      showToast("Não foi possível acessar a câmera. Verifique as permissões.", "info");
      console.error(err);
    }
  };

  // Upload user photo
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          if (isCameraActive) toggleLiveCamera();
          setScene((prev) =>
            prev.changeBackground(event.target!.result as string, "photo_upload")
          );
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Item Transforms
  const handleScale = (factor: number) => {
    const selected = scene.selectedItem;
    if (!selected) return;
    const updated = selected.adjustScale(factor);
    setScene((prev) => prev.updateItem(updated));
  };

  const handleRotate = (deg: number) => {
    const selected = scene.selectedItem;
    if (!selected) return;
    const updated = selected.rotate(deg);
    setScene((prev) => prev.updateItem(updated));
  };

  const handleTilt = (newTiltX: number, newTiltY: number) => {
    setTiltX(newTiltX);
    setTiltY(newTiltY);
    const selected = scene.selectedItem;
    if (!selected) return;
    const updated = selected.setPerspectiveTilt(newTiltX, newTiltY);
    setScene((prev) => prev.updateItem(updated));
  };

  const handleDeleteSelected = () => {
    if (scene.selectedItemId) {
      setScene((prev) => prev.removeItem(prev.selectedItemId!));
    }
  };

  // Add another product from catalog tray
  const handleAddProduct = (prod: ProductCatalogItem) => {
    const newItem = PlacedItem.create({
      id: createUniqueId(`item-${prod.id}`),
      productId: prod.id,
      productName: prod.name,
      propSvgUrl: prod.propSvg,
      xPercent: 50,
      yPercent: 45,
      scale: 1.0,
      rotationDeg: 0,
      opacity: 0.95,
      tiltXDeg: tiltX,
      tiltYDeg: tiltY,
    });
    setScene((prev) => prev.addItem(newItem));
    setActiveTab("controls");
  };

  // Dragging logic for mobile touch & pointer
  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent, item: PlacedItem) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;

    const xPercent = Math.max(5, Math.min(95, ((clientX - rect.left) / rect.width) * 100));
    const yPercent = Math.max(5, Math.min(95, ((clientY - rect.top) / rect.height) * 100));

    const updated = item.setPosition(xPercent, yPercent);
    setScene((prev) => prev.updateItem(updated));
  };

  // Share / Snapshot
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Meu Projeto Awake Home Decor",
          text: "Olha como ficou essa composição no meu espaço!",
          url: window.location.href,
        });
      } catch {
        // User cancelled share
      }
    } else {
      setShowShareNotification(true);
      setTimeout(() => setShowShareNotification(false), 2500);
    }
  };

  // Add currently selected piece directly to cart
  const handleAddSelectedToCart = () => {
    const selected = scene.selectedItem;
    if (!selected) return;
    const prod = initialProducts.find((p) => p.id === selected.productId);
    if (!prod) return;

    addItemToCart({
      id: createUniqueId("cart"),
      productId: prod.id,
      productName: prod.name,
      productSlug: prod.slug,
      mockupImage: prod.mockupImage,
      finishId: "madeira_natural",
      finishName: "Madeira Natural",
      unitPrice: Money.fromReais(prod.basePriceReais),
      quantity: 1,
    });

    showToast(`"${prod.name}" adicionado à sua Sacola!`, "sparkle");
  };

  const selectedItem = scene.selectedItem;

  return (
    <div className={styles.container}>
      {/* Visualizer Canvas Stage */}
      <div className={styles.stage} ref={stageRef}>
        {/* Background Source: Live Camera or Photo */}
        <video
          ref={videoRef}
          playsInline
          muted
          autoPlay
          className={`${styles.cameraFeed} ${isCameraActive ? styles.cameraFeedActive : styles.cameraFeedHidden}`}
        />
        {!isCameraActive && (
          <Image
            src={scene.backgroundMediaUrl || "/marketing/2.jpeg"}
            alt="Ambiente de projeção"
            fill
            priority
            className={styles.backgroundImage}
          />
        )}

        {/* Ambient Grid overlay hint */}
        <div className={styles.gridHint} />

        {/* Render Placed Decor Items with Gestures & Transforms */}
        {scene.items.map((item) => {
          const isSelected = item.id === scene.selectedItemId;
          return (
            <div
              key={item.id}
              className={`${styles.placedProp} ${isSelected ? styles.selectedProp : ""}`}
              style={{
                left: `${item.xPercent}%`,
                top: `${item.yPercent}%`,
                transform: `translate(-50%, -50%) perspective(700px) rotateX(${item.tiltXDeg}deg) rotateY(${item.tiltYDeg}deg) rotateZ(${item.rotationDeg}deg) scale(${item.scale})`,
                opacity: item.opacity,
              }}
              onClick={() => setScene((prev) => prev.selectItem(item.id))}
              onTouchMove={(e) => handleTouchMove(e, item)}
              onMouseMove={(e) => {
                if (e.buttons === 1) handleTouchMove(e, item);
              }}
            >
              {/* SVG Prop */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.propSvgUrl}
                alt={item.productName}
                className={styles.propImage}
                draggable={false}
              />

              {isSelected && (
                <div className={styles.selectionRing}>
                  <div className={styles.handleDot} />
                  <span className={styles.itemTag}>{item.productName}</span>
                </div>
              )}
            </div>
          );
        })}

        {/* Quick Top Bar Controls on Stage */}
        <div className={styles.stageTopBar}>
          <div className={styles.sourcePills}>
            <button
              onClick={toggleLiveCamera}
              className={`${styles.sourceBtn} ${isCameraActive ? styles.activeSource : ""}`}
            >
              <Camera size={14} />
              <span>{isCameraActive ? "Câmera Ativa" : "Câmera ao Vivo"}</span>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className={styles.sourceBtn}
            >
              <Upload size={14} />
              <span>Tirar / Enviar Foto</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handlePhotoUpload}
            />
          </div>

          <button onClick={handleShare} className={styles.shareBtn} aria-label="Compartilhar">
            <Share2 size={16} />
          </button>
        </div>

        {/* Stage Hint */}
        <div className={styles.stageBottomHint}>
          <span>Arraste a peça para mover na parede</span>
        </div>
      </div>

      {showShareNotification && (
        <div className={styles.toast}>Link do projeto copiado para compartilhar!</div>
      )}

      {/* Control Drawer / Bottom Tabs */}
      <div className={styles.drawer}>
        <div className={styles.tabHeaders}>
          <button
            onClick={() => setActiveTab("controls")}
            className={`${styles.tabBtn} ${activeTab === "controls" ? styles.activeTab : ""}`}
          >
            <Sliders size={14} />
            <span>Ajustes & Tamanho</span>
          </button>
          <button
            onClick={() => setActiveTab("perspective")}
            className={`${styles.tabBtn} ${activeTab === "perspective" ? styles.activeTab : ""}`}
          >
            <Maximize2 size={14} />
            <span>Perspectiva 3D</span>
          </button>
          <button
            onClick={() => setActiveTab("catalog")}
            className={`${styles.tabBtn} ${activeTab === "catalog" ? styles.activeTab : ""}`}
          >
            <Layers size={14} />
            <span>Trocar / Adicionar</span>
          </button>
        </div>

        <div className={styles.tabContent}>
          {activeTab === "controls" && (
            <div className={styles.controlsRow}>
              {selectedItem ? (
                <>
                  <div className={styles.actionGroup}>
                    <span className={styles.groupLabel}>Escala (Tamanho)</span>
                    <div className={styles.btnPair}>
                      <button onClick={() => handleScale(0.9)} className={styles.toolBtn}>
                        <ZoomOut size={16} />
                        <span>Menor</span>
                      </button>
                      <button onClick={() => handleScale(1.1)} className={styles.toolBtn}>
                        <ZoomIn size={16} />
                        <span>Maior</span>
                      </button>
                    </div>
                  </div>

                  <div className={styles.actionGroup}>
                    <span className={styles.groupLabel}>Giro</span>
                    <div className={styles.btnPair}>
                      <button onClick={() => handleRotate(-15)} className={styles.toolBtn}>
                        <RotateCw size={16} style={{ transform: "scaleX(-1)" }} />
                        <span>-15°</span>
                      </button>
                      <button onClick={() => handleRotate(15)} className={styles.toolBtn}>
                        <RotateCw size={16} />
                        <span>+15°</span>
                      </button>
                    </div>
                  </div>

                  <div className={styles.actionGroup}>
                    <span className={styles.groupLabel}>Remover</span>
                    <button onClick={handleDeleteSelected} className={styles.deleteBtn}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </>
              ) : (
                <div className={styles.emptyPrompt}>Toque em uma peça para ajustar.</div>
              )}
            </div>
          )}

          {activeTab === "perspective" && (
            <div className={styles.perspectiveControls}>
              <div className={styles.sliderControl}>
                <div className={styles.sliderHeader}>
                  <span>Inclinação Vertical (Parede Alta/Baixa)</span>
                  <span>{tiltX}°</span>
                </div>
                <input
                  type="range"
                  min="-45"
                  max="45"
                  value={tiltX}
                  onChange={(e) => handleTilt(Number(e.target.value), tiltY)}
                  className={styles.rangeInput}
                />
              </div>

              <div className={styles.sliderControl}>
                <div className={styles.sliderHeader}>
                  <span>Ângulo da Parede (Lateralidade Esquerda/Direita)</span>
                  <span>{tiltY}°</span>
                </div>
                <input
                  type="range"
                  min="-45"
                  max="45"
                  value={tiltY}
                  onChange={(e) => handleTilt(tiltX, Number(e.target.value))}
                  className={styles.rangeInput}
                />
              </div>

              <button
                onClick={() => handleTilt(0, 0)}
                className={styles.resetTiltBtn}
              >
                Resetar para Frente Reta
              </button>
            </div>
          )}

          {activeTab === "catalog" && (
            <div className={styles.catalogTray}>
              {initialProducts.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleAddProduct(p)}
                  className={styles.catalogItemBtn}
                >
                  <div className={styles.thumbWrapper}>
                    <Image src={p.mockupImage} alt={p.name} fill sizes="80px" className={styles.thumb} />
                  </div>
                  <span className={styles.trayItemName}>{p.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Bar: Quick Add to Cart of current piece */}
        {selectedItem && (
          <div className={styles.drawerFooter}>
            <div className={styles.itemSummary}>
              <span className={styles.selectedName}>{selectedItem.productName}</span>
              <span className={styles.prazoTag}>Entrega em 3 a 5 dias</span>
            </div>
            <button onClick={handleAddSelectedToCart} className={styles.buyBtn}>
              <ShoppingBag size={16} />
              <span>Adicionar à Sacola</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
