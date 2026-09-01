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
 * Links externos (WhatsApp, Maps, avaliação) descarregam a página na mesma aba.
 * O GA4 (gtag.js) despacha o hit como uma requisição comum que é cancelada no
 * unload, então precisamos adiar a navegação até o hit sair. Usamos o par
 * oficial do gtag para isso: `event_callback` (chamado assim que o hit é
 * despachado) e `event_timeout` (aciona o callback mesmo se a rede travar).
 *
 * IMPORTANTE: não usamos um `setTimeout` curto próprio para navegar, porque em
 * conexões móveis lentas ele dispararia ANTES do gtag despachar o hit,
 * cancelando o envio — foi o que impedia os eventos de chegarem ao Tempo Real.
 */
export function trackGoogleEventAndNavigate(
  eventName: string,
  params: GaEventParams,
  href: string,
) {
  const navigate = () => {
    window.location.href = href
  }

  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
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
    // Chamado assim que o hit é despachado; navega já em seguida.
    event_callback: navigateOnce,
    // Backstop coordenado pelo gtag: garante a navegação mesmo se o callback
    // não vier (ex.: GA bloqueado), sem cortar o envio prematuramente.
    event_timeout: 1000,
  })

  // Backstop final, só para o caso improvável de o gtag não honrar nenhum dos
  // dois acima (mantém a UX: o link sempre abre).
  window.setTimeout(navigateOnce, 1200)
}
