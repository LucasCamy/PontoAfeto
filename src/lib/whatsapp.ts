import { site } from '../config/site'
import { formatPrice } from './format'

/** Monta o link do WhatsApp com mensagem pré-preenchida. */
export function whatsappLink(message: string = site.whatsappMessages.general, phone: string = site.contact.whatsapp) {
  const digits = phone.replace(/\D/g, '')
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
}

export interface OrderLine {
  name: string
  quantity: number
  price: number
  color?: string
}

/** Mensagem de pedido a partir da sacola (sem checkout real). */
export function bagMessage(lines: OrderLine[]) {
  const items = lines
    .map((l) => `• ${l.quantity}× ${l.name}${l.color ? ` (cor: ${l.color})` : ''} — ${formatPrice(l.price * l.quantity)}`)
    .join('\n')
  const total = lines.reduce((sum, l) => sum + l.price * l.quantity, 0)
  return `Olá! Quero fazer este pedido pelo site:\n\n${items}\n\nTotal: ${formatPrice(total)} (sem frete)\n\nPode me passar o frete e as formas de pagamento?`
}

export function productMessage(name: string, color?: string) {
  return `Olá! Tenho interesse na peça "${name}"${color ? ` na cor ${color}` : ''}. Ela está disponível?`
}
