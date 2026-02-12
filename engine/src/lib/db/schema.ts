import {
  pgTable,
  uuid,
  text,
  timestamp,
  integer,
  boolean,
  jsonb,
  pgEnum,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ── Enums ──────────────────────────────────────────────

export const auditStatusEnum = pgEnum("audit_status", [
  "payment_received",
  "intake_pending",
  "intake_complete",
  "generating_queries",
  "testing_llms",
  "scoring",
  "analyzing",
  "generating_report",
  "complete",
  "failed",
]);

export const queryCategoryEnum = pgEnum("query_category", [
  "brand",
  "category",
  "use_case",
  "competitive",
]);

export const llmEnum = pgEnum("llm", ["chatgpt", "claude", "gemini"]);

// ── Tables ─────────────────────────────────────────────

export const audits = pgTable("audits", {
  id: uuid("id").defaultRandom().primaryKey(),
  status: auditStatusEnum("status").notNull().default("payment_received"),
  failureReason: text("failure_reason"),

  // Client info
  clientName: text("client_name"),
  clientEmail: text("client_email"),
  companyName: text("company_name"),
  companyWebsite: text("company_website"),
  industry: text("industry"),
  companyDescription: text("company_description"),
  targetAudience: text("target_audience"),
  factSheet: text("fact_sheet"),
  priorityTopics: text("priority_topics"),
  additionalContext: text("additional_context"),

  // Competitors: [{name: string, website: string}]
  competitors: jsonb("competitors").$type<
    { name: string; website: string }[]
  >(),

  // Payment
  stripePaymentId: text("stripe_payment_id"),
  stripeCustomerEmail: text("stripe_customer_email"),

  // Results
  overallScore: integer("overall_score"),
  pdfUrl: text("pdf_url"),

  // KPIs
  kpis: jsonb("kpis").$type<{
    shareOfVoice: number;
    citationRate: number;
    accuracyScore: number;
    hallucinationCount: number;
    competitiveDisplacement: number;
  }>(),

  // Timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  intakeCompletedAt: timestamp("intake_completed_at"),
  completedAt: timestamp("completed_at"),
});

export const queries = pgTable("queries", {
  id: uuid("id").defaultRandom().primaryKey(),
  auditId: uuid("audit_id")
    .notNull()
    .references(() => audits.id, { onDelete: "cascade" }),
  queryText: text("query_text").notNull(),
  category: queryCategoryEnum("category").notNull(),
  order: integer("order").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const llmResponses = pgTable("llm_responses", {
  id: uuid("id").defaultRandom().primaryKey(),
  queryId: uuid("query_id")
    .notNull()
    .references(() => queries.id, { onDelete: "cascade" }),
  llm: llmEnum("llm").notNull(),
  responseText: text("response_text").notNull(),
  modelVersion: text("model_version"),
  latencyMs: integer("latency_ms"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const scores = pgTable("scores", {
  id: uuid("id").defaultRandom().primaryKey(),
  llmResponseId: uuid("llm_response_id")
    .notNull()
    .references(() => llmResponses.id, { onDelete: "cascade" }),

  // Scoring breakdown
  appearance: integer("appearance").notNull().default(0), // 0-40
  prominence: integer("prominence").notNull().default(0), // 0-30
  accuracy: integer("accuracy").notNull().default(0), // 0-30
  total: integer("total").notNull().default(0), // 0-100

  // Hallucinations: [{claim, severity: "critical"|"major"|"minor", evidence}]
  hallucinations: jsonb("hallucinations")
    .$type<
      { claim: string; severity: "critical" | "major" | "minor"; evidence: string }[]
    >()
    .default([]),

  // Citations: [{source, url, type: "direct"|"indirect"|"none"}]
  citations: jsonb("citations")
    .$type<{ source: string; url: string | null; type: "direct" | "indirect" | "none" }[]>()
    .default([]),

  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const competitorResults = pgTable("competitor_results", {
  id: uuid("id").defaultRandom().primaryKey(),
  llmResponseId: uuid("llm_response_id")
    .notNull()
    .references(() => llmResponses.id, { onDelete: "cascade" }),
  competitorName: text("competitor_name").notNull(),
  mentioned: boolean("mentioned").notNull().default(false),
  position: text("position").$type<
    "featured" | "first_mention" | "listed" | "passing" | "not_present"
  >(),
  contextSnippet: text("context_snippet"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const reports = pgTable("reports", {
  id: uuid("id").defaultRandom().primaryKey(),
  auditId: uuid("audit_id")
    .notNull()
    .references(() => audits.id, { onDelete: "cascade" }),
  executiveSummary: text("executive_summary"),
  rootCauseAnalysis: text("root_cause_analysis"),

  // Roadmap: [{action, impact: "high"|"medium"|"low", effort, priority: 1-N, category}]
  roadmap: jsonb("roadmap")
    .$type<
      {
        action: string;
        rationale: string;
        impact: "high" | "medium" | "low";
        effort: "low" | "medium" | "high";
        priority: number;
        category: "quick_win" | "structural" | "strategic";
      }[]
    >()
    .default([]),

  pdfUrl: text("pdf_url"),
  generatedAt: timestamp("generated_at").defaultNow().notNull(),
});

// ── Relations ──────────────────────────────────────────

export const auditsRelations = relations(audits, ({ many }) => ({
  queries: many(queries),
  reports: many(reports),
}));

export const queriesRelations = relations(queries, ({ one, many }) => ({
  audit: one(audits, { fields: [queries.auditId], references: [audits.id] }),
  llmResponses: many(llmResponses),
}));

export const llmResponsesRelations = relations(llmResponses, ({ one, many }) => ({
  query: one(queries, { fields: [llmResponses.queryId], references: [queries.id] }),
  score: one(scores),
  competitorResults: many(competitorResults),
}));

export const scoresRelations = relations(scores, ({ one }) => ({
  llmResponse: one(llmResponses, {
    fields: [scores.llmResponseId],
    references: [llmResponses.id],
  }),
}));

export const competitorResultsRelations = relations(competitorResults, ({ one }) => ({
  llmResponse: one(llmResponses, {
    fields: [competitorResults.llmResponseId],
    references: [llmResponses.id],
  }),
}));

export const reportsRelations = relations(reports, ({ one }) => ({
  audit: one(audits, { fields: [reports.auditId], references: [audits.id] }),
}));

// ── Types ──────────────────────────────────────────────

export type Audit = typeof audits.$inferSelect;
export type NewAudit = typeof audits.$inferInsert;
export type Query = typeof queries.$inferSelect;
export type LLMResponse = typeof llmResponses.$inferSelect;
export type Score = typeof scores.$inferSelect;
export type CompetitorResult = typeof competitorResults.$inferSelect;
export type Report = typeof reports.$inferSelect;
