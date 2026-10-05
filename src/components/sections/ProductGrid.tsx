import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { CaretDown } from '@phosphor-icons/react'
import { categories, type CategoryId } from '../../data/categories'
import { products, productsInCategory } from '../../data/products'
import { useShop } from '../../lib/shop'
import { Button } from '../ui/Button'
import { SectionHeading } from '../ui/SectionHeading'
import { ProductCard } from './ProductCard'

const INITIAL_VISIBLE = 8

const sortFeaturedFirst = <T extends { featured?: boolean; availability: string }>(list: T[]) =>
  [...list].sort((a, b) => {
    const score = (p: T) => (p.featured ? 0 : 1) + (p.availability === 'esgotado' ? 2 : 0)
    return score(a) - score(b)
  })

export function CategoryFilter({
  active,
  onChange,
}: {
  active: CategoryId | 'todos'
  onChange: (id: CategoryId | 'todos') => void
}) {
  const options: { id: CategoryId | 'todos'; label: string; count: number }[] = [
    { id: 'todos', label: 'Todos', count: products.length },
    ...categories.map((c) => ({ id: c.id, label: c.label, count: productsInCategory(c.id).length })),
  ]
  return (
    <div role="group" aria-label="Filtrar produtos por categoria" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 py-1 sm:-mx-6 sm:px-6 md:mx-0 md:flex-wrap md:px-0">
      {options.map((o) => {
        const isActive = active === o.id
        return (
          <button
            key={o.id}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(o.id)}
            className={`relative inline-flex h-11 shrink-0 items-center gap-2 rounded-full px-4 text-[0.95rem] font-semibold transition-colors duration-200 ${
              isActive ? 'text-cream' : 'text-cocoa ring-1 ring-inset ring-sand-line hover:bg-sand/70'
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="chip-ativo"
                className="absolute inset-0 rounded-full bg-cocoa"
                transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                aria-hidden="true"
              />
            )}
            <span className="relative">{o.label}</span>
            <span
              className={`relative rounded-full px-1.5 text-xs font-bold ${isActive ? 'bg-cream/20 text-cream' : 'bg-sand text-cocoa-mid'}`}
              aria-hidden="true"
            >
              {o.count}
            </span>
          </button>
        )
      })}
    </div>
  )
}

export function ProductGrid() {
  const { category, setCategory } = useShop()
  const [expanded, setExpanded] = useState(false)

  const list = useMemo(() => sortFeaturedFirst(productsInCategory(category)), [category])
  const showAll = expanded || category !== 'todos'
  const visible = showAll ? list : list.slice(0, INITIAL_VISIBLE)
  const label = category === 'todos' ? 'todas as categorias' : categories.find((c) => c.id === category)?.label

  return (
    <section id="produtos" aria-labelledby="produtos-titulo" className="relative bg-ivory py-20 lg:py-28">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <SectionHeading id="produtos-titulo" eyebrow="Vitrine do ateliê" title="Peças que saíram da agulha esta estação" note="toque no + para separar a sua">
            Peças de pronta entrega seguem em até 2 dias úteis. As sob encomenda são feitas para você, com as cores que escolher.
          </SectionHeading>
        </div>

        <div className="mt-8">
          <CategoryFilter
            active={category}
            onChange={(id) => {
              setCategory(id)
            }}
          />
          <p className="sr-only" aria-live="polite">
            Mostrando {list.length} {list.length === 1 ? 'peça' : 'peças'} em {label}.
          </p>
        </div>

        <motion.div layout className="mt-8 grid grid-cols-2 gap-x-3 gap-y-9 sm:gap-x-5 md:grid-cols-3 xl:grid-cols-4 xl:gap-x-6 xl:gap-y-12">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((p, i) => (
              <ProductCard key={p.id} product={p} priority={i < 2} />
            ))}
          </AnimatePresence>
        </motion.div>

        {!showAll && list.length > INITIAL_VISIBLE && (
          <div className="mt-12 flex justify-center">
            <Button
              variant="secondary"
              onClick={() => setExpanded(true)}
              iconRight={<CaretDown size={18} weight="bold" aria-hidden="true" />}
            >
              Ver mais {list.length - INITIAL_VISIBLE} peças
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
