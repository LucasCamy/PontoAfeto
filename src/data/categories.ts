import { images, type ImageAsset } from './images'

export type CategoryId =
  | 'amigurumis'
  | 'bolsas'
  | 'decoracao'
  | 'presentes'
  | 'personalizados'
  | 'kits'

export interface Category {
  id: CategoryId
  label: string
  blurb: string
  image: ImageAsset
  /** Cor de apoio do cartão (token do tema) */
  tone: 'rose' | 'butter' | 'sage' | 'lavender' | 'sand' | 'terracotta'
}

export const categories: Category[] = [
  {
    id: 'amigurumis',
    label: 'Amigurumis',
    blurb: 'Bichinhos macios para abraçar',
    image: images.bunnyCarrot,
    tone: 'rose',
  },
  {
    id: 'bolsas',
    label: 'Bolsas',
    blurb: 'Para levar cor no dia a dia',
    image: images.bagSpring,
    tone: 'butter',
  },
  {
    id: 'decoracao',
    label: 'Decoração',
    blurb: 'Flores, cachepôs e mesa posta',
    image: images.tulips,
    tone: 'sage',
  },
  {
    id: 'presentes',
    label: 'Presentes',
    blurb: 'Lembrancinhas que emocionam',
    image: images.mushroomYarn,
    tone: 'terracotta',
  },
  {
    id: 'personalizados',
    label: 'Personalizados',
    blurb: 'Do seu jeito, com seu nome',
    image: images.bunnyGardener,
    tone: 'lavender',
  },
  {
    id: 'kits',
    label: 'Kits',
    blurb: 'Combinações prontas para presentear',
    image: images.giftBoxTrio,
    tone: 'sand',
  },
]

export const categoryLabel = (id: CategoryId) =>
  categories.find((c) => c.id === id)?.label ?? id
