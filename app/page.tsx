'use client'

import { Link2, MapPin, Star } from 'lucide-react'

const links = [
  {
    label: 'Agendar consulta de avaliação',
    iconSrc: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/whatsapp/default.svg',
    iconAlt: 'WhatsApp',
    iconClass: 'text-[#21c98a]',
    href: '#agendamento',
  },
  {
    label: 'Como chegar aqui',
    icon: MapPin,
    iconClass: 'text-[#ed4545]',
    href: '#localizacao',
  },
  {
    label: 'Avaliação no Google',
    icon: Star,
    iconClass: 'text-[#e5a528]',
    href: '#avaliacoes',
  },
  {
    label: 'Conheça meu projeto',
    icon: Link2,
    iconClass: 'text-[#d94e7c]',
    href: '#projeto',
  },
]

export default function Page() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-8 sm:px-5 sm:py-10">
      <div className="relative z-10 flex w-full max-w-[420px] flex-col items-center text-center">
        <div className="mb-0 flex aspect-square w-[min(82vw,320px)] items-center justify-center overflow-hidden rounded-full">
          <img
            src="/dom-pablo-logo.png"
            alt="Logotipo Don Pablo Barbearia"
            className="h-full w-full object-contain mix-blend-screen"
          />
        </div>

        <h1 className="-mt-12 whitespace-nowrap font-serif text-[clamp(1.1rem,7vw,1.75rem)] font-semibold uppercase tracking-[0.16em] text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.55)] sm:-mt-16 sm:tracking-[0.2em]">
          Don Pablo Barbearia
        </h1>
        <div className="mt-4 flex items-center gap-4 text-[#36362d]">
          <a
            href="#facebook"
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
            href="#instagram"
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

        <nav aria-label="Links principais" className="mt-2 flex w-full flex-col gap-2.5">
          {links.map(({ label, icon: Icon, iconSrc, iconAlt, iconClass, href }) => (
            <a
              key={label}
              href={href}
              className="group flex min-h-[56px] w-full items-center justify-start gap-3 rounded-[17px] border border-white/80 bg-white/90 px-5 text-left text-[14px] font-bold text-[#191919] shadow-[0_4px_8px_rgba(90,89,57,0.16)] backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_7px_14px_rgba(90,89,57,0.2)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#36362d]"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center">
                {iconSrc ? (
                  <img src={iconSrc} alt={iconAlt} className="h-6 w-6 object-contain" />
                ) : Icon ? (
                  <Icon className={iconClass} size={24} strokeWidth={2.3} />
                ) : null}
              </span>
              <span>{label}</span>
            </a>
          ))}
        </nav>

        <p className="mt-8 text-[10px] font-medium uppercase tracking-[0.18em] text-[#817d59]">
          Personalize este espaço com a sua marca
        </p>
      </div>
    </main>
  )
}
