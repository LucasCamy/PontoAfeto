/**
 * CONTEÚDO DAS SEÇÕES
 * ------------------------------------------------------------------
 * Textos de benefícios, processo, sobre, depoimentos, galeria e FAQ.
 * Itens marcados como DEMONSTRATIVO são fictícios e devem ser trocados
 * por informações reais antes de publicar.
 */
import { images, type ImageAsset } from './images'

export type IconName =
  | 'hand'
  | 'truck'
  | 'palette'
  | 'gift'
  | 'chat'
  | 'leaf'
  | 'yarn'
  | 'needle'
  | 'sparkle'
  | 'package'
  | 'seal'

export const benefits: { icon: IconName; title: string; text: string }[] = [
  { icon: 'hand', title: 'Feito à mão', text: 'Cada peça, do primeiro ao último ponto' },
  { icon: 'truck', title: 'Envio para todo o Brasil', text: 'Rastreio enviado pelo WhatsApp' },
  { icon: 'palette', title: 'Peças personalizadas', text: 'Cores, nome e tamanho do seu jeito' },
  { icon: 'gift', title: 'Embalagem para presente', text: 'Caixa kraft e cartão escrito à mão' },
  { icon: 'chat', title: 'Atendimento próximo', text: 'Você fala direto com a artesã' },
  { icon: 'leaf', title: 'Produção consciente', text: 'Fios de algodão e sobras reaproveitadas' },
]

export interface ProcessStep {
  title: string
  text: string
  note: string
  icon: IconName
  image?: ImageAsset
}

export const processSteps: ProcessStep[] = [
  {
    title: 'Escolha dos fios',
    text: 'Usamos fios de algodão e barbantes macios, que não soltam pelinhos e aguentam lavagem. Cada peça começa com o toque do fio na mão.',
    note: 'algodão sempre que possível',
    icon: 'yarn',
    image: images.yarnPastel,
  },
  {
    title: 'Combinação de cores',
    text: 'Montamos a cartela lado a lado, à luz do dia. Nas encomendas, você aprova a combinação por foto antes de começarmos.',
    note: 'você aprova antes',
    icon: 'palette',
    image: images.yarnPalette,
  },
  {
    title: 'Produção ponto a ponto',
    text: 'Um amigurumi médio leva de 6 a 10 horas de trabalho. Contamos as carreiras, conferimos a tensão do fio e bordamos os detalhes à mão.',
    note: 'sem pressa, com atenção',
    icon: 'needle',
    image: images.handsHook,
  },
  {
    title: 'Revisão e acabamento',
    text: 'Arremates escondidos, costuras reforçadas e um último teste de puxar orelhas e alças. Se não passar, volta para a agulha.',
    note: 'o teste do puxãozinho',
    icon: 'sparkle',
  },
  {
    title: 'Embalagem',
    text: 'Papel de seda, caixa kraft, adesivo do ateliê e um cartão escrito à mão. Se for presente, a gente escreve a sua mensagem.',
    note: 'pronto para presentear',
    icon: 'gift',
    image: images.giftRibbon,
  },
  {
    title: 'Envio',
    text: 'Despachamos em até 2 dias úteis depois de pronto e mandamos o código de rastreio pelo WhatsApp.',
    note: 'para todo o Brasil',
    icon: 'package',
  },
]

export const about = {
  title: 'Um ateliê pequeno, de propósito.',
  paragraphs: [
    'A Ponto Afeto começou numa mesa de cozinha, com uma agulha emprestada da avó e a vontade de fazer presentes que ninguém encontraria em loja nenhuma.',
    'Hoje continuamos pequenas de propósito: cada peça passa pelas mesmas mãos do começo ao fim. Isso deixa a produção mais lenta — e cada encomenda muito mais pessoal.',
  ],
  values: [
    { title: 'Feito devagar', text: 'Prazo honesto e acabamento sem atalhos.' },
    { title: 'Fio bom', text: 'Algodão macio, que dura e pode ser lavado.' },
    { title: 'Conversa de verdade', text: 'Quem responde a mensagem é quem faz a peça.' },
  ],
  // DEMONSTRATIVO — números fictícios, substituir pelos reais
  stats: [
    { value: '1.240+', label: 'peças entregues', demo: true },
    { value: '6 anos', label: 'de agulha na mão', demo: true },
    { value: '23', label: 'estados com clientes', demo: true },
  ],
  letter:
    'Quando você recebe uma peça nossa, está recebendo também algumas horas da minha tarde, um café que esfriou do lado e muito cuidado. Obrigada por escolher o feito à mão.',
  image: images.handsBlanket,
  secondaryImage: images.yarnBasket,
}

