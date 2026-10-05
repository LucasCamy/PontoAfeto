/**
 * CATÁLOGO DE PRODUTOS — DEMONSTRATIVO
 * ------------------------------------------------------------------
 * Produtos, preços, prazos e fotos são fictícios. Para editar:
 * 1. Altere nome, preço, descrição etc. diretamente no objeto.
 * 2. Para trocar fotos, aponte `image` / `gallery` para outra chave de
 *    `images.ts` (ou crie uma nova chave lá).
 * 3. `availability`: 'pronta-entrega' | 'sob-encomenda' | 'esgotado'.
 * 4. `featured: true` faz o produto aparecer primeiro na vitrine.
 *
 * Estrutura pensada para ser substituída por uma API de e-commerce
 * (Shopify, Nuvemshop, Medusa...) sem mudar os componentes.
 */
import type { CategoryId } from './categories'
import { images, type ImageAsset } from './images'

export type Availability = 'pronta-entrega' | 'sob-encomenda' | 'esgotado'

export interface ColorOption {
  name: string
  hex: string
}

export interface Product {
  id: string
  name: string
  slug: string
  category: CategoryId
  /** Categorias adicionais em que o produto também aparece no filtro */
  alsoIn?: CategoryId[]
  description: string
  details: string
  price: number
  /** Preço anterior (riscado), se houver */
  compareAtPrice?: number
  /** Exibe "a partir de" antes do preço */
  priceFrom?: boolean
  image: ImageAsset
  gallery: ImageAsset[]
  colors: ColorOption[]
  dimensions: string
  materials: string
  /** Prazo de produção em dias úteis */
  productionDays: number
  availability: Availability
  featured?: boolean
  badge?: string
  tags: string[]
}

export const palette = {
  cru: { name: 'Cru', hex: '#EFE4D2' },
  nuvem: { name: 'Cinza nuvem', hex: '#C9C5C0' },
  caramelo: { name: 'Caramelo', hex: '#C08552' },
  rosa: { name: 'Rosa antigo', hex: '#E9A6A6' },
  terracota: { name: 'Terracota', hex: '#D98268' },
  manteiga: { name: 'Manteiga', hex: '#F4D06F' },
  salvia: { name: 'Sálvia', hex: '#A8B89F' },
  lavanda: { name: 'Lavanda', hex: '#B9B0D9' },
  cacau: { name: 'Cacau', hex: '#5C4033' },
  azul: { name: 'Azul petróleo', hex: '#3E7B85' },
} satisfies Record<string, ColorOption>

