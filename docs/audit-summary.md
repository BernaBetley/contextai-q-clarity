# Audit Summary — ContextAIQ Marketing Site

## Top 10 Issues (Engineering, UX, Design, Copy, Business)
1. **Dual app footprints (Next + Vite)** create unclear source-of-truth and maintainability risk.
2. **Inconsistent CTA hierarchy** (multiple primary CTAs per page, mixed labels) weakens conversion focus.
3. **Metadata gaps per page** (limited OG/Twitter and JSON-LD coverage) reduce SEO and LLM extractability.
4. **No structured event tracking** beyond page views; no CTA/form instrumentation.
5. **Contact flow lacks a true form submission** and defined end-to-end handling.
6. **Copy is generally competent but not differentiated** (limited proof, specificity, and ICP targeting).
7. **Methodology is long and fragmented** across pages; not a crisp 5-phase narrative.
8. **Design system is implicit** (many repeated class strings, limited button/section patterns).
9. **Trust signals are minimal** (no sample output section, credibility cues, or transparency artifacts).
10. **Sitemap/LLM files are outdated** relative to current content structure and missing key pages.

## Top 10 Opportunities
1. **Establish a conversion narrative**: Problem → Solution → Proof → Method → Use Cases → CTA.
2. **Add a productized audit footprint**: Deliverables page + sample output + pricing tiers.
3. **Create a minimal, scalable design system** with button, card, section, and badge primitives.
4. **Upgrade SEO/LLM readiness** with consistent metadata, canonicals, JSON-LD, and structured sections.
5. **Add lightweight analytics** with standardized CTA, form, and page-view events.
6. **Improve contact friction** with a real form + scheduling integration.
7. **Consolidate methodology** into 5 phases and make it visually scannable.
8. **Clarify ICP outcomes** with concrete metrics and defensible language.
9. **Strengthen internal linking** across audit, deliverables, methodology, and resources.
10. **Document environment and content editing** for faster onboarding and safer changes.

## Key Assumptions
- Pricing for non-audit tiers will be expressed as “starting at” ranges unless exact numbers are confirmed.
- Contact form submission will use a configurable webhook/email service via env vars.
- Next.js `app/` is the production source-of-truth; legacy `src/` (Vite) is not used in deploy.

## Definition of Done (Measurable)
- [ ] All indexable pages have unique title + meta description + canonical + OG/Twitter.
- [ ] JSON-LD present for Organization, WebSite, Service, and Article/BlogPost where applicable.
- [ ] Home + core pages follow Problem → Solution → Proof → Method → CTA flow.
- [ ] Single dominant CTA per page; CTA labels standardized.
- [ ] Deliverables page created; sample output section added.
- [ ] Methodology presented as a 5-phase model on Methodology and How-it-Works pages.
- [ ] Contact page includes a form that submits to a configured endpoint.
- [ ] Analytics events tracked for CTA clicks, form submits, methodology views, pricing views.
- [ ] Sitemap/robots/llms files updated to include all key pages.
- [ ] README + `/docs` updated with setup, env vars, analytics, and content structure.

## Open Items (If Any)
- Confirm starting price ranges for Implementation and Monitoring tiers.
- Confirm preferred analytics provider if GA4 is not desired.
