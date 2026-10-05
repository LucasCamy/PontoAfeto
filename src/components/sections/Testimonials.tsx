import { Quotes, Star } from '@phosphor-icons/react'
import { site } from '../../config/site'
import { testimonials } from '../../data/content'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { SmartImage } from '../ui/SmartImage'

const noteStyles = [
  'bg-rose-soft rotate-[1.2deg]',
  'bg-butter-soft -rotate-[1deg] lg:translate-x-6',
  'bg-lavender-soft rotate-[0.6deg]',
]

function Stars() {
  return (
    <span className="flex gap-0.5 text-terracotta-deep" role="img" aria-label="5 de 5 estrelas">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} size={16} weight="fill" aria-hidden="true" />
      ))}
    </span>
  )
}

export function Testimonials() {
  // DEMONSTRATIVO — os depoimentos vêm de data/content.ts e são fictícios
  const [main, ...notes] = testimonials

  return (
    <section aria-labelledby="depoimentos-titulo" className="relative bg-ivory py-20 lg:py-28">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
        <SectionHeading id="depoimentos-titulo" eyebrow="Quem já recebeu" title="Bilhetes que chegam de volta" note="a gente guarda todos">
          {site.isDemo && <span className="text-sm">Depoimentos ilustrativos — conteúdo de demonstração.</span>}
        </SectionHeading>

        <div className="mt-12 grid gap-6 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-7">
            <figure className="grid h-full overflow-hidden rounded-[32px] bg-cream shadow-soft sm:grid-cols-[0.9fr_1.1fr]">
              {main.image && (
                <SmartImage asset={main.image} width={520} aspect={0.9} sizes="(min-width: 1024px) 26vw, (min-width: 640px) 45vw, 92vw" className="aspect-[1.3] w-full sm:aspect-auto sm:h-full" />
              )}
              <div className="flex flex-col p-6 sm:p-8">
                <Quotes size={40} weight="fill" className="text-terracotta" aria-hidden="true" />
                <blockquote className="mt-3 font-display text-[1.4rem] leading-snug text-cocoa sm:text-[1.6rem]" style={{ fontVariationSettings: "'SOFT' 100" }}>
                  {main.quote}
                </blockquote>
                <figcaption className="mt-auto pt-6">
                  <Stars />
                  <p className="mt-2 font-semibold text-ink">{main.author}</p>
                  <p className="text-sm text-cocoa-mid">
                    {main.city} · comprou {main.product}
                  </p>
                </figcaption>
              </div>
            </figure>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            {notes.map((t, i) => (
              <Reveal key={t.author} delay={0.08 * (i + 1)}>
                <figure className={`relative rounded-[6px_20px_10px_22px] p-6 shadow-paper ${noteStyles[i % noteStyles.length]}`}>
                  <span className="absolute -top-2.5 right-8 h-5 w-14 rotate-6 rounded-sm bg-ivory/80" aria-hidden="true" />
                  <blockquote className="text-[1.05rem] leading-relaxed text-ink">“{t.quote}”</blockquote>
                  <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-x-3">
                    <span className="hand-note text-2xl text-terracotta-ink">{t.author}</span>
                    <span className="text-sm text-cocoa-mid">
                      {t.city} · {t.product}
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
