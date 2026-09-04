"use client";

import { useState } from "react";

import { trackEvent } from "../lib/analytics";

type FormStatus = "idle" | "submitting" | "success" | "error";

const processOptions = [
  { value: "diagnostico", label: "Ainda não sei. Quero Prova Diagnóstico." },
  { value: "conversao", label: "Comercial / conversão" },
  { value: "backoffice", label: "Backoffice / operações" },
  { value: "suporte", label: "Suporte a clientes" },
  { value: "visibilidade", label: "Visibilidade em respostas de IA (€500)" },
];

export function ContactForm({ defaultProcess = "diagnostico" }: { defaultProcess?: string }) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const validDefault = processOptions.some((item) => item.value === defaultProcess)
    ? defaultProcess
    : "diagnostico";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;

    setStatus("submitting");
    setErrorMessage(null);

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? "Não foi possível enviar. Tente de novo ou escreva para hello@contextaiq.com.");
      }

      trackEvent("form_submit", { form: "contact", product: String(payload.process ?? "") });
      setStatus("success");
      event.currentTarget.reset();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Não foi possível enviar o pedido.";
      setErrorMessage(message);
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" aria-live="polite">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm font-medium">
          <span>Nome</span>
          <input name="name" required className="input-field" placeholder="Nome e apelido" autoComplete="name" />
        </label>
        <label className="space-y-2 text-sm font-medium">
          <span>Email de trabalho</span>
          <input
            name="email"
            type="email"
            required
            className="input-field"
            placeholder="nome@empresa.pt"
            autoComplete="email"
          />
        </label>
      </div>

      <label className="space-y-2 text-sm font-medium">
        <span>Empresa</span>
        <input name="company" required className="input-field" placeholder="Nome da empresa" autoComplete="organization" />
      </label>

      <label className="space-y-2 text-sm font-medium">
        <span>Processo a melhorar</span>
        <select name="process" required className="input-field" defaultValue={validDefault}>
          {processOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label className="space-y-2 text-sm font-medium">
        <span>Volume mensal</span>
        <input
          name="volume"
          required
          className="input-field"
          placeholder="Ex.: 80 pedidos, 400 tickets, 200 facturas"
        />
      </label>

      <label className="space-y-2 text-sm font-medium">
        <span>Contexto (opcional)</span>
        <textarea
          name="message"
          className="textarea-field"
          placeholder="Onde dói o processo hoje. Ferramentas em uso. O que já tentaram com ChatGPT."
        />
      </label>

      <input type="text" name="role" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" className="btn btn-primary btn-md" disabled={status === "submitting"}>
          {status === "submitting" ? "A enviar..." : "Pedir Prova Diagnóstico"}
        </button>
        <span className="text-small">Resposta em um dia útil. Diagnóstico é pago.</span>
      </div>

      {status === "success" ? (
        <p className="text-sm text-foreground">
          Pedido recebido. Respondemos em um dia útil com o âmbito e o honorário do Diagnóstico.
        </p>
      ) : null}

      {status === "error" ? <p className="text-sm text-destructive">{errorMessage}</p> : null}
    </form>
  );
}
