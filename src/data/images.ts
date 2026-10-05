/**
 * BIBLIOTECA DE IMAGENS
 * ------------------------------------------------------------------
 * Todas as imagens da página passam por este arquivo. Para trocar uma
 * foto, altere apenas o `src` (e o `alt`) da chave correspondente.
 *
 * - Fotos atuais: DEMONSTRATIVAS, do Unsplash (licença gratuita
 *   https://unsplash.com/license). Não são produtos reais da loja.
 * - Para usar fotos próprias, coloque o arquivo em `public/images/`
 *   e use `src: '/images/nome-do-arquivo.jpg'`.
 * - Mantenha fotos com luz natural, fundo simples e proporção próxima
 *   de 4:5 para produtos (veja DESIGN.md › Fotografia).
 */
export interface ImageAsset {
  src: string
  alt: string
  /** Origem da imagem — útil para créditos e para lembrar de substituir */
  source?: string
  /** Ponto focal para recortes (CSS object-position) */
  focus?: string
}

const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}`

export const images = {
  // Amigurumis
  catHead: {
    src: unsplash('1789737829132-6fc56fc004d9'),
    alt: 'Mão segurando a cabeça de um gatinho amigurumi cinza-claro com fio branco solto',
    source: 'Unsplash (demonstrativa)',
  },
  sleepyTrio: {
    src: unsplash('1686151271777-12efa81f65e0'),
    alt: 'Três bichinhos de crochê em tons claros deitados sobre um cobertor azul',
    source: 'Unsplash (demonstrativa)',
  },
  bunnyCarrot: {
    src: unsplash('1753370230699-8e21227afeb6'),
    alt: 'Coelhinho de crochê branco com orelhas rosadas segurando uma cenoura laranja',
    source: 'Unsplash (demonstrativa)',
    focus: '50% 40%',
  },
  bunnyPink: {
    src: unsplash('1744371760034-fb60ebd2b198'),
    alt: 'Coelhinho rosa de crochê espiando por trás da borda de uma mesa',
    source: 'Unsplash (demonstrativa)',
  },
  bunnyGardener: {
    src: unsplash('1775484105281-a5e677f2ae40'),
    alt: 'Coelhinho de crochê com chapéu verde e macacão sobre fundo de jardim',
    source: 'Unsplash (demonstrativa)',
  },
  bunnyGardenerHand: {
    src: unsplash('1758199920346-f2759cbc3df4'),
    alt: 'Mão segurando um coelho de crochê cinza com chapéu verde-limão',
    source: 'Unsplash (demonstrativa)',
  },
  penguins: {
    src: unsplash('1779433755935-991480f06b98'),
    alt: 'Cinco pinguins de crochê coloridos empilhados sobre uma mesa',
    source: 'Unsplash (demonstrativa)',
  },
  giftBoxTrio: {
    src: unsplash('1686150784894-eb52e4023493'),
    alt: 'Caixa de madeira com três bichinhos de crochê dormindo lado a lado',
    source: 'Unsplash (demonstrativa)',
  },
  shelfFriends: {
    src: unsplash('1686151573986-03b5a79f22a5'),
    alt: 'Dois bichinhos de crochê sentados em uma prateleira de madeira escura',
    source: 'Unsplash (demonstrativa)',
  },
  mushroomYarn: {
    src: unsplash('1682954013913-25fe41e180c0'),
    alt: 'Cogumelo de crochê vermelho com pintas brancas sobre um novelo de fio cru',
    source: 'Unsplash (demonstrativa)',
  },
  bunnyKeychain: {
    src: unsplash('1753370474663-1b0ad622c5fc'),
    alt: 'Chaveiro de coelhinho de crochê pendurado em uma mochila estampada',
    source: 'Unsplash (demonstrativa)',
  },
  koalaPot: {
    src: unsplash('1671212684942-5c8a3dc3234e'),
    alt: 'Bichinho de crochê cinza ao lado de um vasinho também feito em crochê',
    source: 'Unsplash (demonstrativa)',
  },

  // Bolsas
  bagSpring: {
    src: unsplash('1789406075648-fd2688a93865'),
    alt: 'Bolsa de crochê colorida com buquê de dálias vermelhas, amarelas e rosas',
    source: 'Unsplash (demonstrativa)',
  },
  bagStripes: {
    src: unsplash('1746301989947-ec94ca0a23fb'),
    alt: 'Detalhe de bolsa de crochê com listras em vermelho, amarelo, verde e azul',
    source: 'Unsplash (demonstrativa)',
  },
  bagDaisy: {
    src: unsplash('1787432131008-c754654978a4'),
    alt: 'Bolsinha de crochê amarelo-manteiga com flores aplicadas, pendurada em uma porta escura',
    source: 'Unsplash (demonstrativa)',
  },
  bagPink: {
    src: unsplash('1686285961015-12886f9b3bf5'),
    alt: 'Bolsa de crochê rosa e branca apoiada em um piso de madeira',
    source: 'Unsplash (demonstrativa)',
  },

  // Flores e decoração
  tulips: {
    src: unsplash('1768029120664-119e99b02e5b'),
    alt: 'Tulipas e margaridas de crochê em vasinhos sobre uma toalha xadrez verde',
    source: 'Unsplash (demonstrativa)',
  },
  sunflower: {
    src: unsplash('1753366556702-d28165fc88bc'),
    alt: 'Mão segurando um vasinho de crochê com girassol amarelo',
    source: 'Unsplash (demonstrativa)',
  },
  daisyVase: {
    src: unsplash('1783943579121-da2fab12bbf9'),
    alt: 'Margarida de crochê em vasinho laranja apoiado sobre um livro',
    source: 'Unsplash (demonstrativa)',
  },
  blueFlowers: {
    src: unsplash('1700171518313-5dd219beaaa6'),
    alt: 'Pequenas flores de crochê azul-petróleo espalhadas sobre fundo azul acinzentado',
    source: 'Unsplash (demonstrativa)',
  },
  flowersBook: {
    src: unsplash('1752755098269-58113eb87d61'),
    alt: 'Flores de crochê lilás repousando sobre as páginas de um livro aberto',
    source: 'Unsplash (demonstrativa)',
  },
  basketPot: {
    src: unsplash('1732229033711-f219a171f274'),
    alt: 'Cachepô trançado em fio cinza com uma suculenta verde-escura',
    source: 'Unsplash (demonstrativa)',
  },

  // Mesa posta
  coffeeCoasters: {
    src: unsplash('1648217736318-fbc4abc138ec'),
    alt: 'Xícara de café sobre porta-copos de crochê coloridos ao lado de um livro aberto',
    source: 'Unsplash (demonstrativa)',
  },
  coffeeMat: {
    src: unsplash('1701957425297-6cd8eebe70df'),
    alt: 'Xícara de café com leite apoiada sobre um tapetinho de crochê marrom',
    source: 'Unsplash (demonstrativa)',
  },
  starCoaster: {
    src: unsplash('1761206887052-9abec0c38f03'),
    alt: 'Porta-copo de crochê rosa em formato de estrela ao lado de novelo e xícara',
    source: 'Unsplash (demonstrativa)',
  },
  mandala: {
    src: unsplash('1753879118115-8f25ef6af5b8'),
    alt: 'Sousplat redondo de crochê com anéis em amarelo-mostarda, azul e preto',
    source: 'Unsplash (demonstrativa)',
  },
  sunMotif: {
    src: unsplash('1788523808414-17ec94fd36e1'),
    alt: 'Mão segurando um motivo de crochê em forma de sol amarelo e cinza',
    source: 'Unsplash (demonstrativa)',
  },

  // Ateliê e processo
  yarnPastel: {
    src: unsplash('1682954100067-c4356f636c6b'),
    alt: 'Novelos de fio em amarelo-mostarda, verde-sálvia e rosa sobre uma mesa clara',
    source: 'Unsplash (demonstrativa)',
  },
  yarnPalette: {
    src: unsplash('1626779723011-be3a3cf85d50'),
    alt: 'Novelos de fio organizados por cor, do rosa ao azul e ao amarelo',
    source: 'Unsplash (demonstrativa)',
  },
  yarnBasket: {
    src: unsplash('1646282993025-1489baeab7c2'),
    alt: 'Cesto cheio de novelos de lã em tons quentes ao lado de uma planta',
    source: 'Unsplash (demonstrativa)',
  },
  yarnNeutral: {
    src: unsplash('1641060889144-1cc91e6871ce'),
    alt: 'Pilha de novelos de fio em tons de rosa, branco e laranja',
    source: 'Unsplash (demonstrativa)',
  },
  handsHook: {
    src: unsplash('1735414526594-a97524c7615d'),
    alt: 'Mãos segurando a agulha de crochê enquanto trabalham um fio verde',
    source: 'Unsplash (demonstrativa)',
  },
  handsBlanket: {
    src: unsplash('1735414526593-f4897823b66a'),
    alt: 'Mãos fazendo crochê em uma manta laranja e verde com agulha amarela',
    source: 'Unsplash (demonstrativa)',
  },
  handsColorful: {
    src: unsplash('1789654498607-61ff1edff021'),
    alt: 'Mãos passando a agulha de crochê por fios coloridos torcidos',
    source: 'Unsplash (demonstrativa)',
  },
  blueWork: {
    src: unsplash('1749103729324-39d8a868ed06'),
    alt: 'Trabalho de crochê em fio azul-turquesa em andamento com a agulha ainda presa',
    source: 'Unsplash (demonstrativa)',
  },
  giftRibbon: {
    src: unsplash('1513201099705-a9746e1e201f'),
    alt: 'Caixa de presente em papel kraft amarrada com fita rosa',
    source: 'Unsplash (demonstrativa)',
  },
  giftWood: {
    src: unsplash('1699653184094-3806a9ae9bc9'),
    alt: 'Dois pacotes de presente embrulhados sobre uma mesa de madeira',
    source: 'Unsplash (demonstrativa)',
  },
  giftBox: {
    src: unsplash('1606498679463-30a0eb8824e1'),
    alt: 'Caixa de presente branca com laço verde sobre uma mesa clara',
    source: 'Unsplash (demonstrativa)',
  },
} satisfies Record<string, ImageAsset>

export type ImageKey = keyof typeof images

/** Monta a URL otimizada. Imagens locais (/images/...) são usadas como estão. */
export function imageUrl(asset: ImageAsset, width: number, aspect?: number) {
  if (!asset.src.includes('images.unsplash.com')) return asset.src
  const params = new URLSearchParams({
    auto: 'format',
    fit: 'crop',
    q: '72',
    w: String(width),
  })
  if (aspect) params.set('h', String(Math.round(width / aspect)))
  return `${asset.src}?${params.toString()}`
}

export function imageSrcSet(asset: ImageAsset, widths: number[], aspect?: number) {
  if (!asset.src.includes('images.unsplash.com')) return undefined
  return widths.map((w) => `${imageUrl(asset, w, aspect)} ${w}w`).join(', ')
}
