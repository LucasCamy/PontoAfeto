import { describe, expect, it } from 'vitest'
import { categories } from '../data/categories'
import { images } from '../data/images'
import { getProduct, products, productsInCategory, spotlightProductSlug } from '../data/products'
import { faq, gallery, testimonials } from '../data/content'

describe('catálogo', () => {
  it('tem pelo menos oito produtos com ids e slugs únicos', () => {
    expect(products.length).toBeGreaterThanOrEqual(8)
    expect(new Set(products.map((p) => p.id)).size).toBe(products.length)
    expect(new Set(products.map((p) => p.slug)).size).toBe(products.length)
  })

  it('todo produto tem os campos obrigatórios preenchidos', () => {
    for (const p of products) {
      expect(p.name, p.slug).toBeTruthy()
      expect(p.description.length, p.slug).toBeGreaterThan(20)
      expect(p.price, p.slug).toBeGreaterThan(0)
      expect(p.colors.length, p.slug).toBeGreaterThan(0)
      expect(p.gallery.length, p.slug).toBeGreaterThan(0)
      expect(p.productionDays, p.slug).toBeGreaterThan(0)
      expect(p.image.alt.length, `alt de ${p.slug}`).toBeGreaterThan(15)
      if (p.compareAtPrice) expect(p.compareAtPrice).toBeGreaterThan(p.price)
    }
  })

  it('cada categoria tem ao menos um produto', () => {
    for (const c of categories) expect(productsInCategory(c.id).length, c.id).toBeGreaterThan(0)
  })

  it('o produto em destaque existe', () => {
    expect(getProduct(spotlightProductSlug)).toBeDefined()
  })

  it('há pelo menos um produto esgotado e um sob encomenda (estados de interface)', () => {
    expect(products.some((p) => p.availability === 'esgotado')).toBe(true)
    expect(products.some((p) => p.availability === 'sob-encomenda')).toBe(true)
  })
})

describe('conteúdo', () => {
  it('imagens têm alt descritivo (nunca nome de arquivo)', () => {
    for (const [key, img] of Object.entries(images)) {
      expect(img.alt.length, key).toBeGreaterThan(15)
      expect(img.alt, key).not.toMatch(/\.(jpe?g|png|webp)$/i)
    }
  })

  it('depoimentos estão marcados como demonstrativos', () => {
    expect(testimonials.every((t) => t.demo)).toBe(true)
  })

  it('FAQ cobre as oito perguntas pedidas', () => {
    expect(faq).toHaveLength(8)
  })

  it('galeria preenche a grade de 4 colunas sem buracos (12 células)', () => {
    const cells = gallery.reduce((n, g) => n + (g.span === 'square' ? 1 : 2), 0)
    expect(cells % 4).toBe(0)
  })
})
