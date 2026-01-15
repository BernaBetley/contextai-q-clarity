# Analytics Configuration

This document describes the analytics setup for the ContextAI Q website.

## Overview

The site uses Google Analytics 4 (GA4) for tracking. Analytics is optional and only enabled when the `NEXT_PUBLIC_GA4_MEASUREMENT_ID` environment variable is set.

## Setup

### Environment Variable

```bash
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
```

Set this in your deployment environment (e.g., Vercel, Netlify) or in a local `.env.local` file.

### How It Works

1. GA4 script is loaded in `app/layout.tsx` only when the env var is present
2. Page views are tracked automatically via the `Analytics` component
3. Custom events can be tracked using utilities in `app/lib/analytics.ts`

## Tracked Events

### Automatic Events

| Event | Description | Trigger |
|-------|-------------|---------|
| `page_view` | Page navigation | Every route change |

### Custom Events

Import tracking functions from `app/lib/analytics.ts`:

```typescript
import { trackCTAClick, trackFormSubmit } from '@/lib/analytics';
```

| Event | Function | Parameters |
|-------|----------|------------|
| `cta_click` | `trackCTAClick(location, destination)` | Button location and target page |
| `form_submit` | `trackFormSubmit(formName, success)` | Form identifier and success status |
| `methodology_view` | `trackMethodologyView(section)` | Section of methodology viewed |
| `offer_view` | `trackOfferView(offerName, price)` | When pricing is viewed |
| `external_link_click` | `trackExternalLink(linkType, url)` | Stripe, Calendly clicks |
| `faq_expand` | `trackFAQExpand(question)` | When FAQ item is opened |
| `scroll_depth` | `trackScrollDepth(percentage)` | Scroll milestones (25%, 50%, etc.) |

## Implementation Examples

### Track CTA Click

```tsx
import { trackCTAClick } from '@/lib/analytics';

<Link 
  href="/audit" 
  onClick={() => trackCTAClick('hero', 'audit')}
>
  Start Audit
</Link>
```

### Track External Link

```tsx
import { trackExternalLink } from '@/lib/analytics';

<a 
  href={stripeCheckoutUrl} 
  onClick={() => trackExternalLink('stripe', stripeCheckoutUrl)}
>
  Purchase
</a>
```

### Track Form Submit

```tsx
import { trackFormSubmit } from '@/lib/analytics';

const handleSubmit = async (data) => {
  try {
    await submitForm(data);
    trackFormSubmit('contact', true);
  } catch (error) {
    trackFormSubmit('contact', false);
  }
};
```

## Key Metrics to Monitor

### Conversion Funnel

1. **Landing** → Page views on `/`
2. **Interest** → CTA clicks, methodology views
3. **Intent** → `/audit` page views, offer views
4. **Action** → Stripe checkout clicks, form submissions

### Engagement Metrics

- **FAQ Engagement**: Which questions are most opened
- **Scroll Depth**: How far users scroll on key pages
- **Time on Site**: Session duration (GA4 default)

## GA4 Dashboard Setup

### Recommended Reports

1. **Conversions Report**
   - Set up `cta_click` with `cta_destination: 'audit'` as conversion
   - Set up `external_link_click` with `link_type: 'stripe'` as conversion

2. **User Journey**
   - Create a funnel: Home → Audit → Checkout
   - Track drop-off points

3. **Content Performance**
   - Pages report sorted by engagement
   - FAQ expansion heatmap

### Custom Dimensions

Create these in GA4 Admin → Data Display → Custom Definitions:

| Dimension | Scope | Parameter |
|-----------|-------|-----------|
| CTA Location | Event | `cta_location` |
| CTA Destination | Event | `cta_destination` |
| Form Name | Event | `form_name` |
| Offer Name | Event | `offer_name` |

## Privacy Considerations

- Analytics is disabled by default (no env var = no tracking)
- `anonymize_ip: true` is enabled in the GA4 config
- No personally identifiable information (PII) is tracked
- Privacy policy at `/privacy` documents data collection

## Testing

### Local Development

1. Set `NEXT_PUBLIC_GA4_MEASUREMENT_ID` in `.env.local`
2. Use GA4 DebugView to see events in real-time
3. Install [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/) Chrome extension

### Verifying Events

1. Open browser DevTools → Network tab
2. Filter by `collect?` to see GA requests
3. Check event payloads in request body

## Alternatives

If you prefer privacy-focused analytics, the codebase can be adapted for:

- **Plausible**: Replace GA4 script with Plausible snippet
- **PostHog**: Add PostHog SDK, update tracking functions
- **Fathom**: Simple swap of tracking script

The `trackEvent` function provides a unified interface that can be adapted to any analytics provider.

---

*Last updated: January 2026*
