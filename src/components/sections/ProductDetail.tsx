import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Clock, Minus, Plus, Ruler, ShoppingBagOpen, Sparkle, WhatsappLogo, X } from '@phosphor-icons/react'
import { categoryLabel } from '../../data/categories'
import { availabilityLabel, getProduct, type Product } from '../../data/products'
import { pieceTypeByCategory, requestCustomPrefill } from '../../lib/customOrder'
import { pluralDays } from '../../lib/format'
import { useShop } from '../../lib/shop'
import { productMessage, whatsappLink } from '../../lib/whatsapp'
import { Badge } from '../ui/Badge'
import { Button, ButtonLink } from '../ui/Button'
import { ColorSwatches } from '../ui/ColorSwatches'
import { Sheet } from '../ui/Sheet'
import { SmartImage } from '../ui/SmartImage'
import { Price } from './ProductCard'

/** Diálogo de detalhe do produto, controlado por `openSlug` da loja. */
export function ProductDetail() {
  const { openSlug, openProduct } = useShop()
  const product = openSlug ? getProduct(openSlug) : undefined

  return (
    <Sheet open={!!product} onClose={() => openProduct(null)} labelledBy="detalhe-titulo">
      {product && <DetailBody key={product.slug} product={product} onClose={() => openProduct(null)} />}
    </Sheet>
  )
}

