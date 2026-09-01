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

/**
 * Nome de evento específico por botão, para que cada ação apareça de forma
 * individual no relatório em Tempo Real do GA4 (Eventos por nome do evento).
 */
export const GA_BUTTON_EVENTS: Record<string, string> = {
  'Agendar meu horário': 'agendar_horario',
  'Combo VIP': 'combo_vip',
  'Dom Conecta': 'dom_conecta',
  'Faça parte do time': 'faca_parte_do_time',
  'Localização Dom Pablo': 'localizacao',
  'Avalie sua Experiência': 'avaliar_experiencia',
}

export function getGaEventName(label: string): string {
  return GA_BUTTON_EVENTS[label] ?? 'click'
}

/**
 * Envia o evento ao GA4 e só então navega para o destino.
 *
 * Links externos (WhatsApp, Maps, avaliação) descarregam a página na mesma aba;
 * sem esperar a confirmação do gtag, a requisição do evento é cancelada e nunca
 * chega ao Tempo Real. Usamos `transport_type: 'beacon'` + `event_callback`
 * para garantir o envio, com um fallback por tempo caso o callback não dispare.
 */
export function trackGoogleEventAndNavigate(
  eventName: string,
  params: GaEventParams,
  href: string,
) {
  const navigate = () => {
    window.location.href = href
  }

  if (typeof window === 'undefined' || !window.gtag) {
    navigate()
    return
  }

  let navigated = false
  const navigateOnce = () => {
    if (navigated) return
    navigated = true
    navigate()
  }

  window.gtag('event', eventName, {
    ...params,
    page_location: window.location.href,
    transport_type: 'beacon',
    event_callback: navigateOnce,
  })

  // Fallback: se o callback não disparar (bloqueio/latência), navega mesmo assim.
  window.setTimeout(navigateOnce, 500)
}
