'use client'

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

const links = [
  {
    label: 'Agendar meu horário',
    iconSrc: '/images/wpp.png',
    iconAlt: 'WhatsApp',
    href: 'https://wa.me/556593331949?text=Oi%2C+quero+agendar+um+hor%C3%A1rio+na+Dom+Pablo.&utm_source=chatgpt.com',
  },
  {
    label: 'Combo VIP',
    iconSrc: '/images/wpp.png',
    iconAlt: 'WhatsApp',
    href: 'https://wa.me/556593331949?text=Oi%2C+quero+conhecer+os+combos+VIP+da+Dom+Pablo.&utm_source=chatgpt.com',
  },
  {
    label: 'Dom Conecta',
    iconSrc: '/images/wpp.png',
    iconAlt: 'WhatsApp',
    href: 'https://wa.me/556593331949?text=Oi%2C+tenho+interesse+no+Dom+Conecta%2C+pode+me+passar+mais+informa%C3%A7%C3%B5es%3F&utm_source=chatgpt.com',
  },
  {
    label: 'Localização Dom Pablo',
    iconSrc: '/images/loc.png',
    iconAlt: 'Localização',
    href: 'https://www.google.com/maps/search/?api=1&query=Dom+Pablo+Barbearia%2C+Rua+Mestre+Teodoro+Louren%C3%A7o+da+Costa%2C+85%2C+Cuiab%C3%A1%2C+MT&utm_source=chatgpt.com',
  },
  {
    label: 'Avalie sua Experiência',
    iconSrc: '/images/av.png',
    iconAlt: 'Avaliação',
    href: 'https://search.google.com/local/writereview?placeid=ChIJi5zq4f6wnZMRktPYNnZr73M&utm_source=chatgpt.com',
  },
]

export default function Page() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-x-hidden px-4 py-12 sm:px-5 sm:py-16">
      <div className="relative z-10 flex w-full max-w-[420px] -translate-y-12 flex-col items-center text-center sm:translate-y-0">
        <div className="relative -top-5 flex aspect-square w-[min(82vw,320px)] items-center justify-center overflow-hidden rounded-full sm:-top-7">
          <img
            src="/images/dom-pablo-logo.png"
            alt="Logotipo DOM Pablo Barbearia"
            className="h-full w-full object-contain mix-blend-screen"
          />
        </div>

        <h1 className="relative -top-5 -mt-12 max-w-full px-2 text-balance font-serif text-[clamp(1rem,6.4vw,1.75rem)] font-semibold uppercase leading-tight tracking-[0.1em] text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.55)] sm:-top-7 sm:-mt-16 sm:px-0 sm:whitespace-nowrap sm:tracking-[0.2em]">
          DOM Pablo Barbearia
        </h1>
        <div className="mt-0 flex items-center gap-4 text-[#36362d] sm:mt-4">
          <a
            href="https://facebook.com/DomPabloBarbearia"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
            className="inline-flex rounded-full p-1.5 transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#36362d]"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/facebook/default.svg"
              alt=""
              aria-hidden="true"
              className="h-[21px] w-[21px]"
            />
          </a>
          <a
            href="https://instagram.com/dompablobarbeariaoficial"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="inline-flex rounded-full p-1.5 transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#36362d]"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/instagram/default.svg"
              alt=""
              aria-hidden="true"
              className="h-[23px] w-[23px]"
            />
          </a>
        </div>

        <nav aria-label="Links principais" className="mt-8 flex w-full flex-col gap-4">
          {links.map(({ label, icon: Icon, iconSrc, iconAlt, iconClass, href }) => (
            <a
              key={label}
              href={href}
              onClick={() => window.fbq?.('track', 'Lead', { content_name: label })}
              className="group mx-auto flex min-h-[50px] w-full max-w-[360px] items-center justify-center gap-3 rounded-xl bg-[#bfc0bc]/95 px-6 text-center text-[12px] font-medium uppercase tracking-[0.16em] text-[#242522] shadow-[0_8px_20px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.45)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[#c8c9c5] hover:tracking-[0.18em] hover:shadow-[0_12px_26px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.58)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#d7c98a] sm:min-h-[56px]"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center">
                {iconSrc ? (
                  <img
                    src={iconSrc}
                    alt={iconAlt}
                    className={`object-contain ${iconAlt === 'Localização' ? 'h-9 w-9' : iconAlt === 'Avaliação' ? 'h-8 w-8' : 'h-7 w-7'}`}
                  />
                ) : Icon ? (
                  <Icon
                    aria-hidden="true"
                    className={iconClass}
                    size={25}
                    strokeWidth={1.8}
                  />
                ) : null}
              </span>
              <span>{label}</span>
            </a>
          ))}
        </nav>

        <footer className="mt-24 flex w-full max-w-full flex-col items-center justify-center gap-3 pb-4 text-center text-[10px] font-medium uppercase tracking-[0.12em] text-[#817d59] sm:gap-4 sm:text-[10px] sm:tracking-[0.18em]">
          <a
            href="https://instagram.com/trafixassessoria"
            target="_blank"
            rel="noreferrer"
            className="text-[#aaa681] transition-colors hover:text-[#c5ad58] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#aaa681]"
          >
            Desenvolvido por Trafix Assessoria
          </a>
          <p className="text-[8px] tracking-[0.05em] text-[#aaa681] sm:text-[9px] sm:tracking-[0.12em]">
            © 2026 DOM Pablo Barbearia. Todos os direitos reservados.
          </p>
        </footer>
      </div>
    </main>
  )
}
