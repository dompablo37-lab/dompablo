'use client'

const links = [
  {
    label: 'Agendar meu horário',
    iconSrc: '/images/wpp.png',
    iconAlt: 'WhatsApp',
    href: '#agendamento',
  },
  {
    label: "Dom's Club",
    iconSrc: '/images/wpp.png',
    iconAlt: 'WhatsApp',
    href: '#doms-club',
  },
  {
    label: 'Localização Dom Pablo',
    iconSrc: '/images/loc.png',
    iconAlt: 'Localização',
    href: '#localizacao',
  },
  {
    label: 'Avalie sua Experiência',
    iconSrc: '/images/av.png',
    iconAlt: 'Avaliação',
    href: '#avaliacoes',
  },
]

export default function Page() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-8 sm:px-5 sm:py-10">
      <div className="relative z-10 flex w-full max-w-[420px] flex-col items-center text-center">
        <div className="mb-0 flex aspect-square w-[min(82vw,320px)] items-center justify-center overflow-hidden rounded-full">
          <img
            src="/dom-pablo-logo.png"
            alt="Logotipo DOM Pablo Barbearia"
            className="h-full w-full object-contain mix-blend-screen"
          />
        </div>

        <h1 className="-mt-12 whitespace-nowrap font-serif text-[clamp(1.1rem,7vw,1.75rem)] font-semibold uppercase tracking-[0.16em] text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.55)] sm:-mt-16 sm:tracking-[0.2em]">
          DOM Pablo Barbearia
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
              className="group mx-auto flex min-h-[62px] w-full max-w-[360px] items-center justify-center gap-3 rounded-2xl border border-white/70 bg-white/95 px-6 text-center text-[12px] font-medium uppercase tracking-[0.14em] text-[#191919] shadow-[0_8px_18px_rgba(61,59,39,0.14),inset_0_1px_0_rgba(255,255,255,0.95)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:tracking-[0.16em] hover:shadow-[0_12px_24px_rgba(61,59,39,0.2),inset_0_1px_0_rgba(255,255,255,1)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#36362d]"
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

        <p className="mt-8 text-[10px] font-medium uppercase tracking-[0.18em] text-[#817d59]">
          Desenvolvido por Trafix Assessoria
        </p>
      </div>
    </main>
  )
}
