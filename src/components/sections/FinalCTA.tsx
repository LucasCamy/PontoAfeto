import { ArrowRight, WhatsappLogo } from '@phosphor-icons/react'
import { site } from '../../config/site'
import { images } from '../../data/images'
import { whatsappLink } from '../../lib/whatsapp'
import { ButtonLink } from '../ui/Button'
import { LogoMark } from '../ui/Logo'
import { Reveal } from '../ui/Reveal'
import { SmartImage } from '../ui/SmartImage'

export function FinalCTA() {
  return (
    <section aria-labelledby="cta-final-titulo" className="px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
      <Reveal className="relative mx-auto max-w-[1320px] overflow-hidden rounded-[36px] bg-terracotta-deep text-white sm:rounded-[48px]">
        <div className="stitch-border pointer-events-none absolute inset-0 rounded-[inherit] text-white" aria-hidden="true" />
        <div className="grid items-center gap-12 p-6 sm:p-12 lg:grid-cols-[1.1fr_1fr] lg:p-16">
          <div className="relative">
            <LogoMark tone="light" size={52} />
            <h2 id="cta-final-titulo" className="mt-5 text-[2rem] text-white sm:text-[3.4rem]" style={{ fontVariationSettings: "'SOFT' 100, 'WONK' 1" }}>
              {site.finalCta.title}
            </h2>
            <p className="mt-4 max-w-md text-lg text-white/85">{site.finalCta.text}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink href="#produtos" variant="cream" size="lg" iconRight={<ArrowRight size={18} weight="bold" aria-hidden="true" />}>
                Ver produtos
              </ButtonLink>
              <ButtonLink
                href={whatsappLink()}
                size="lg"
                className="!bg-ink text-white shadow-none hover:!bg-cocoa"
                icon={<WhatsappLogo size={22} weight="fill" aria-hidden="true" />}
              >
                Falar pelo WhatsApp
              </ButtonLink>
            </div>
          </div>

          <div className="relative mx-auto grid w-full max-w-md grid-cols-2 gap-3 pb-4">
            <div className="self-start overflow-hidden rounded-[999px_999px_24px_24px] border-4 border-white/20">
              <SmartImage asset={images.tulips} width={360} aspect={0.75} sizes="220px" className="aspect-[0.75] w-full" />
            </div>
            <div className="mt-10 self-start overflow-hidden rounded-[24px] border-4 border-white/20">
              <SmartImage asset={images.catHead} width={360} aspect={0.75} sizes="220px" className="aspect-[0.75] w-full" />
            </div>
            {/* etiqueta artesanal */}
            <div className="absolute -bottom-2 left-1/2 w-max -translate-x-1/2 rotate-[-4deg] rounded-[8px_8px_12px_12px] bg-cream px-4 py-2 text-center shadow-lift">
              <span className="hand-note block text-2xl text-terracotta-ink">feito para você</span>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
