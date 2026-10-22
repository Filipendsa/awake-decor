"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/shared/design-system/Header";
import { BottomNav } from "@/shared/design-system/BottomNav";
import { Footer } from "@/shared/design-system/Footer";
import { useCartStore } from "@/cart/ui/cartStore";
import { Order, CustomerData, PaymentMethod } from "@/checkout/domain/Order";
import { Money } from "@/shared/kernel/Money";
import styles from "./Checkout.module.css";
import { Clock, CheckCircle2, MessageCircle, ArrowLeft, CreditCard, QrCode } from "lucide-react";
import confetti from "canvas-confetti";

export default function CheckoutPage() {
  const { rawItems, subtotalReais, clearCart, getDomainCart } = useCartStore();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [cep, setCep] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [city, setCity] = useState("São Paulo");
  const [state, setState] = useState("SP");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("pix");

  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);

  const subtotalMoney = Money.fromReais(subtotalReais);
  const shippingMoney = Money.zero(); // Free express shipping promo

  const handleFinishOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !phone || !street || !number) {
      alert("Por favor, preencha todos os campos obrigatórios para o envio.");
      return;
    }

    const customer: CustomerData = {
      fullName,
      phone,
      cep: cep || "01310-100",
      street,
      number,
      neighborhood: neighborhood || "Centro",
      city: city || "São Paulo",
      state: state || "SP",
    };

    const domainCart = getDomainCart();
    const orderId = "AWK-" + Math.floor(1000 + Math.random() * 9000);

    const order = Order.create({
      orderId,
      customer,
      cart: domainCart,
      deliveryDaysMin: 3,
      deliveryDaysMax: 5,
      paymentMethod,
      shippingFee: shippingMoney,
      createdAt: new Date(),
    });

    setCreatedOrder(order);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#223D92", "#EC008C", "#D4AF37", "#FFFFFF"],
    });

    clearCart();
  };

  if (createdOrder) {
    const waUrl = `https://wa.me/5511999999999?text=${createdOrder.generateWhatsAppMessage()}`;

    return (
      <div className="mobile-app-shell">
        <Header theme="white" />
        <main className="page-bottom-pad">
          <div className={styles.successWrapper}>
            <div className={styles.successIconCircle}>
              <CheckCircle2 size={48} className={styles.successIcon} />
            </div>

            <span className={styles.orderIdBadge}>Pedido #{createdOrder.orderId}</span>
            <h1 className={styles.successTitle}>Pedido Registrado com Sucesso!</h1>
            <p className={styles.successSubtitle}>
              Seu pedido entrou na fila de fabricação expressa. Prazo garantido de{" "}
              <strong>{createdOrder.deliveryPromise}</strong>.
            </p>

            <div className={styles.waCard}>
              <div className={styles.waCardHeader}>
                <MessageCircle size={20} className={styles.waIcon} />
                <span>Finalização via WhatsApp</span>
              </div>
              <p className={styles.waCardText}>
                Clique no botão abaixo para enviar o resumo do seu pedido para o atendimento oficial Awake e
                receber as orientações de pagamento e rastreio.
              </p>

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.waDirectBtn}
              >
                <MessageCircle size={18} />
                <span>Enviar Pedido para WhatsApp</span>
              </a>
            </div>

            <Link href="/" className={styles.returnHomeBtn}>
              Voltar à Página Inicial
            </Link>
          </div>
        </main>
        <BottomNav />
      </div>
    );
  }

  if (rawItems.length === 0) {
    return (
      <div className="mobile-app-shell">
        <Header theme="white" />
        <main className="page-bottom-pad">
          <div className={styles.emptyCard}>
            <h2>Nenhum item na sacola para checkout</h2>
            <Link href="/catalog" className={styles.exploreLink}>
              Ver Decorações
            </Link>
          </div>
        </main>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="mobile-app-shell">
      <Header theme="white" />

      <main className="page-bottom-pad">
        <div className={styles.topBack}>
          <Link href="/cart" className={styles.backLink}>
            <ArrowLeft size={16} />
            <span>Voltar para a Sacola</span>
          </Link>
        </div>

        <div className={styles.header}>
          <span className={styles.kicker}>Quase lá</span>
          <h1 className={styles.title}>Dados de Envio & Pagamento</h1>
        </div>

        <form onSubmit={handleFinishOrder} className={styles.form}>
          {/* Customer info */}
          <div className={styles.sectionCard}>
            <h2 className={styles.sectionHeading}>1. Informações de Contato</h2>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Nome Completo *</label>
              <input
                type="text"
                required
                placeholder="Ex: Ana Maria Silva"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={styles.input}
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>WhatsApp / Celular com DDD *</label>
              <input
                type="tel"
                required
                placeholder="(11) 98765-4321"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={styles.input}
              />
            </div>
          </div>

          {/* Delivery address */}
          <div className={styles.sectionCard}>
            <h2 className={styles.sectionHeading}>2. Endereço de Entrega</h2>
            <div className={styles.inputRow}>
              <div className={styles.inputGroup} style={{ flex: 1 }}>
                <label className={styles.label}>CEP *</label>
                <input
                  type="text"
                  required
                  placeholder="00000-000"
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                  className={styles.input}
                />
              </div>
              <div className={styles.inputGroup} style={{ flex: 2 }}>
                <label className={styles.label}>Cidade</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className={styles.input}
                />
              </div>
              <div className={styles.inputGroup} style={{ flex: 1 }}>
                <label className={styles.label}>UF</label>
                <input
                  type="text"
                  maxLength={2}
                  value={state}
                  onChange={(e) => setState(e.target.value.toUpperCase())}
                  className={styles.input}
                />
              </div>
            </div>

            <div className={styles.inputRow}>
              <div className={styles.inputGroup} style={{ flex: 3 }}>
                <label className={styles.label}>Rua / Avenida *</label>
                <input
                  type="text"
                  required
                  placeholder="Rua das Flores"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className={styles.input}
                />
              </div>
              <div className={styles.inputGroup} style={{ flex: 1 }}>
                <label className={styles.label}>Número *</label>
                <input
                  type="text"
                  required
                  placeholder="123"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  className={styles.input}
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Bairro</label>
              <input
                type="text"
                placeholder="Centro / Jardins"
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
                className={styles.input}
              />
            </div>

            <div className={styles.prazoNotice}>
              <Clock size={16} />
              <span>Prazo de Entrega: 3 a 5 dias úteis no seu endereço.</span>
            </div>
          </div>

          {/* Payment Method */}
          <div className={styles.sectionCard}>
            <h2 className={styles.sectionHeading}>3. Método de Pagamento</h2>
            <div className={styles.paymentMethods}>
              <button
                type="button"
                onClick={() => setPaymentMethod("pix")}
                className={`${styles.paymentBtn} ${paymentMethod === "pix" ? styles.selectedPayment : ""}`}
              >
                <QrCode size={20} className={styles.payIcon} />
                <div className={styles.payInfo}>
                  <span className={styles.payTitle}>PIX Instantâneo</span>
                  <span className={styles.paySub}>Aprovação imediata + 5% OFF</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("cartao_credito")}
                className={`${styles.paymentBtn} ${paymentMethod === "cartao_credito" ? styles.selectedPayment : ""}`}
              >
                <CreditCard size={20} className={styles.payIcon} />
                <div className={styles.payInfo}>
                  <span className={styles.payTitle}>Cartão de Crédito</span>
                  <span className={styles.paySub}>Até 6x sem juros</span>
                </div>
              </button>
            </div>
          </div>

          {/* Total Bar */}
          <div className={styles.totalBar}>
            <div className={styles.totalTextCol}>
              <span className={styles.totalTextLabel}>Total a pagar</span>
              <span className={styles.totalTextValue}>
                {paymentMethod === "pix"
                  ? subtotalMoney.multiply(0.95).formatBRL()
                  : subtotalMoney.formatBRL()}
              </span>
            </div>

            <button type="submit" className={styles.submitOrderBtn}>
              <span>Confirmar & Gerar WhatsApp</span>
            </button>
          </div>
        </form>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