export interface Testimonial {
  quote: string
  author: string
  city: string
  product: string
  image?: ImageAsset
  demo: true
}

// DEMONSTRATIVO — depoimentos fictícios, substituir por avaliações reais
export const testimonials: Testimonial[] = [
  {
    quote:
      'Pedi uma peça personalizada para o chá de bebê da minha irmã e o resultado ficou exatamente como eu imaginava. Ela recebeu a prévia das cores antes e tudo.',
    author: 'Renata Albuquerque',
    city: 'Belo Horizonte, MG',
    product: 'Kit Trio da Soneca',
    image: images.giftBoxTrio,
    demo: true,
  },
  {
    quote: 'O acabamento é lindo e a embalagem deixou o presente ainda mais especial.',
    author: 'Tainá Valadares',
    city: 'Curitiba, PR',
    product: 'Bolsa Primavera',
    demo: true,
  },
  {
    quote: 'Dá para perceber o carinho em cada detalhe. Até o cartãozinho escrito à mão.',
    author: 'Otávio Prates',
    city: 'Recife, PE',
    product: 'Gatinho Mingau',
    demo: true,
  },
  {
    quote: 'Comprei os porta-copos para mim e voltei para comprar mais dois kits de presente.',
    author: 'Lúcia Hirata',
    city: 'Campinas, SP',
    product: 'Kit Café Aconchegante',
    demo: true,
  },
]

export interface GalleryItem {
  image: ImageAsset
  caption: string
  span: 'tall' | 'wide' | 'square'
}

export const gallery: GalleryItem[] = [
  { image: images.handsColorful, caption: 'Bastidores: fios torcidos para a alça da Primavera', span: 'tall' },
  { image: images.daisyVase, caption: 'Margarida que não murcha', span: 'square' },
  { image: images.yarnPalette, caption: 'Cartela de cores da estação', span: 'square' },
  { image: images.shelfFriends, caption: 'Prateleira de pronta entrega', span: 'wide' },
  { image: images.giftWood, caption: 'Pedidos embalados para envio', span: 'tall' },
  { image: images.blueFlowers, caption: 'Florzinhas para aplicar em bolsas', span: 'square' },
  { image: images.bunnyPink, caption: 'Coelhinha esperando a dona', span: 'square' },
  { image: images.coffeeMat, caption: 'Pausa para o café entre uma carreira e outra', span: 'wide' },
]

export const faq: { question: string; answer: string }[] = [
  {
    question: 'Como faço uma encomenda personalizada?',
    answer:
      'Preencha a ficha de encomenda nesta página ou chame no WhatsApp contando a sua ideia. Respondemos com orçamento, prazo e uma prévia das cores. A produção começa depois da sua aprovação e do sinal de 50%.',
  },
  {
    question: 'Qual o prazo de produção?',
    answer:
      'Peças de pronta entrega são enviadas em até 2 dias úteis. Encomendas levam de 5 a 15 dias úteis, dependendo do tamanho e da fila do ateliê — o prazo exato aparece em cada produto e no orçamento.',
  },
  {
    question: 'Vocês enviam para todo o Brasil?',
    answer:
      'Sim. Enviamos pelos Correios (PAC e SEDEX) e por transportadoras parceiras, sempre com código de rastreio. O frete é calculado pelo CEP na hora de fechar o pedido.',
  },
  {
    question: 'Posso escolher as cores?',
    answer:
      'Pode, sim. A maioria das peças tem cores sugeridas, mas trabalhamos com uma cartela de mais de 60 tons. Mandamos foto dos fios lado a lado para você aprovar.',
  },
  {
    question: 'As peças podem ser lavadas?',
    answer:
      'Podem. Recomendamos lavar à mão com água fria e sabão neutro, sem torcer, e secar na sombra, deitado. Amigurumis podem ir à máquina dentro de um saquinho, no ciclo delicado.',
  },
  {
    question: 'Como funciona o pagamento?',
    answer:
      'Aceitamos Pix, cartão de crédito em até 3x sem juros e boleto. Para encomendas, pedimos 50% de sinal para reservar a produção e o restante antes do envio.',
  },
  {
    question: 'Vocês fazem embalagens para presente?',
    answer:
      'Todas as peças já seguem em caixa kraft com papel de seda. Se for presente, é só avisar: incluímos um cartão escrito à mão com a sua mensagem e não colocamos o valor na caixa.',
  },
  {
    question: 'Posso solicitar uma peça baseada em uma referência?',
    answer:
      'Pode. Envie a foto de referência pela ficha de encomenda ou pelo WhatsApp. Avaliamos se é possível reproduzir em crochê e adaptamos ao estilo do ateliê, sem copiar peças autorais de outras artesãs.',
  },
]
