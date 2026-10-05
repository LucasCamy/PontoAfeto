import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'
import { images } from '../../data/images'
import { processSteps } from '../../data/content'
import { Icon } from '../ui/Icon'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { SmartImage } from '../ui/SmartImage'

export function HandmadeProcess() {
  const listRef = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 70%', 'end 60%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  return (
    <section id="processo" aria-labelledby="processo-titulo" className="relative py-20 lg:py-28">
      <div className="mx-auto grid max-w-[1320px] gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-10">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading id="processo-titulo" eyebrow="Feito com carinho" title="Do novelo até a sua porta" note="cada peça tem uma história">
            Nada sai daqui pronto em série. Este é o caminho que toda peça percorre — e por que algumas levam alguns dias a mais.
          </SectionHeading>
          <Reveal className="relative mt-10 hidden max-w-md lg:block">
            <div className="overflow-hidden rounded-[32px] shadow-soft">
              <SmartImage asset={images.handsColorful} width={640} aspect={1.15} sizes="36vw" className="aspect-[1.15] w-full" />
            </div>
            <p className="hand-note absolute -bottom-5 right-6 rotate-[-3deg] rounded-lg bg-butter px-3 py-1 text-xl text-ink shadow-soft">
              mãos da artesã, numa terça qualquer
            </p>
          </Reveal>
        </div>

        <ol ref={listRef} className="relative">
          {/* fio da linha do tempo */}
          <div className="absolute bottom-6 left-[1.35rem] top-6 w-0.5 rounded-full bg-sand-line" aria-hidden="true" />
          <motion.div
            className="absolute bottom-6 left-[1.35rem] top-6 w-0.5 origin-top rounded-full bg-terracotta"
            style={{ scaleY: progress }}
            aria-hidden="true"
          />

          {processSteps.map((step, i) => (
            <li key={step.title} className="relative pb-12 pl-16 last:pb-0 sm:pl-20">
              <Reveal>
                <span
                  className="absolute left-0 top-0 grid size-11 place-items-center rounded-full bg-ivory text-terracotta-deep shadow-soft ring-2 ring-cream"
                  aria-hidden="true"
                >
                  <Icon name={step.icon} size={22} weight="duotone" />
                </span>
                <p className="text-sm font-bold text-cocoa-mid">Etapa {i + 1}</p>
                <h3 className="mt-1 text-2xl sm:text-[1.75rem]" style={{ fontVariationSettings: "'SOFT' 100" }}>
                  {step.title}
                </h3>
                <p className="mt-2 max-w-[38rem] leading-relaxed text-cocoa-mid">{step.text}</p>
                <p className="hand-note mt-2 text-[1.35rem] text-sage-deep" aria-hidden="true">
                  — {step.note}
                </p>
                {step.image && (
                  <div className={`mt-5 overflow-hidden rounded-[24px] shadow-soft ${i % 2 ? 'max-w-[15rem]' : 'max-w-[24rem]'}`}>
                    <SmartImage
                      asset={step.image}
                      width={560}
                      aspect={i % 2 ? 1 : 1.5}
                      sizes="(min-width: 1024px) 28vw, 80vw"
                      className={`w-full ${i % 2 ? 'aspect-square' : 'aspect-[1.5]'}`}
                    />
                  </div>
                )}
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
