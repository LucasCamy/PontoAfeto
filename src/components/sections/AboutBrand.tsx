import { about } from '../../data/content'
import { site } from '../../config/site'
import { Reveal } from '../ui/Reveal'
import { SmartImage } from '../ui/SmartImage'

export function AboutBrand() {
  return (
    <section id="sobre" aria-labelledby="sobre-titulo" className="relative py-20 lg:py-28">
      <div className="mx-auto grid max-w-[1320px] gap-14 px-4 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-20 lg:px-10">
        {/* Fotos do ateliê */}
        <Reveal className="relative order-last mx-auto w-full max-w-[520px] lg:order-first">
          <div className="overflow-hidden rounded-[36px] shadow-lift">
            <SmartImage asset={about.image} width={720} aspect={0.82} sizes="(min-width: 1024px) 40vw, 92vw" className="aspect-[0.82] w-full" />
          </div>
          <div className="absolute -bottom-8 -right-3 w-[44%] overflow-hidden rounded-[999px_999px_22px_22px] border-[6px] border-cream shadow-lift sm:-right-10">
            <SmartImage asset={about.secondaryImage} width={360} aspect={0.8} sizes="220px" className="aspect-[0.8] w-full" />
          </div>
          <p className="hand-note absolute -left-2 top-6 -rotate-6 rounded-lg bg-ivory px-3 py-1.5 text-xl text-terracotta-deep shadow-soft sm:-left-8">
            nosso cantinho
          </p>
        </Reveal>

        <div>
          <Reveal>
            <p className="eyebrow">Sobre a marca</p>
            <h2 id="sobre-titulo" className="mt-3 text-[2.2rem] sm:text-5xl" style={{ fontVariationSettings: "'SOFT' 100, 'WONK' 1" }}>
              {about.title}
            </h2>
            {about.paragraphs.map((p) => (
              <p key={p} className="mt-4 text-lg leading-relaxed text-cocoa-mid">
                {p}
              </p>
            ))}
          </Reveal>

          {/* DEMONSTRATIVO — números fictícios definidos em data/content.ts */}
          <Reveal delay={0.05}>
            <dl className="mt-9 grid grid-cols-3 gap-3 border-y border-dashed border-sand-line py-6">
              {about.stats.map((s) => (
                <div key={s.label} className="flex flex-col-reverse gap-1.5">
                  <dt className="text-sm leading-snug text-cocoa-mid">{s.label}</dt>
                  <dd className="font-display text-[1.9rem] font-semibold leading-none text-terracotta-deep sm:text-[2.6rem]" style={{ fontVariationSettings: "'SOFT' 100" }}>
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.08}>
            <ul className="mt-8 grid gap-5 sm:grid-cols-3">
              {about.values.map((v) => (
                <li key={v.title}>
                  <p className="flex items-center gap-2 font-semibold text-ink">
                    <span className="size-2 rounded-full bg-sage-deep" aria-hidden="true" />
                    {v.title}
                  </p>
                  <p className="mt-1 text-[0.95rem] leading-relaxed text-cocoa-mid">{v.text}</p>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Bilhete da artesã */}
          <Reveal delay={0.1}>
            <figure className="relative mt-10 rotate-[-0.6deg] rounded-[6px_18px_8px_20px] bg-butter-soft p-6 shadow-paper sm:p-7">
              <span className="absolute -top-3 left-8 h-6 w-16 rotate-[-4deg] rounded-sm bg-rose/80" aria-hidden="true" />
              <blockquote className="font-display text-[1.15rem] italic leading-relaxed text-cocoa" style={{ fontVariationSettings: "'SOFT' 100" }}>
                “{about.letter}”
              </blockquote>
              <figcaption className="mt-4 flex items-baseline gap-2">
                <span className="hand-note text-3xl text-terracotta-deep">{site.artisan.name}</span>
                <span className="text-sm text-cocoa-mid">— {site.artisan.role}</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
