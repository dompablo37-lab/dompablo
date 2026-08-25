import { NextRequest, NextResponse } from 'next/server'

const EVENT_NAMES = new Set([
  'PageView',
  'ViewContent',
  'Lead',
  'Contact',
  'CompleteRegistration',
])

const META_GRAPH_VERSION = 'v23.0'

function cleanValue(value: unknown, maxLength = 500) {
  return typeof value === 'string' ? value.slice(0, maxLength) : undefined
}

export async function POST(request: NextRequest) {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID
  const accessToken = process.env.META_ACCESS_TOKEN

  if (!pixelId || !accessToken) {
    return NextResponse.json({ error: 'Meta CAPI não configurada' }, { status: 503 })
  }

  try {
    const body = await request.json()
    const eventName = cleanValue(body?.eventName, 40)
    const eventId = cleanValue(body?.eventId, 120)
    const eventData = body?.eventData && typeof body.eventData === 'object' ? body.eventData : {}

    if (!eventName || !EVENT_NAMES.has(eventName) || !eventId) {
      return NextResponse.json({ error: 'Evento inválido' }, { status: 400 })
    }

    const headers = request.headers
    const userData: Record<string, string> = {}
    const fbp = cleanValue(eventData.fbp, 200)
    const fbc = cleanValue(eventData.fbc, 200)
    const userAgent = cleanValue(headers.get('user-agent'), 500)
    const clientIp = cleanValue(headers.get('x-forwarded-for')?.split(',')[0]?.trim(), 100)
    if (fbp) userData.fbp = fbp
    if (fbc) userData.fbc = fbc
    if (userAgent) userData.client_user_agent = userAgent
    if (clientIp) userData.client_ip_address = clientIp

    const customData = Object.fromEntries(
      Object.entries(eventData)
        .filter(([key, value]) => !['fbp', 'fbc', 'page_url'].includes(key) && value !== undefined)
        .slice(0, 20)
        .map(([key, value]) => [key.slice(0, 80), typeof value === 'string' ? value.slice(0, 500) : value]),
    )

    const response = await fetch(`https://graph.facebook.com/${META_GRAPH_VERSION}/${pixelId}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: [{
          event_name: eventName,
          event_time: Math.floor(Date.now() / 1000),
          event_id: eventId,
          action_source: 'website',
          event_source_url: cleanValue(eventData.page_url, 2000),
          user_data: userData,
          custom_data: customData,
        }],
        access_token: accessToken,
      }),
    })

    const result = await response.json()
    if (!response.ok) {
      return NextResponse.json({ error: 'Meta recusou o evento', details: result?.error?.message }, { status: 502 })
    }

    return NextResponse.json({ ok: true, events_received: result.events_received ?? 1 })
  } catch {
    return NextResponse.json({ error: 'Não foi possível processar o evento' }, { status: 400 })
  }
}
