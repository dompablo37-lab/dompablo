'use client'

import {
  AtSign,
  Link2,
  MapPin,
  MessageCircle,
  Star,
} from 'lucide-react'

const links = [
  {
    label: 'Agendar consulta de avaliação',
    icon: MessageCircle,
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
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-10">
      <div className="relative z-10 flex w-full max-w-[390px] flex-col items-center text-center">
        <div className="mb-5 flex h-[220px] w-[220px] items-center justify-center overflow-hidden rounded-full">
          <img
            src="/dom-pablo-logo.png"
            alt="Logotipo Dom Pablo Barberia"
            className="h-full w-full object-contain mix-blend-screen"
          />
        </div>

        <h1 className="font-sans text-[25px] font-bold tracking-[-0.04em] text-[#111111]">
          Seu nome aqui
        </h1>
        <p className="mt-1 text-[12px] font-semibold text-[#33352c]">
          Sua profissão ou registro
        </p>
        <p className="mt-2 text-[12px] font-medium uppercase tracking-[0.32em] text-[#a79d62]">
          Seu posicionamento
        </p>

        <a
          href="#instagram"
          aria-label="Instagram"
          className="mt-3 inline-flex rounded-full p-1.5 text-[#36362d] transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#36362d]"
        >
          <AtSign size={23} strokeWidth={2.2} />
        </a>

        <nav aria-label="Links principais" className="mt-2 flex w-full flex-col gap-2.5">
          {links.map(({ label, icon: Icon, iconClass, href }) => (
            <a
              key={label}
              href={href}
              className="group flex min-h-[56px] w-full items-center justify-center gap-3 rounded-[17px] border border-white/80 bg-white/90 px-5 text-[14px] font-bold text-[#191919] shadow-[0_4px_8px_rgba(90,89,57,0.16)] backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_7px_14px_rgba(90,89,57,0.2)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#36362d]"
            >
              <Icon className={`shrink-0 ${iconClass}`} size={24} strokeWidth={2.3} />
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
