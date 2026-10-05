/**
 * ENCOMENDA PERSONALIZADA — validação e envio
 * ------------------------------------------------------------------
 * SIMULAÇÃO: não existe backend neste projeto. `submitCustomOrder`
 * apenas aguarda um instante e devolve um número de protocolo local.
 * Para integrar de verdade, substitua o corpo da função por uma chamada
 * ao seu serviço (Formspree, e-mail transacional, CRM, API própria...).
 * A interface `CustomOrder` já descreve o payload esperado.
 */
import { site } from '../config/site'

export interface CustomOrder {
  pieceType: string
  colors: string[]
  size: 'P' | 'M' | 'G' | ''
  personalization: string
  theme: string
  desiredDate: string
  notes: string
  reference: File | null
  name: string
  whatsapp: string
}

export type CustomOrderErrors = Partial<Record<keyof CustomOrder, string>>

export const emptyOrder: CustomOrder = {
  pieceType: '',
  colors: [],
  size: '',
  personalization: '',
  theme: '',
  desiredDate: '',
  notes: '',
  reference: null,
  name: '',
  whatsapp: '',
}

export const pieceTypes = ['Amigurumi', 'Bolsa', 'Flores / decoração', 'Chaveiro', 'Kit presente', 'Outra ideia']

export const MAX_REFERENCE_MB = 8
export const MIN_LEAD_DAYS = 7

/** Data mínima aceita (hoje + prazo mínimo), formato yyyy-mm-dd */
export function minDesiredDate(today = new Date()) {
  const d = new Date(today)
  d.setDate(d.getDate() + MIN_LEAD_DAYS)
  return d.toISOString().slice(0, 10)
}

export function validateOrder(order: CustomOrder, today = new Date()): CustomOrderErrors {
  const errors: CustomOrderErrors = {}

  if (!order.pieceType) errors.pieceType = 'Escolha o tipo de peça que você imaginou.'
  if (order.colors.length === 0) errors.colors = 'Escolha pelo menos uma cor (pode mudar depois).'
  if (!order.size) errors.size = 'Escolha um tamanho aproximado.'
  if (order.personalization.length > 20)
    errors.personalization = 'Use até 20 caracteres para o nome ou inicial.'

  if (order.desiredDate && order.desiredDate < minDesiredDate(today))
    errors.desiredDate = `Precisamos de pelo menos ${MIN_LEAD_DAYS} dias para produzir. Escolha uma data a partir de ${formatDate(minDesiredDate(today))}.`

  if (order.reference && order.reference.size > MAX_REFERENCE_MB * 1024 * 1024)
    errors.reference = `A imagem precisa ter até ${MAX_REFERENCE_MB} MB.`
  if (order.reference && !order.reference.type.startsWith('image/'))
    errors.reference = 'Envie uma imagem (JPG, PNG ou WEBP).'

  if (order.name.trim().length < 2) errors.name = 'Conte pra gente como podemos te chamar.'

  const digits = order.whatsapp.replace(/\D/g, '')
  if (digits.length < 10 || digits.length > 11)
    errors.whatsapp = 'Informe o WhatsApp com DDD, por exemplo (11) 91234-5678.'

  return errors
}

export function formatDate(iso: string) {
  const [y, m, d] = iso.split('-')
  return `${d}/${m}/${y}`
}

/** Máscara simples de telefone brasileiro */
export function maskPhone(value: string) {
  const d = value.replace(/\D/g, '').slice(0, 11)
  if (d.length <= 2) return d.length ? `(${d}` : ''
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}

export function orderSummaryMessage(order: CustomOrder, protocol: string) {
  const details = [
    `Peça: ${order.pieceType}`,
    `Cores: ${order.colors.join(', ')}`,
    `Tamanho: ${order.size}`,
    order.personalization && `Nome/inicial: ${order.personalization}`,
    order.theme && `Tema: ${order.theme}`,
    order.desiredDate && `Para quando: ${formatDate(order.desiredDate)}`,
    order.notes && `Observações: ${order.notes}`,
    order.reference && 'Tenho uma imagem de referência para enviar aqui.',
  ].filter(Boolean)
  return [
    `Olá! Acabei de preencher a ficha de encomenda no site (${protocol}).`,
    details.join('\n'),
    `Meu nome é ${order.name.trim()}.`,
  ].join('\n\n')
}

/** SIMULAÇÃO de envio — trocar pela integração real. */
export async function submitCustomOrder(order: CustomOrder): Promise<{ protocol: string }> {
  void order
  await new Promise((r) => setTimeout(r, 900))
  const protocol = `PA-${Date.now().toString().slice(-5)}`
  if (site.isDemo) console.info('[demo] Encomenda simulada — nenhum dado foi enviado.', protocol)
  return { protocol }
}

/**
 * Pré-preenche a ficha de encomenda a partir de outro ponto da página
 * (ex.: botão "Personalizar esta peça" no detalhe do produto).
 */
export const PREFILL_EVENT = 'encomenda:prefill'

export function requestCustomPrefill(detail: Partial<Pick<CustomOrder, 'pieceType' | 'notes' | 'colors'>>) {
  window.dispatchEvent(new CustomEvent(PREFILL_EVENT, { detail }))
}

/** Tipo de peça sugerido para cada categoria do catálogo */
export const pieceTypeByCategory: Record<string, string> = {
  amigurumis: 'Amigurumi',
  personalizados: 'Amigurumi',
  bolsas: 'Bolsa',
  decoracao: 'Flores / decoração',
  presentes: 'Chaveiro',
  kits: 'Kit presente',
}
