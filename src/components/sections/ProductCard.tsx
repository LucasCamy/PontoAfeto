import { forwardRef } from 'react'
import { motion } from 'motion/react'
import { BellRinging, Plus, Scissors } from '@phosphor-icons/react'
import { categoryLabel } from '../../data/categories'
import { availabilityLabel, type Product } from '../../data/products'
import { formatPrice } from '../../lib/format'
import { useShop } from '../../lib/shop'
import { whatsappLink } from '../../lib/whatsapp'
import { Badge } from '../ui/Badge'
import { SmartImage } from '../ui/SmartImage'

export function Price({ product, size = 'md' }: { product: Product; size?: 'md' | 'lg' }) {
  return (
    <p className="flex flex-wrap items-baseline gap-x-2">
      {product.priceFrom && <span className="text-xs font-semibold text-cocoa-mid">a partir de</span>}
      <span className={`font-bold text-ink ${size === 'lg' ? 'text-2xl' : 'text-[1.05rem]'}`}>{formatPrice(product.price)}</span>
      {product.compareAtPrice && (
        <span className="text-sm text-cocoa-mid line-through">
          <span className="sr-only">antes </span>
          {formatPrice(product.compareAtPrice)}
        </span>
      )}
    </p>
  )
}

export const ProductCard = forwardRef<HTMLElement, { product: Product; priority?: boolean }>(function ProductCard(
  { product, priority },
  ref,
) {
  const { openProduct, addToBag } = useShop()
  const soldOut = product.availability === 'esgotado'
  const onDemand = product.availability === 'sob-encomenda'
  const secondary = product.gallery.find((g) => g.src !== product.image.src)

  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.18 } }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="group/card relative flex flex-col"
      aria-labelledby={`produto-${product.id}`}
    >
      <div className="relative overflow-hidden rounded-[22px] bg-sand sm:rounded-[26px]">
        <button
          type="button"
          onClick={() => openProduct(product.slug)}
          className="block w-full rounded-[inherit]"
          aria-label={`Ver detalhes de ${product.name}`}
          tabIndex={-1}
        >
          <SmartImage
            asset={product.image}
            width={520}
            aspect={4 / 5}
            sizes="(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 46vw"
            priority={priority}
            className={`aspect-[4/5] w-full transition-[transform,filter] duration-700 ease-[var(--ease-out-soft)] group-hover/card:scale-[1.035] ${
              soldOut ? 'grayscale-[45%] opacity-80' : ''
            }`}
          />
          {secondary && !soldOut && (
            <SmartImage
              asset={secondary}
              alt=""
              width={520}
              aspect={4 / 5}
              sizes="(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 46vw"
              className="absolute inset-0 aspect-[4/5] w-full opacity-0 transition-opacity duration-500 ease-[var(--ease-out-soft)] [@media(hover:hover)]:group-hover/card:opacity-100"
            />
          )}
        </button>

        <div className="pointer-events-none absolute left-2.5 top-2.5 flex flex-col items-start gap-1.5 sm:left-3 sm:top-3">
          {soldOut ? (
            <Badge tone="muted">Esgotado</Badge>
          ) : (
            product.badge && <Badge tone={onDemand ? 'lavender' : 'butter'}>{product.badge}</Badge>
          )}
          {product.compareAtPrice && !soldOut && <Badge tone="rose">Oferta</Badge>}
        </div>

        {/* Ação rápida */}
        {soldOut ? (
          <a
            href={whatsappLink(`Olá! A peça "${product.name}" está esgotada. Consigo encomendar uma igual?`)}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-2.5 right-2.5 inline-flex h-11 items-center gap-1.5 rounded-full bg-ivory px-3.5 text-sm font-semibold text-cocoa shadow-soft transition-colors hover:bg-white sm:bottom-3 sm:right-3"
          >
            <BellRinging size={18} aria-hidden="true" />
            <span className="hidden xs:inline">Encomendar igual</span>
            <span className="xs:hidden">Encomendar</span>
            <span className="sr-only"> — {product.name} (abre o WhatsApp)</span>
          </a>
        ) : onDemand ? (
          <button
            type="button"
            onClick={() => openProduct(product.slug)}
            className="absolute bottom-2.5 right-2.5 inline-flex h-11 items-center gap-1.5 rounded-full bg-ivory px-3.5 text-sm font-semibold text-cocoa shadow-soft transition-[background-color,transform] duration-200 hover:bg-white active:scale-95 sm:bottom-3 sm:right-3"
          >
            <Scissors size={18} aria-hidden="true" />
            Personalizar
            <span className="sr-only"> {product.name}</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => addToBag(product.slug, product.colors[0]?.name)}
            className="absolute bottom-2.5 right-2.5 grid size-11 place-items-center rounded-full bg-ivory text-cocoa shadow-soft transition-[background-color,color,transform] duration-200 hover:bg-terracotta-deep hover:text-white active:scale-90 sm:bottom-3 sm:right-3 sm:size-12"
            aria-label={`Adicionar ${product.name} à sacola`}
          >
            <Plus size={20} weight="bold" aria-hidden="true" />
          </button>
        )}
      </div>

      <div className="flex flex-1 flex-col px-1 pt-3.5">
        <p className="text-[0.7rem] font-bold uppercase leading-snug tracking-[0.07em] text-cocoa-mid sm:text-[0.72rem] sm:tracking-[0.12em]">
          {categoryLabel(product.category)}
          <span aria-hidden="true"> · </span>
          <span className={soldOut ? 'text-error' : onDemand ? 'text-[#4b4270]' : 'text-sage-ink'}>
            {availabilityLabel[product.availability]}
          </span>
        </p>
        <h3
          id={`produto-${product.id}`}
          className="mt-1.5 font-display text-[1.12rem] font-semibold leading-snug sm:text-xl"
          style={{ fontVariationSettings: "'SOFT' 100" }}
        >
          <button
            type="button"
            onClick={() => openProduct(product.slug)}
            className="text-left decoration-terracotta decoration-2 underline-offset-4 hover:underline"
          >
            {product.name}
          </button>
        </h3>
        <p className="mt-1.5 line-clamp-2 hidden text-[0.94rem] leading-relaxed text-cocoa-mid sm:block">{product.description}</p>
        <div className="mt-auto flex items-end justify-between gap-2 pt-3">
          <Price product={product} />
          <button
            type="button"
            onClick={() => openProduct(product.slug)}
            className="hidden h-10 shrink-0 items-center rounded-full px-3 text-sm font-semibold text-terracotta-ink underline decoration-dashed decoration-1 underline-offset-4 transition-colors hover:bg-rose-soft sm:inline-flex"
          >
            Detalhes
            <span className="sr-only"> de {product.name}</span>
          </button>
        </div>
      </div>
    </motion.article>
  )
})
