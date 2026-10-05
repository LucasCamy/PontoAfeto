import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ArrowDown, Sparkle } from '@phosphor-icons/react'
import { site } from '../../config/site'
import { images } from '../../data/images'
import { getProduct } from '../../data/products'
import { formatPrice } from '../../lib/format'
import { useShop } from '../../lib/shop'
import { ButtonLink } from '../ui/Button'
import { SmartImage } from '../ui/SmartImage'

const ease = [0.22, 1, 0.36, 1] as const

export function Hero() {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const stampRotate = useTransform(scrollY, [0, 700], [0, reduce ? 0 : 110])
  const tagProduct = getProduct('coelhinho-de-algodao')
  const { openProduct } = useShop()

  const enter = (delay: number) => ({
    initial: { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease, delay },
  })

  return (
    <section id="inicio" aria-labelledby="hero-titulo" className="relative overflow-hidden">
      {/* fio decorativo que atravessa a hero */}
      <svg
        className="pointer-events-none absolute -left-10 bottom-0 hidden w-[115%] text-terracotta/55 lg:block"
        viewBox="0 0 1400 260"
        fill="none"
        aria-hidden="true"
      >
        <motion.path
          d="M0 230 C 220 250, 420 200, 600 215 S 800 120, 930 170 S 1150 260, 1250 120 C 1300 60, 1360 80, 1400 40"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: reduce ? 1 : 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.4, ease: [0.65, 0, 0.35, 1], delay: 0.4 }}
        />
      </svg>

      <div className="relative mx-auto grid max-w-[1320px] gap-12 px-4 pb-16 pt-8 sm:px-6 md:pt-12 lg:grid-cols-[1.02fr_1fr] lg:items-center lg:gap-8 lg:px-10 lg:pb-24">
        {/* Texto */}
        <div className="relative z-10 max-w-xl">
          <motion.p {...enter(0.05)} className="eyebrow inline-flex items-center gap-2">
            <Sparkle size={16} weight="fill" className="text-butter" aria-hidden="true" />
            {site.hero.eyebrow}
          </motion.p>
          <motion.h1
            id="hero-titulo"
            {...enter(0.12)}
            className="mt-5 text-[2.6rem] leading-[1.02] sm:text-6xl lg:text-[4.35rem]"
            style={{ fontVariationSettings: "'SOFT' 100, 'WONK' 1, 'opsz' 144" }}
          >
            Peças de crochê <em className="font-medium italic text-terracotta-deep">feitas à mão</em> para deixar a
            vida mais colorida.
          </motion.h1>
          <motion.p {...enter(0.2)} className="hand-note mt-4 -rotate-2 text-[1.75rem] text-sage-deep" aria-hidden="true">
            {site.hero.note}
          </motion.p>
          <motion.p {...enter(0.26)} className="mt-4 max-w-[34rem] text-lg leading-relaxed text-cocoa-mid">
            {site.hero.text}
          </motion.p>
          <motion.div {...enter(0.34)} className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink href="#produtos" size="lg" iconRight={<ArrowDown size={18} weight="bold" aria-hidden="true" className="transition-transform duration-200 group-hover/btn:translate-y-0.5" />}>
              {site.hero.primaryCta}
            </ButtonLink>
            <ButtonLink href="#personalizados" variant="secondary" size="lg">
              {site.hero.secondaryCta}
            </ButtonLink>
          </motion.div>
          <motion.ul
            {...enter(0.42)}
            className="mt-9 hidden flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-cocoa-mid sm:flex"
            aria-label="Destaques"
          >
            {['Fio 100% algodão', 'Pronta entrega e sob encomenda', 'Envio para todo o Brasil'].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-terracotta" aria-hidden="true" />
                {t}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Composição de produtos */}
        <div className="relative mx-auto w-full max-w-[560px] lg:max-w-none">
          <div className="relative grid grid-cols-[1.25fr_1fr] gap-3 sm:gap-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.15 }}
              className="row-span-2 overflow-hidden rounded-[999px_999px_32px_32px] bg-rose-soft shadow-lift"
            >
              <SmartImage
                asset={images.bunnyCarrot}
                width={640}
                aspect={0.68}
                sizes="(min-width: 1024px) 30vw, 55vw"
                priority
                className="aspect-[0.68] h-full w-full"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.28 }}
              className="mt-10 overflow-hidden rounded-[28px] bg-butter-soft shadow-soft"
            >
              <SmartImage
                asset={images.bagSpring}
                width={480}
                aspect={0.85}
                sizes="(min-width: 1024px) 22vw, 40vw"
                priority
                className="aspect-[0.85] w-full"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.38 }}
              className="overflow-hidden rounded-[28px_28px_120px_28px] bg-sage-soft shadow-soft"
            >
              <SmartImage
                asset={images.mushroomYarn}
                width={480}
                aspect={1}
                sizes="(min-width: 1024px) 22vw, 40vw"
                className="aspect-square w-full"
              />
            </motion.div>
          </div>

          {/* Selo giratório "feito à mão" */}
          <motion.div
            style={{ rotate: stampRotate }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease, delay: 0.7 }}
            className="absolute -left-3 top-[44%] grid size-28 place-items-center rounded-full bg-butter text-ink shadow-soft sm:-left-8 sm:size-32"
            aria-hidden="true"
          >
            <svg viewBox="0 0 120 120" className="absolute inset-0 size-full">
              <defs>
                <path id="selo-circulo" d="M60 60 m-44 0 a44 44 0 1 1 88 0 a44 44 0 1 1 -88 0" />
              </defs>
              <text className="fill-ink font-sans text-[11.5px] font-bold uppercase tracking-[0.26em]">
                <textPath href="#selo-circulo">feito à mão · com carinho · </textPath>
              </text>
              <circle cx="60" cy="60" r="31" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 4" />
            </svg>
            <span className="hand-note text-[1.6rem] leading-none text-terracotta-ink">100%</span>
          </motion.div>

          {/* Etiqueta de preço pendurada */}
          {tagProduct && (
            <motion.button
              type="button"
              onClick={() => openProduct(tagProduct.slug)}
              initial={{ opacity: 0, rotate: -14, y: -10 }}
              animate={{ opacity: 1, rotate: -6, y: 0 }}
              whileHover={reduce ? undefined : { rotate: -2 }}
              transition={{ type: 'spring', stiffness: 160, damping: 14, delay: 0.9 }}
              style={{ transformOrigin: '50% 0%' }}
              className="absolute bottom-[34%] right-2 origin-top rounded-[10px_10px_14px_14px] bg-ivory px-4 pb-3 pt-6 text-left shadow-paper ring-1 ring-sand-line sm:bottom-[38%] sm:right-[-14px]"
              aria-label={`Ver detalhes: ${tagProduct.name}, ${formatPrice(tagProduct.price)}`}
            >
              <span className="absolute left-1/2 top-2 size-2.5 -translate-x-1/2 rounded-full bg-cream ring-1 ring-cocoa/40" aria-hidden="true" />
              <span className="block text-[0.7rem] font-bold uppercase tracking-[0.14em] text-cocoa-mid">pronta entrega</span>
              <span className="mt-0.5 block font-display text-lg font-semibold text-cocoa">{tagProduct.name}</span>
              <span className="block text-sm font-semibold text-terracotta-deep">{formatPrice(tagProduct.price)}</span>
            </motion.button>
          )}
        </div>
      </div>
    </section>
  )
}
