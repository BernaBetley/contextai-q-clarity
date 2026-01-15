# Analytics Setup (GA4)

ContextAI Q uses a lightweight GA4 integration that is fully optional. If no GA4 ID is provided, no analytics scripts load.

## Configuration
Set the following environment variable:

- `NEXT_PUBLIC_GA4_MEASUREMENT_ID` — GA4 measurement ID (e.g. `G-XXXXXXXXXX`).

## Tracked Events
Events are sent via `gtag("event", ...)` when GA4 is enabled.

### Page Events
- `page_view` — Fired on every route change with `page_path`.
- `methodology_view` — Fired on `/method` and `/how-it-works`.
- `pricing_view` — Fired on `/services`.
- `deliverables_view` — Fired on `/deliverables`.

### Interaction Events
- `cta_click` — Fired on primary CTAs with `cta` and `location`.
- `form_submit` — Fired on successful contact form submission with `form=contact`.

## Where Events Are Defined
- Page events: `app/components/Analytics.tsx`
- CTA events: `app/components/TrackedLink.tsx`
- Form submit: `app/components/ContactForm.tsx`

## Validation Checklist
- Confirm the GA4 ID is set in `.env.local`.
- Verify `page_view` and `cta_click` in GA4 realtime.
- Submit the contact form and validate `form_submit`.
