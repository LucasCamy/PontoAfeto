import { describe, expect, it } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FAQ } from '../components/sections/FAQ'
import { ProductGrid } from '../components/sections/ProductGrid'
import { CustomOrderForm } from '../components/sections/CustomOrderForm'
import { ShopProvider } from '../lib/shop'
import { productsInCategory } from '../data/products'

describe('FAQ', () => {
  it('abre e fecha respostas com aria-expanded', async () => {
    const user = userEvent.setup()
    render(<FAQ />)
    const q = screen.getByRole('button', { name: 'Qual o prazo de produção?' })
    expect(q).toHaveAttribute('aria-expanded', 'false')
    await user.click(q)
    expect(q).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('region', { name: 'Qual o prazo de produção?' })).toBeInTheDocument()
  })
})

describe('Vitrine', () => {
  it('filtra por categoria', async () => {
    const user = userEvent.setup()
    render(
      <ShopProvider>
        <ProductGrid />
      </ShopProvider>,
    )
    const section = screen.getByRole('region', { name: /Peças que saíram da agulha/ })
    await user.click(within(section).getByRole('button', { name: /^Bolsas/ }))
    expect(within(section).getByRole('button', { name: /^Bolsas/ })).toHaveAttribute('aria-pressed', 'true')
    expect(await within(section).findByText(/Mostrando 2 peças em Bolsas/)).toBeInTheDocument()
    const expected = productsInCategory('bolsas').map((p) => p.name)
    for (const name of expected) expect(within(section).getByRole('button', { name })).toBeInTheDocument()
  })
})

describe('Ficha de encomenda', () => {
  it('mostra resumo de erros ao enviar vazia', async () => {
    const user = userEvent.setup()
    render(<CustomOrderForm />)
    await user.click(screen.getByRole('button', { name: 'Enviar ficha de encomenda' }))
    const alert = screen.getByRole('alert')
    expect(alert).toHaveTextContent('Tipo de peça')
    expect(alert).toHaveTextContent('WhatsApp')
    expect(screen.getByLabelText('Seu nome')).toHaveAttribute('aria-invalid', 'true')
  })
})
