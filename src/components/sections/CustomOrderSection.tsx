import { WhatsappLogo } from '@phosphor-icons/react'
import { site } from '../../config/site'
import { images } from '../../data/images'
import { whatsappLink } from '../../lib/whatsapp'
import { ButtonLink } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { SmartImage } from '../ui/SmartImage'
import { CustomOrderForm } from './CustomOrderForm'

const steps = [
  { title: 'Você conta a ideia', text: 'Pela ficha ou pelo WhatsApp, com foto de referência se tiver.' },
  { title: 'Orçamento e prévia', text: 'Em até 1 dia útil: valor, prazo e as cores lado a lado.' },
  { title: 'Ponto a ponto', text: 'Com o sinal de 50%, a peça entra na agulha. Mandamos fotos do processo.' },
]

export function CustomOrderSection() {
  return (
    <section id="personalizados" aria-labelledby="personalizados-titulo" className="relative overflow-hidden bg-cocoa py-20 text-cream lg:py-28">
      <svg className="pointer-events-none absolute -right-24 -top-24 size-[28rem] text-cream/[0.06]" viewBox="0 0 200 200" aria-hidden="true">
        <circle cx="100" cy="100" r="96" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="6 7" />
        <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="6 7" />
        <circle cx="100" cy="100" r="44" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="6 7" />
      </svg>

      <div className="relative mx-auto grid max-w-[1320px] gap-12 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-10">
        <div>
          <Reveal>
            <p className="eyebrow !text-butter">Personalizados</p>
            <h2 id="personalizados-titulo" className="mt-3 text-[2.3rem] !text-cream sm:text-[3.4rem]" style={{ fontVariationSettings: "'SOFT' 100, 'WONK' 1" }}>
              {site.customOrder.title}
            </h2>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-cream/80">{site.customOrder.text}</p>
          </Reveal>

          <ol className="mt-10 space-y-6">
            {steps.map((s, i) => (
              <li key={s.title}>
                <Reveal delay={i * 0.08} className="flex gap-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-butter font-display text-lg font-semibold text-ink" aria-hidden="true">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-lg font-semibold text-cream">{s.title}</p>
                    <p className="text-cream/75">{s.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>

          <Reveal className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center lg:flex-col lg:items-start xl:flex-row xl:items-center">
            <div className="relative w-40 shrink-0 -rotate-3 overflow-hidden rounded-2xl border-[5px] border-cream shadow-lift">
              <SmartImage asset={images.bunnyGardenerHand} width={320} aspect={0.85} sizes="160px" className="aspect-[0.85] w-full" />
            </div>
            <div>
              <p className="hand-note text-2xl text-rose">prefere conversar?</p>
              <ButtonLink
                href={whatsappLink(site.whatsappMessages.custom)}
                variant="whatsapp"
                className="mt-2"
                icon={<WhatsappLogo size={20} weight="fill" aria-hidden="true" />}
              >
                Contar a ideia no WhatsApp
              </ButtonLink>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="relative rounded-[28px] bg-ivory text-ink shadow-lift">
            {/* furinho de etiqueta */}
            <span className="absolute -top-3 left-1/2 hidden h-6 w-20 -translate-x-1/2 rotate-[-2deg] rounded-sm bg-butter/90 shadow-soft sm:block" aria-hidden="true" />
            <CustomOrderForm />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
