import { describe, expect, it } from 'vitest'
import { emptyOrder, maskPhone, minDesiredDate, orderSummaryMessage, validateOrder, type CustomOrder } from '../lib/customOrder'
import { bagMessage, whatsappLink } from '../lib/whatsapp'
import { formatPrice } from '../lib/format'

const today = new Date('2026-10-05T12:00:00Z')

const valid: CustomOrder = {
  ...emptyOrder,
  pieceType: 'Amigurumi',
  colors: ['Sálvia'],
  size: 'M',
  name: 'Marina Duarte',
  whatsapp: '(11) 91234-5678',
}

describe('whatsapp', () => {
  it('gera link wa.me só com dígitos e mensagem codificada', () => {
    const link = whatsappLink('Olá & tudo bem?', '+55 (11) 90000-0000')
    expect(link).toBe('https://wa.me/5511900000000?text=Ol%C3%A1%20%26%20tudo%20bem%3F')
  })

  it('monta o pedido da sacola com total', () => {
    const msg = bagMessage([
      { name: 'Gatinho Mingau', quantity: 2, price: 119, color: 'Cru' },
      { name: 'Chaveiro Cogumelo', quantity: 1, price: 39 },
    ])
    expect(msg).toContain('2× Gatinho Mingau (cor: Cru)')
    expect(msg).toContain(`Total: ${formatPrice(277)}`)
  })
})

describe('encomenda personalizada', () => {
  it('aceita uma ficha completa', () => {
    expect(validateOrder(valid, today)).toEqual({})
  })

  it('aponta campos obrigatórios com mensagens claras', () => {
    const errors = validateOrder(emptyOrder, today)
    expect(Object.keys(errors).sort()).toEqual(['colors', 'name', 'pieceType', 'size', 'whatsapp'])
    expect(errors.whatsapp).toMatch(/DDD/)
  })

  it('recusa data antes do prazo mínimo', () => {
    const errors = validateOrder({ ...valid, desiredDate: '2026-10-08' }, today)
    expect(errors.desiredDate).toMatch(/7 dias/)
    expect(validateOrder({ ...valid, desiredDate: minDesiredDate(today) }, today).desiredDate).toBeUndefined()
  })

  it('recusa arquivo que não é imagem ou é grande demais', () => {
    const pdf = new File(['x'], 'ref.pdf', { type: 'application/pdf' })
    expect(validateOrder({ ...valid, reference: pdf }, today).reference).toMatch(/imagem/)
    const big = new File([new Uint8Array(9 * 1024 * 1024)], 'ref.jpg', { type: 'image/jpeg' })
    expect(validateOrder({ ...valid, reference: big }, today).reference).toMatch(/MB/)
  })

  it('aplica máscara de telefone', () => {
    expect(maskPhone('11912345678')).toBe('(11) 91234-5678')
    expect(maskPhone('1134567890')).toBe('(11) 3456-7890')
    expect(maskPhone('11')).toBe('(11')
  })

  it('resume a ficha para o WhatsApp sem linhas vazias', () => {
    const msg = orderSummaryMessage({ ...valid, personalization: 'Helena' }, 'PA-12345')
    expect(msg).toContain('PA-12345')
    expect(msg).toContain('Nome/inicial: Helena')
    expect(msg).not.toContain('Tema:')
  })
})
