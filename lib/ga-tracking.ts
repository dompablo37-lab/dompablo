export const GA_MEASUREMENT_ID = 'G-P227CQ29HD'

export type GaEventParams = Record<string, string | number | boolean | undefined>

type Gtag = (...args: unknown[]) => void

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag?: Gtag
  }
}

export function trackGoogleEvent(eventName: string, params: GaEventParams = {}) {
  if (typeof window === 'undefined' || !window.gtag) return

  window.gtag('event', eventName, {
    ...params,
    page_location: window.location.href,
  })
}

export function trackLinkClick(label: string, href: string) {
  trackGoogleEvent('click', {
    link_text: label,
    link_url: href,
    event_category: 'engagement',
  })
}
