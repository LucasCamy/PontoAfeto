import { useState } from 'react'
import { ShoppingBagOpen, WhatsappLogo } from '@phosphor-icons/react'
import { getProduct, spotlightProductSlug } from '../../data/products'
import { pluralDays } from '../../lib/format'
import { useShop } from '../../lib/shop'
import { productMessage, whatsappLink } from '../../lib/whatsapp'
import { Button, ButtonLink } from '../ui/Button'
import { ColorSwatches } from '../ui/ColorSwatches'
import { Reveal } from '../ui/Reveal'
import { SmartImage } from '../ui/SmartImage'
import { Price } from './ProductCard'

export function FeaturedProduct() {
  const product = getProduct(spotlightProductSlug)
  const { addToBag } = useShop()
  const [color, setColor] = useState(product?.colors[0]?.name ?? '')
  if (!product) return null
  const detail = product.gallery[1]

  return (
    <section aria-labelledby="destaque-titulo" className="relative overflow-hidden bg-sage-soft py-20 lg:py-28">
      <div className="stitch-texture pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-[1320px] gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16 lg:px-10">
        <Reveal className="relative mx-auto w-full max-w-[540px]">
          <div className="overflow-hidden rounded-[999px_999px_36px_36px] bg-butter-soft shadow-lift">
            <SmartImage asset={product.image} width={720} aspect={0.8} sizes="(min-width: 1024px) 42vw, 92vw" className="aspect-[0.8] w-full" />
          </div>
          {detail && (
            <div className="absolute -bottom-6 -right-2 w-[38%] rotate-3 overflow-hidden rounded-[22px] border-[6px] border-ivory shadow-lift sm:-right-8">
              <SmartImage asset={detail} width={320} aspect={1} sizes="200px" className="aspect-square w-full" />
            </div>
          )}
          {/* selo de exclusividade */}
          <div className="absolute -left-2 top-8 grid size-24 -rotate-12 place-items-center rounded-full bg-terracotta-deep text-center text-white shadow-soft sm:-left-6 sm:size-28">
            <span className="px-3 text-[0.68rem] font-bold uppercase leading-tight tracking-[0.1em]">
              Edição
              <span className="hand-note block text-[1.7rem] normal-case tracking-normal">limitada</span>
              {/* DEMONSTRATIVO */}
              12 peças
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="max-w-xl">
          <p className="eyebrow">Peça da estação</p>
          <h2 id="destaque-titulo" className="mt-3 text-[2.4rem] sm:text-6xl" style={{ fontVariationSettings: "'SOFT' 100, 'WONK' 1" }}>
            {product.name}
          </h2>
          <p className="mt-5 font-display text-xl italic leading-relaxed text-cocoa" style={{ fontVariationSettings: "'SOFT' 100" }}>
            “Queria uma bolsa que parecesse um jardim no fim da tarde. Foram três semanas testando combinações até chegar
            nestes quadradinhos.”
          </p>
          <p className="mt-4 leading-relaxed text-cocoa-mid">{product.details}</p>

          <dl className="mt-7 grid grid-cols-1 overflow-hidden rounded-2xl bg-ivory text-sm shadow-soft xs:grid-cols-3">
            {[
              { k: 'Produção', v: `cerca de ${pluralDays(product.productionDays)}` },
              { k: 'Medidas', v: product.dimensions },
              { k: 'Materiais', v: 'Algodão mercerizado e forro de tricoline' },
            ].map((item, i) => (
              <div key={item.k} className={`p-4 ${i > 0 ? 'border-t border-dashed border-sand-line xs:border-l xs:border-t-0' : ''}`}>
                <dt className="text-[0.72rem] font-bold uppercase tracking-[0.12em] text-cocoa-mid">{item.k}</dt>
                <dd className="mt-1 font-semibold leading-snug text-ink">{item.v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-7">
            <ColorSwatches
              legend="Combinação de cores"
              name="cor-destaque"
              colors={product.colors}
              selected={[color]}
              onToggle={setColor}
            />
          </div>

          <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Price product={product} size="lg" />
          </div>
          <div className="mt-4 flex flex-col gap-3 xs:flex-row">
            <Button
              size="lg"
              icon={<ShoppingBagOpen size={22} weight="duotone" aria-hidden="true" />}
              onClick={() => addToBag(product.slug, color)}
            >
              Adicionar à sacola
            </Button>
            <ButtonLink
              href={whatsappLink(productMessage(product.name, color))}
              variant="secondary"
              size="lg"
              icon={<WhatsappLogo size={22} aria-hidden="true" />}
            >
              Encomendar
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