export const products: Product[] = [
  {
    id: 'p01',
    name: 'Gatinho Mingau',
    slug: 'gatinho-amigurumi',
    category: 'amigurumis',
    alsoIn: ['presentes'],
    description: 'Amigurumi de gatinho com focinho bordado à mão e enchimento antialérgico.',
    details:
      'O Mingau nasceu de um pedido de uma cliente que queria eternizar o gato da família. Virou queridinho do ateliê: cabe na palma da mão, tem bigodes bordados ponto a ponto e olhos de segurança.',
    price: 119,
    image: images.catHead,
    gallery: [images.catHead, images.sleepyTrio],
    colors: [palette.nuvem, palette.cru, palette.caramelo],
    dimensions: '18 cm de altura',
    materials: 'Fio 100% algodão, fibra siliconada antialérgica',
    productionDays: 7,
    availability: 'pronta-entrega',
    featured: true,
    badge: 'Mais amado',
    tags: ['amigurumi', 'gato', 'presente'],
  },
  {
    id: 'p02',
    name: 'Bolsa Primavera',
    slug: 'bolsa-primavera',
    category: 'bolsas',
    description: 'Bolsa de ombro em ponto granny, forrada em tricoline e com alça reforçada.',
    details:
      'Cada quadradinho é feito separadamente e unido à mão, por isso nenhuma Primavera é igual à outra. Forro em tricoline com bolso interno e fechamento por botão de madeira.',
    price: 249,
    compareAtPrice: 279,
    image: images.bagSpring,
    gallery: [images.bagSpring, images.bagStripes],
    colors: [palette.terracota, palette.manteiga, palette.salvia],
    dimensions: '30 × 24 cm · alça de 60 cm',
    materials: 'Fio de algodão mercerizado, forro de tricoline, botão de madeira',
    productionDays: 10,
    availability: 'pronta-entrega',
    featured: true,
    badge: 'Edição de estação',
    tags: ['bolsa', 'granny', 'colorida'],
  },
  {
    id: 'p03',
    name: 'Vaso Florido',
    slug: 'vaso-florido',
    category: 'decoracao',
    alsoIn: ['presentes'],
    description: 'Vasinho com flores de crochê que não murcham — perfeito para mesa ou estante.',
    details:
      'Pétalas modeladas uma a uma e cabinho com arame encapado, para você ajustar a posição das flores. Uma lembrança que dura muito mais que um buquê.',
    price: 89,
    image: images.sunflower,
    gallery: [images.sunflower, images.daisyVase],
    colors: [palette.lavanda, palette.rosa, palette.manteiga],
    dimensions: '16 cm de altura',
    materials: 'Fio de algodão, arame encapado, base com peso',
    productionDays: 5,
    availability: 'pronta-entrega',
    featured: true,
    tags: ['flor', 'vaso', 'decoração'],
  },
  {
    id: 'p04',
    name: 'Chaveiro Cogumelo',
    slug: 'chaveiro-cogumelo',
    category: 'presentes',
    description: 'Cogumelo de crochê com pintinhas bordadas e argola dourada.',
    details:
      'Pequeno, resistente e cheio de personalidade. Ótimo para lembrancinhas de aniversário — fazemos em quantidade com cores combinando.',
    price: 39,
    image: images.mushroomYarn,
    gallery: [images.mushroomYarn, images.yarnPastel],
    colors: [palette.terracota, palette.rosa, palette.manteiga],
    dimensions: '7 cm',
    materials: 'Fio de algodão, argola de metal',
    productionDays: 3,
    availability: 'pronta-entrega',
    badge: 'Novo',
    tags: ['chaveiro', 'lembrancinha'],
  },
  {
    id: 'p05',
    name: 'Coelhinho de Algodão',
    slug: 'coelhinho-de-algodao',
    category: 'amigurumis',
    alsoIn: ['presentes'],
    description: 'Coelhinho com cenourinha removível, macio e seguro para bebês.',
    details:
      'Olhos bordados (sem peças rígidas), costuras reforçadas e fio de algodão hipoalergênico. Acompanha tag com o nome do bebê, se você quiser.',
    price: 139,
    image: images.bunnyCarrot,
    gallery: [images.bunnyCarrot, images.bunnyPink],
    colors: [palette.cru, palette.rosa, palette.nuvem],
    dimensions: '24 cm com as orelhas',
    materials: 'Fio 100% algodão, fibra antialérgica, olhos bordados',
    productionDays: 7,
    availability: 'pronta-entrega',
    featured: true,
    tags: ['amigurumi', 'bebê', 'coelho'],
  },
  {
    id: 'p06',
    name: 'Kit Café Aconchegante',
    slug: 'kit-cafe-aconchegante',
    category: 'kits',
    alsoIn: ['presentes', 'decoracao'],
    description: 'Quatro porta-copos e um tapetinho de mesa, embalados para presente.',
    details:
      'Feito para quem ama um café sem pressa. As cores são combinadas à mão e o kit vai em caixa kraft com cartão escrito pela artesã.',
    price: 159,
    image: images.coffeeCoasters,
    gallery: [images.coffeeCoasters, images.coffeeMat],
    colors: [palette.terracota, palette.cacau, palette.cru],
    dimensions: 'Porta-copos de 11 cm · tapete de 30 cm',
    materials: 'Barbante de algodão',
    productionDays: 6,
    availability: 'pronta-entrega',
    badge: 'Ideal para presente',
    tags: ['kit', 'café', 'mesa posta'],
  },
  {
    id: 'p07',
    name: 'Porta-copos Estrela',
    slug: 'porta-copos-estrela',
    category: 'decoracao',
    description: 'Par de porta-copos em formato de estrela, em barbante macio.',
    details: 'Absorvem a umidade do copo e deixam a mesa mais alegre. Vendidos em par, cores à escolha.',
    price: 49,
    image: images.starCoaster,
    gallery: [images.starCoaster, images.yarnNeutral],
    colors: [palette.rosa, palette.manteiga, palette.salvia, palette.lavanda],
    dimensions: '12 cm (par)',
    materials: 'Barbante de algodão',
    productionDays: 3,
    availability: 'pronta-entrega',
    tags: ['porta-copo', 'mesa posta'],
  },
  {
    id: 'p08',
    name: 'Coelho Jardineiro Personalizado',
    slug: 'coelho-jardineiro-personalizado',
    category: 'personalizados',
    alsoIn: ['amigurumis'],
    description: 'Escolha as cores da roupinha e o nome bordado no macacão.',
    details:
      'Você escolhe a cor do chapéu, do macacão e o nome (até 10 letras) bordado na frente. Enviamos uma prévia das cores antes de começar.',
    price: 189,
    priceFrom: true,
    image: images.bunnyGardener,
    gallery: [images.bunnyGardener, images.bunnyGardenerHand],
    colors: [palette.salvia, palette.manteiga, palette.terracota, palette.lavanda],
    dimensions: '28 cm de altura',
    materials: 'Fio 100% algodão, fibra antialérgica, bordado à mão',
    productionDays: 12,
    availability: 'sob-encomenda',
    badge: 'Com nome',
    tags: ['personalizado', 'nome', 'coelho'],
  },
  {
    id: 'p09',
    name: 'Sousplat Mandala Sol',
    slug: 'sousplat-mandala-sol',
    category: 'decoracao',
    description: 'Sousplat em anéis de cor, firme e lavável, para mesas cheias de afeto.',
    details: 'Feito em barbante encorpado, mantém o formato depois de lavado. Vendido por unidade.',
    price: 69,
    image: images.mandala,
    gallery: [images.mandala, images.sunMotif],
    colors: [palette.manteiga, palette.azul, palette.cacau],
    dimensions: '36 cm de diâmetro',
    materials: 'Barbante de algodão nº 6',
    productionDays: 4,
    availability: 'pronta-entrega',
    tags: ['sousplat', 'mesa posta'],
  },
  {
    id: 'p10',
    name: 'Bolsinha Margarida',
    slug: 'bolsinha-margarida',
    category: 'bolsas',
    alsoIn: ['presentes'],
    description: 'Bolsinha tiracolo com margaridas aplicadas, cabe celular e chaves.',
    details: 'Alça regulável e forro de algodão. As margaridas são costuradas uma a uma depois da bolsa pronta.',
    price: 129,
    image: images.bagDaisy,
    gallery: [images.bagDaisy, images.bagPink],
    colors: [palette.manteiga, palette.rosa, palette.cru],
    dimensions: '18 × 14 cm',
    materials: 'Fio de algodão, forro de tricoline',
    productionDays: 6,
    availability: 'pronta-entrega',
    tags: ['bolsa', 'flor'],
  },
  {
    id: 'p11',
    name: 'Família Pinguim',
    slug: 'familia-pinguim',
    category: 'amigurumis',
    description: 'Cinco pinguins coloridos que se empilham — decoração e brincadeira.',
    details: 'Edição limitada feita para o inverno. Novas unidades sob encomenda a partir do próximo lote.',
    price: 299,
    image: images.penguins,
    gallery: [images.penguins, images.shelfFriends],
    colors: [palette.azul, palette.manteiga, palette.terracota],
    dimensions: '10 cm cada',
    materials: 'Fio de algodão, fibra antialérgica',
    productionDays: 14,
    availability: 'esgotado',
    badge: 'Edição limitada',
    tags: ['amigurumi', 'coleção'],
  },
  {
    id: 'p12',
    name: 'Kit Trio da Soneca',
    slug: 'kit-trio-da-soneca',
    category: 'kits',
    alsoIn: ['presentes', 'amigurumis'],
    description: 'Três bichinhos dormindo em caminha de madeira — presente de chá de bebê.',
    details:
      'A caminha de madeira vira enfeite de quarto e os bichinhos podem ser personalizados com as cores do enxoval.',
    price: 329,
    image: images.giftBoxTrio,
    gallery: [images.giftBoxTrio, images.sleepyTrio],
    colors: [palette.cru, palette.nuvem, palette.caramelo],
    dimensions: 'Caixa de 26 × 14 cm',
    materials: 'Fio de algodão, caixa de pinus, fibra antialérgica',
    productionDays: 15,
    availability: 'sob-encomenda',
    badge: 'Chá de bebê',
    tags: ['kit', 'bebê', 'presente'],
  },
  {
    id: 'p13',
    name: 'Jardim de Tulipas',
    slug: 'jardim-de-tulipas',
    category: 'decoracao',
    alsoIn: ['presentes'],
    description: 'Trio de vasinhos com tulipas e margaridas, cores de primavera.',
    details: 'Vendido em trio. Ótimo para decorar mesas de festa e depois virar lembrança para os convidados.',
    price: 119,
    image: images.tulips,
    gallery: [images.tulips, images.flowersBook],
    colors: [palette.rosa, palette.manteiga, palette.lavanda],
    dimensions: '12 cm cada',
    materials: 'Fio de algodão, arame encapado',
    productionDays: 6,
    availability: 'pronta-entrega',
    tags: ['flor', 'vaso', 'festa'],
  },
  {
    id: 'p14',
    name: 'Cachepô Trançado',
    slug: 'cachepo-trancado',
    category: 'decoracao',
    description: 'Cachepô firme em fio de malha para vasos de até 12 cm.',
    details: 'Trama fechada que esconde o vaso plástico e dá textura ao cantinho verde da casa.',
    price: 59,
    image: images.basketPot,
    gallery: [images.basketPot, images.koalaPot],
    colors: [palette.nuvem, palette.cru, palette.salvia],
    dimensions: '13 cm de diâmetro',
    materials: 'Fio de malha reciclado',
    productionDays: 4,
    availability: 'pronta-entrega',
    tags: ['cachepô', 'plantas'],
  },
  {
    id: 'p15',
    name: 'Chaveiro Coelhinho',
    slug: 'chaveiro-coelhinho',
    category: 'presentes',
    description: 'Mini coelho para pendurar na mochila, na bolsa ou nas chaves.',
    details: 'Leve e resistente, com argola reforçada. Pode levar a inicial bordada na barriguinha.',
    price: 45,
    image: images.bunnyKeychain,
    gallery: [images.bunnyKeychain, images.bunnyPink],
    colors: [palette.cru, palette.rosa],
    dimensions: '9 cm',
    materials: 'Fio de algodão, argola de metal',
    productionDays: 3,
    availability: 'pronta-entrega',
    tags: ['chaveiro', 'lembrancinha'],
  },
]

/** Produto da seção editorial "Peça da estação" */
export const spotlightProductSlug = 'bolsa-primavera'

export const getProduct = (slug: string) => products.find((p) => p.slug === slug)

export const productsInCategory = (category: CategoryId | 'todos') =>
  category === 'todos'
    ? products
    : products.filter((p) => p.category === category || p.alsoIn?.includes(category))

export const availabilityLabel: Record<Availability, string> = {
  'pronta-entrega': 'Pronta entrega',
  'sob-encomenda': 'Sob encomenda',
  esgotado: 'Esgotado',
}

/** Cartela de fios oferecida nas encomendas personalizadas */
export const yarnPalette: ColorOption[] = Object.values(palette)
