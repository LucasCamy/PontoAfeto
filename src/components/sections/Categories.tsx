import { motion } from 'motion/react'
import { ArrowUpRight } from '@phosphor-icons/react'
import { categories, type Category } from '../../data/categories'
import { productsInCategory } from '../../data/products'
import { useShop } from '../../lib/shop'
import { SectionHeading } from '../ui/SectionHeading'
import { SmartImage } from '../ui/SmartImage'
import { staggerChild, staggerParent } from '../ui/motion'

const toneBg: Record<Category['tone'], string> = {
  rose: 'bg-rose-soft',
  butter: 'bg-butter-soft',
  sage: 'bg-sage-soft',
  lavender: 'bg-lavender-soft',
  sand: 'bg-sand',
  terracotta: 'bg-[#f6d9cd]',
}

export function Categories() {
  const { setCategory } = useShop()

  return (
    <section aria-labelledby="categorias-titulo" className="mx-auto max-w-[1320px] px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading id="categorias-titulo" eyebrow="Categorias" title="Por onde você quer começar?">
          Escolha uma categoria para filtrar a vitrine.
        </SectionHeading>
      </div>

      <motion.ul
        variants={staggerParent}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        className="no-scrollbar -mx-4 mt-10 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:scroll-px-6 sm:px-6 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 lg:gap-4 xl:grid-cols-6"
      >
        {categories.map((c, i) => {
          const count = productsInCategory(c.id).length
          return (
            <motion.li key={c.id} variants={staggerChild} className={`min-w-[44%] snap-start xs:min-w-[38%] md:min-w-0 ${i % 2 ? 'xl:mt-10' : ''}`}>
              <a
                href="#produtos"
                onClick={() => setCategory(c.id)}
                className={`group relative flex h-full flex-col rounded-[28px] p-2.5 pb-4 transition-[transform,box-shadow] duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:shadow-lift ${toneBg[c.tone]}`}
              >
                <span className="block overflow-hidden rounded-[999px_999px_20px_20px]">
                  <SmartImage
                    asset={c.image}
                    alt=""
                    width={360}
                    aspect={0.82}
                    sizes="(min-width: 1280px) 16vw, (min-width: 768px) 30vw, 42vw"
                    className="aspect-[0.82] w-full transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:scale-[1.04]"
                  />
                </span>
                <span className="mt-3 flex items-start justify-between gap-2 px-1.5">
                  <span>
                    <span className="block font-display text-xl font-semibold text-cocoa xl:text-[1.15rem] 2xl:text-xl" style={{ fontVariationSettings: "'SOFT' 100" }}>
                      {c.label}
                    </span>
                    <span className="mt-0.5 block text-sm leading-snug text-cocoa-mid">{c.blurb}</span>
                  </span>
                  <ArrowUpRight
                    size={20}
                    weight="bold"
                    className="mt-1 shrink-0 text-terracotta-deep transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
                <span className="mt-2 px-1.5 text-xs font-semibold text-cocoa-mid">
                  {count} {count === 1 ? 'peça' : 'peças'}
                </span>
              </a>
            </motion.li>
          )
        })}
      </motion.ul>
    </section>
  )
}