function DetailBody({ product, onClose }: { product: Product; onClose: () => void }) {
  const { addToBag, dispatch } = useShop()
  const [imageIndex, setImageIndex] = useState(0)
  const [color, setColor] = useState(product.colors[0]?.name ?? '')
  const [qty, setQty] = useState(1)
  const soldOut = product.availability === 'esgotado'
  const onDemand = product.availability === 'sob-encomenda'
  const image = product.gallery[imageIndex] ?? product.image

  const personalize = () => {
    onClose()
    requestCustomPrefill({
      pieceType: pieceTypeByCategory[product.category] ?? 'Outra ideia',
      colors: color ? [color] : [],
      notes: `Quero uma peça como "${product.name}".`,
    })
  }
  const addAndOpenBag = () => {
    addToBag(product.slug, color, qty)
    onClose()
    dispatch({ type: 'bag', open: true })
  }
  const soldOutLink = whatsappLink(`Olá! Quero encomendar uma peça igual à "${product.name}", que está esgotada.`)

  return (
    <div className="grid min-h-0 flex-1 overflow-y-auto md:grid-cols-[1.05fr_1fr] md:overflow-hidden">
      {/* Galeria */}
      <div className="relative bg-sand md:min-h-0">
        <div className="relative aspect-[4/4.2] overflow-hidden md:aspect-auto md:h-full">
          <AnimatePresence initial={false} mode="popLayout">
            <motion.div
              key={image.src}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="absolute inset-0"
            >
              <SmartImage asset={image} width={900} aspect={0.95} sizes="(min-width: 768px) 50vw, 100vw" className="size-full" />
            </motion.div>
          </AnimatePresence>
        </div>
        {product.gallery.length > 1 && (
          <div className="absolute bottom-3 left-3 flex gap-2" role="group" aria-label="Fotos do produto">
            {product.gallery.map((g, i) => (
              <button
                key={g.src}
                type="button"
                onClick={() => setImageIndex(i)}
                aria-pressed={i === imageIndex}
                aria-label={`Foto ${i + 1} de ${product.gallery.length}`}
                className={`size-14 overflow-hidden rounded-xl ring-2 transition-[box-shadow,opacity] ${
                  i === imageIndex ? 'ring-ivory' : 'opacity-75 ring-transparent hover:opacity-100'
                }`}
              >
                <SmartImage asset={g} alt="" width={120} aspect={1} sizes="56px" className="size-full" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Informações */}
      <div className="flex min-h-0 flex-col md:overflow-y-auto">
        <div className="sticky top-0 z-10 flex items-center justify-between gap-3 bg-ivory/95 px-5 pb-2 pt-4 backdrop-blur sm:px-8">
          <p className="text-[0.75rem] font-bold uppercase tracking-[0.12em] text-cocoa-mid">
            {categoryLabel(product.category)} · {availabilityLabel[product.availability]}
          </p>
          <button
            type="button"
            onClick={onClose}
            className="grid size-11 place-items-center rounded-full text-cocoa hover:bg-sand"
            aria-label="Fechar detalhes do produto"
          >
            <X size={24} aria-hidden="true" />
          </button>
        </div>

        <div className="px-5 pb-8 sm:px-8">
          <div className="flex flex-wrap gap-2">
            {soldOut && <Badge tone="muted">Esgotado</Badge>}
            {product.badge && <Badge tone={onDemand ? 'lavender' : 'butter'}>{product.badge}</Badge>}
          </div>
          <h2 id="detalhe-titulo" className="mt-3 text-[2rem] sm:text-4xl" style={{ fontVariationSettings: "'SOFT' 100, 'WONK' 1" }}>
            {product.name}
          </h2>
          <div className="mt-3">
            <Price product={product} size="lg" />
            <p className="mt-1 text-sm text-cocoa-mid">Pix, cartão em até 3x ou boleto · frete calculado pelo CEP</p>
          </div>

          <p className="mt-5 text-[1.02rem] leading-relaxed text-ink">{product.description}</p>
          <p className="mt-3 leading-relaxed text-cocoa-mid">{product.details}</p>

          <dl className="mt-6 grid grid-cols-1 gap-3 rounded-2xl bg-cream p-4 text-sm xs:grid-cols-2">
            <div className="flex gap-2.5">
              <Clock size={20} className="mt-0.5 shrink-0 text-terracotta-deep" aria-hidden="true" />
              <div>
                <dt className="font-semibold text-ink">{soldOut || onDemand ? 'Produção' : 'Pronta entrega'}</dt>
                <dd className="text-cocoa-mid">
                  {soldOut || onDemand ? `${pluralDays(product.productionDays)}` : 'envio em até 2 dias úteis'}
                </dd>
              </div>
            </div>
            <div className="flex gap-2.5">
              <Ruler size={20} className="mt-0.5 shrink-0 text-terracotta-deep" aria-hidden="true" />
              <div>
                <dt className="font-semibold text-ink">Medidas</dt>
                <dd className="text-cocoa-mid">{product.dimensions}</dd>
              </div>
            </div>
            <div className="flex gap-2.5 xs:col-span-2">
              <Sparkle size={20} className="mt-0.5 shrink-0 text-terracotta-deep" aria-hidden="true" />
              <div>
                <dt className="font-semibold text-ink">Materiais</dt>
                <dd className="text-cocoa-mid">{product.materials}</dd>
              </div>
            </div>
          </dl>

          {!soldOut && (
            <div className="mt-6">
              <ColorSwatches
                legend="Cor"
                name={`cor-${product.slug}`}
                colors={product.colors}
                selected={color ? [color] : []}
                onToggle={setColor}
              />
            </div>
          )}

          <div className="mt-6 flex flex-col gap-3">
            {soldOut ? (
              <>
                <p className="rounded-2xl bg-rose-soft p-4 text-sm text-terracotta-ink">
                  Esta peça esgotou, mas dá para encomendar uma igual (ou parecida) com prazo de {pluralDays(product.productionDays)}.
                </p>
                <ButtonLink
                  href={soldOutLink}
                  variant="whatsapp"
                  size="lg"
                  icon={<WhatsappLogo size={22} weight="fill" aria-hidden="true" />}
                >
                  Encomendar uma igual
                </ButtonLink>
              </>
            ) : onDemand ? (
              <>
                <ButtonLink href="#personalizados" size="lg" onClick={personalize}>
                  Personalizar esta peça
                </ButtonLink>
                <ButtonLink
                  href={whatsappLink(productMessage(product.name, color))}
                  variant="secondary"
                  size="lg"
                  icon={<WhatsappLogo size={22} aria-hidden="true" />}
                >
                  Tirar dúvidas no WhatsApp
                </ButtonLink>
              </>
            ) : (
              <>
                <div className="flex gap-3">
                  <div className="flex h-14 items-center rounded-full ring-1 ring-inset ring-sand-line" role="group" aria-label="Quantidade">
                    <button
                      type="button"
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      className="grid size-12 place-items-center rounded-full text-cocoa hover:bg-sand disabled:opacity-40"
                      aria-label="Diminuir quantidade"
                      disabled={qty <= 1}
                    >
                      <Minus size={18} weight="bold" aria-hidden="true" />
                    </button>
                    <output className="w-6 text-center font-semibold" aria-live="polite">
                      {qty}
                    </output>
                    <button
                      type="button"
                      onClick={() => setQty((q) => Math.min(20, q + 1))}
                      className="grid size-12 place-items-center rounded-full text-cocoa hover:bg-sand"
                      aria-label="Aumentar quantidade"
                    >
                      <Plus size={18} weight="bold" aria-hidden="true" />
                    </button>
                  </div>
                  <Button
                    size="lg"
                    className="flex-1"
                    icon={<ShoppingBagOpen size={22} weight="duotone" aria-hidden="true" />}
                    onClick={addAndOpenBag}
                  >
                    Adicionar à sacola
                  </Button>
                </div>
                <ButtonLink
                  href={whatsappLink(productMessage(product.name, color))}
                  variant="secondary"
                  size="lg"
                  icon={<WhatsappLogo size={22} aria-hidden="true" />}
                >
                  Comprar direto pelo WhatsApp
                </ButtonLink>
              </>
            )}
          </div>

          <p className="mt-6 border-t border-dashed border-sand-line pt-4 text-sm text-cocoa-mid">
            Cuidados: lavar à mão com água fria e sabão neutro, secar à sombra. Cada peça é única — pequenas variações de
            cor e tamanho fazem parte do feito à mão.
          </p>
        </div>

        {/* Barra de ação fixa no mobile: preço e ação principal sempre à mão */}
        <div className="sticky bottom-0 z-10 mt-auto flex items-center gap-3 border-t border-dashed border-sand-line bg-ivory/95 px-5 py-3 backdrop-blur md:hidden">
          <div className="min-w-0 flex-1">
            <Price product={product} />
          </div>
          {soldOut ? (
            <ButtonLink href={soldOutLink} variant="whatsapp" icon={<WhatsappLogo size={20} weight="fill" aria-hidden="true" />}>
              Encomendar
            </ButtonLink>
          ) : onDemand ? (
            <ButtonLink href="#personalizados" onClick={personalize}>
              Personalizar
            </ButtonLink>
          ) : (
            <Button onClick={addAndOpenBag} icon={<ShoppingBagOpen size={20} weight="duotone" aria-hidden="true" />}>
              Adicionar
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
