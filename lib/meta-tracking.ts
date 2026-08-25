'use client'

export type MetaEventName =
  | 'PageView'
  | 'ViewContent'
  | 'Lead'
  | 'Contact'
  | 'CompleteRegistration'

type MetaEventData = Record<string, string | number | boolean | undefined>

interface MetaEventOptions {
  eventName: MetaEventName
  eventData?: MetaEventData
  eventId?: string
}

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

const COOKIE_MAX_AGE = 60 * 60 * 24 * 90

function getCookie(name: string) {
  return document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${name}=`))
    ?.split('=')[1]
}

function getTrackingContext() {
  const params = new URLSearchParams(window.location.search)
  const utms = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
    .reduce<Record<string, string>>((result, key) => {
      const value = params.get(key)
      if (value) result[key] = value
      return result
    }, {})

  return {
    ...utms,
    fbp: getCookie('_fbp'),
    fbc: getCookie('_fbc') || (params.get('fbclid') ? `fb.1.${Date.now()}.${params.get('fbclid')}` : undefined),
    page_url: window.location.href,
  }
}

function persistFbcFromFbclid() {
  const fbclid = new URLSearchParams(window.location.search).get('fbclid')
  if (fbclid && !getCookie('_fbc')) {
    document.cookie = `_fbc=fb.1.${Date.now()}.${fbclid}; Max-Age=${COOKIE_MAX_AGE}; Path=/; SameSite=Lax`
  }
}

export function createMetaEventId(eventName: MetaEventName) {
  return `${eventName.toLowerCase()}_${Date.now()}_${crypto.randomUUID()}`
}

export function trackMetaEvent({ eventName, eventData = {}, eventId = createMetaEventId(eventName) }: MetaEventOptions) {
  persistFbcFromFbclid()
  const data = { ...eventData, ...getTrackingContext() }

  // O mesmo event_id é enviado ao Pixel e à CAPI para deduplicação na Meta.
  window.fbq?.('track', eventName, data, { eventID: eventId })

  const payload = JSON.stringify({ eventName, eventId, eventData: data })
  const body = new Blob([payload], { type: 'application/json' })
  if (navigator.sendBeacon) {
    navigator.sendBeacon('/api/meta/events', body)
  } else {
    void fetch('/api/meta/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
      keepalive: true,
    }).catch(() => undefined)
  }

  return eventId
}

export function trackMetaPageView() {
  return trackMetaEvent({ eventName: 'PageView', eventData: { content_name: document.title } })
}

export function getMetaClickEvent(label: string): MetaEventName {
  if (label === 'Avalie sua Experiência') return 'CompleteRegistration'
  if (label === 'Localização Dom Pablo') return 'Lead'
  return 'Contact'
}

export function getMetaEventData(label: string, href: string) {
  return { content_name: label, content_type: 'button', link_url: href }
}
