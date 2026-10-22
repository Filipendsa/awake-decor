"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/shared/design-system/Header";
import { BottomNav } from "@/shared/design-system/BottomNav";
import { FurnitureQuote, RoomEnvironment } from "@/planned-furniture/domain/FurnitureQuote";
import styles from "./PlannedFurniture.module.css";
import { Ruler, Sparkles, CheckCircle2, MessageCircle, Clock, Award, ShieldCheck } from "lucide-react";

export default function PlannedFurniturePage() {
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [environment, setEnvironment] = useState<RoomEnvironment>("cozinha");
  const [approximateAreaM2, setApproximateAreaM2] = useState<number | undefined>(undefined);
  const [estimatedBudget, setEstimatedBudget] = useState("R$ 15.000 a R$ 30.000");
  const [description, setDescription] = useState("");
  const [preferredFinish, setPreferredFinish] = useState("Amadeirado Nobre + Fendi Acetinado");
  const [wants3DProject, setWants3DProject] = useState(true);

  const [submittedQuote, setSubmittedQuote] = useState<FurnitureQuote | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone) {
      alert("Por favor, preencha seu nome e WhatsApp.");
      return;
    }

    const quote = FurnitureQuote.create({
      id: "quote-" + Date.now(),
      customerName,
      phone,
      environment,
      approximateAreaM2,
      estimatedBudget,
      description,
      preferredFinish,
      wants3DProject,
    });

    setSubmittedQuote(quote);
  };

  return (
    <div className="mobile-app-shell">
      <Header theme="white" />

      <main className="page-bottom-pad">
        {/* Hero Section */}
        <div className={styles.hero}>
          <div className={styles.heroImgWrapper}>
            <Image
              src="/marketing/1.jpeg"
              alt="Móveis Planejados de Luxo Awake"
              fill
              priority
              className={styles.heroImg}
            />
            <div className={styles.heroGradient} />
          </div>

          <div className={styles.heroContent}>
            <span className={styles.kicker}>Engenharia & Marcenaria Prime</span>
            <h1 className={styles.title}>Móveis Planejados com Prazo e Rigor Estético</h1>
            <p className={styles.subtitle}>
              Projetos exclusivos desenvolvidos sob medida para transformar cada metro quadrado do seu espaço.
            </p>
          </div>
        </div>

        {/* Brand Pillars */}
        <div className={styles.pillars}>
          <div className={styles.pillarItem}>
            <Clock size={18} className={styles.pillarIcon} />
            <div>
              <span className={styles.pillarTitle}>Prazo de Entrega em Contrato</span>
              <p className={styles.pillarText}>Cronograma transparente com multa em caso de atraso.</p>
            </div>
          </div>

          <div className={styles.pillarItem}>
            <Award size={18} className={styles.pillarIcon} />
            <div>
              <span className={styles.pillarTitle}>Ferragens de 1ª Linha</span>
              <p className={styles.pillarText}>Amortecimento suave, corrediças invisíveis e 5 anos de garantia.</p>
            </div>
          </div>
        </div>

        {/* Quote Form */}
        <div className={styles.formSection}>
          <div className={styles.formHeader}>
            <h2 className={styles.formTitle}>Solicitar Projeto & Orçamento 3D</h2>
            <p className={styles.formDesc}>
              Preencha os dados do ambiente para receber uma consultoria preliminar e direcionamento de custos.
            </p>
          </div>

          {submittedQuote ? (
            <div className={styles.successQuote}>
              <CheckCircle2 size={40} className={styles.quoteCheckIcon} />
              <h3 className={styles.quoteSuccessTitle}>Orçamento Preparado!</h3>
              <p className={styles.quoteSuccessDesc}>
                Clique no botão abaixo para conversar com nosso projetista no WhatsApp com o briefing pré-preenchido.
              </p>
              <a
                href={`https://wa.me/5511999999999?text=${submittedQuote.generateWhatsAppQuoteMessage()}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.sendWaBtn}
              >
                <MessageCircle size={18} />
                <span>Conversar com Projetista no WhatsApp</span>
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.quoteForm}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Seu Nome *</label>
                <input
                  type="text"
                  required
                  placeholder="Nome e Sobrenome"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className={styles.input}
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>WhatsApp com DDD *</label>
                <input
                  type="tel"
                  required
                  placeholder="(11) 98765-4321"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={styles.input}
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Ambiente Principal</label>
                <select
                  value={environment}
                  onChange={(e) => setEnvironment(e.target.value as RoomEnvironment)}
                  className={styles.select}
                >
                  <option value="cozinha">Cozinha Planejada</option>
                  <option value="living">Living & Painel de TV</option>
                  <option value="dormitorio">Dormitório Master</option>
                  <option value="closet">Closet Sob Medida</option>
                  <option value="banheiro">Banheiro & Lavabo</option>
                  <option value="corporativo">Escritório Corporativo</option>
                </select>
              </div>

              <div className={styles.inputRow}>
                <div className={styles.inputGroup} style={{ flex: 1 }}>
                  <label className={styles.label}>Área (m² aprox.)</label>
                  <input
                    type="number"
                    placeholder="Ex: 25"
                    value={approximateAreaM2 || ""}
                    onChange={(e) => setApproximateAreaM2(Number(e.target.value) || undefined)}
                    className={styles.input}
                  />
                </div>
                <div className={styles.inputGroup} style={{ flex: 2 }}>
                  <label className={styles.label}>Faixa de Investimento</label>
                  <select
                    value={estimatedBudget}
                    onChange={(e) => setEstimatedBudget(e.target.value)}
                    className={styles.select}
                  >
                    <option value="Até R$ 15.000">Até R$ 15.000</option>
                    <option value="R$ 15.000 a R$ 30.000">R$ 15.000 a R$ 30.000</option>
                    <option value="R$ 30.000 a R$ 60.000">R$ 30.000 a R$ 60.000</option>
                    <option value="Acima de R$ 60.000">Acima de R$ 60.000</option>
                  </select>
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Acabamento / Estilo Desejado</label>
                <input
                  type="text"
                  value={preferredFinish}
                  onChange={(e) => setPreferredFinish(e.target.value)}
                  className={styles.input}
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Detalhes ou Necessidades Específicas</label>
                <textarea
                  rows={3}
                  placeholder="Ex: Gostaria de iluminação em LED embutida e nichos para vinhos..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={styles.textarea}
                />
              </div>

              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={wants3DProject}
                  onChange={(e) => setWants3DProject(e.target.checked)}
                />
                <span>Quero agendar medição técnica no local com render 3D</span>
              </label>

              <button type="submit" className={styles.submitBtn}>
                <Sparkles size={16} />
                <span>Gerar Proposta via WhatsApp</span>
              </button>
            </form>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
