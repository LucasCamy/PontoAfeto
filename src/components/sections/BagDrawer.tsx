import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Check, Minus, Plus, ShoppingBagOpen, Trash, WhatsappLogo, X } from '@phosphor-icons/react'
import { site } from '../../config/site'
import { getProduct } from '../../data/products'
import { formatPrice } from '../../lib/format'
import { useShop } from '../../lib/shop'
import { bagMessage, whatsappLink } from '../../lib/whatsapp'
import { Button, ButtonLink } from '../ui/Button'
import { Sheet } from '../ui/Sheet'
import { SmartImage } from '../ui/SmartImage'

/**
 * Sacola lateral. Não há checkout: o pedido é enviado como mensagem no
 * WhatsApp. Ponto de integração futura com carrinho de e-commerce.
 */
export function BagDrawer() {
  const { bagOpen, bagItems, bagTotal, dispatch } = useShop()
  const close = () => dispatch({ type: 'bag', open: false })
  const remaining = site.shipping.freeShippingFrom - bagTotal

  return (
    <Sheet open={bagOpen} onClose={close} side="right" labelledBy="sacola-titulo">
      <div className="flex items-center justify-between border-b border-dashed border-sand-line px-5 py-4">
        <h2 id="sacola-titulo" className="flex items-center gap-2 text-2xl">
          <ShoppingBagOpen size={26} weight="duotone" className="text-terracotta-deep" aria-hidden="true" />
          Sua sacola
        </h2>
        <button type="button" onClick={close} className="grid size-11 place-items-center rounded-full text-cocoa hover:bg-sand" aria-label="Fechar sacola">
          <X size={24} aria-hidden="true" />
        </button>
      </div>

      {bagItems.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
          <div className="stitch-texture grid size-28 place-items-center rounded-full bg-rose-soft">
            <ShoppingBagOpen size={44} weight="duotone" className="text-terracotta-deep" aria-hidden="true" />
          </div>
          <p className="mt-5 font-display text-2xl font-semibold text-cocoa">Sua sacola ainda está vazia</p>
          <p className="mt-2 text-cocoa-mid">Toque no + de uma peça para separá-la. Depois é só enviar o pedido pelo WhatsApp.</p>
          <ButtonLink href="#produtos" className="mt-6" onClick={close}>
            Ver produtos
          </ButtonLink>
        </div>
      ) : (
        <>
          <ul className="flex-1 divide-y divide-dashed divide-sand-line overflow-y-auto px-5">
            <AnimatePresence initial={false}>
              {bagItems.map((line, index) => (
                <motion.li
                  key={`${line.slug}-${line.color}`}
                  layout
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, transition: { duration: 0.18 } }}
                  className="flex gap-4 py-4"
                >
                  <SmartImage asset={line.product.image} width={160} aspect={4 / 5} sizes="80px" className="aspect-[4/5] w-20 shrink-0 rounded-2xl" alt="" />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <p className="font-display text-lg font-semibold leading-tight text-cocoa">{line.product.name}</p>
                    {line.color && <p className="text-sm text-cocoa-mid">Cor: {line.color}</p>}
                    <div className="mt-auto flex items-center justify-between gap-2 pt-2">
                      <div className="flex items-center rounded-full ring-1 ring-inset ring-sand-line" role="group" aria-label={`Quantidade de ${line.product.name}`}>
                        <button
                          type="button"
                          className="grid size-10 place-items-center rounded-full hover:bg-sand disabled:opacity-40"
                          aria-label="Diminuir"
                          disabled={line.quantity <= 1}
                          onClick={() => dispatch({ type: 'setQty', index, quantity: line.quantity - 1 })}
                        >
                          <Minus size={16} weight="bold" aria-hidden="true" />
                        </button>
                        <span className="w-5 text-center text-sm font-semibold">{line.quantity}</span>
                        <button
                          type="button"
                          className="grid size-10 place-items-center rounded-full hover:bg-sand"
                          aria-label="Aumentar"
                          onClick={() => dispatch({ type: 'setQty', index, quantity: line.quantity + 1 })}
                        >
                          <Plus size={16} weight="bold" aria-hidden="true" />
                        </button>
                      </div>
                      <span className="font-semibold">{formatPrice(line.product.price * line.quantity)}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="grid size-10 shrink-0 place-items-center self-start rounded-full text-cocoa-mid hover:bg-rose-soft hover:text-error"
                    aria-label={`Remover ${line.product.name}`}
                    onClick={() => dispatch({ type: 'remove', index })}
                  >
                    <Trash size={18} aria-hidden="true" />
                  </button>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>

          <div className="border-t border-dashed border-sand-line bg-cream px-5 pb-6 pt-4">
            <p className="text-sm text-cocoa-mid">
              {remaining > 0
                ? `Faltam ${formatPrice(remaining)} para o frete grátis.`
                : 'Seu pedido ganhou frete grátis.'}
            </p>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-sand" aria-hidden="true">
              <div
                className="h-full origin-left rounded-full bg-sage-deep transition-transform duration-500 ease-[var(--ease-out-soft)]"
                style={{ transform: `scaleX(${Math.min(1, bagTotal / site.shipping.freeShippingFrom)})` }}
              />
            </div>
            <div className="mt-4 flex items-baseline justify-between">
              <span className="font-semibold">Subtotal</span>
              <span className="text-2xl font-bold">{formatPrice(bagTotal)}</span>
            </div>
            <ButtonLink
              href={whatsappLink(
                bagMessage(bagItems.map((l) => ({ name: l.product.name, quantity: l.quantity, price: l.product.price, color: l.color }))),
              )}
              variant="whatsapp"
              size="lg"
              className="mt-4 w-full"
              icon={<WhatsappLogo size={22} weight="fill" aria-hidden="true" />}
            >
              Finalizar pelo WhatsApp
            </ButtonLink>
            <p className="mt-3 text-center text-xs text-cocoa-mid">
              Você confirma frete e pagamento direto com a artesã.
            </p>
            <div className="mt-1 text-center">
              <Button variant="ghost" size="sm" onClick={() => dispatch({ type: 'clear' })}>
                Esvaziar sacola
              </Button>
            </div>
          </div>
        </>
      )}
    </Sheet>
  )
}

/** Aviso discreto quando um item entra na sacola. */
export function BagToast() {
  const { lastAdded, dispatch } = useShop()
  const [dismissedTick, setDismissedTick] = useState(0)
  const visible = !!lastAdded && lastAdded.tick !== dismissedTick

  useEffect(() => {
    if (!lastAdded) return
    const t = setTimeout(() => setDismissedTick(lastAdded.tick), 3200)
    return () => clearTimeout(t)
  }, [lastAdded])

  const product = lastAdded ? getProduct(lastAdded.slug) : undefined

  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 top-20 z-[65] flex justify-center px-4">
      <AnimatePresence>
        {visible && product && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.16 } }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto flex items-center gap-3 rounded-full bg-cocoa py-2 pl-2 pr-2 text-cream shadow-lift"
          >
            <span className="grid size-8 place-items-center rounded-full bg-sage-deep">
              <Check size={16} weight="bold" aria-hidden="true" />
            </span>
            <span className="text-sm">
              <strong className="font-semibold">{product.name}</strong> na sacola
            </span>
            <button
              type="button"
              onClick={() => {
                if (lastAdded) setDismissedTick(lastAdded.tick)
                dispatch({ type: 'bag', open: true })
              }}
              className="h-9 rounded-full bg-cream/15 px-3.5 text-sm font-semibold hover:bg-cream/25"
            >
              Ver sacola
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
