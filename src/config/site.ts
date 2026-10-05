/**
 * CONFIGURAÇÃO CENTRAL DA LOJA
 * ------------------------------------------------------------------
 * Tudo que identifica a marca fica aqui: nome, contatos, links e os
 * textos principais da página. Troque estes valores antes de publicar.
 *
 * ATENÇÃO: os contatos abaixo são FICTÍCIOS (conteúdo demonstrativo).
 * `isDemo: true` mantém avisos de "demonstrativo" nos pontos sensíveis
 * (formulário, depoimentos, números). Mude para `false` quando os dados
 * forem reais.
 */
export const site = {
  isDemo: true,

  name: 'Ponto Afeto', // Nome temporário — substitua pelo nome real da loja
  shortName: 'Ponto Afeto',
  descriptor: 'ateliê de crochê',
  tagline: 'Pequenos pontos. Grandes afetos.',
  description:
    'Amigurumis, bolsas, flores e peças de decoração em crochê, feitos à mão um ponto de cada vez — prontos para presentear ou criados sob encomenda.',
  artisan: {
    name: 'Celina Barros', // FICTÍCIO
    role: 'artesã e fundadora',
  },

  contact: {
    // FICTÍCIO — formato internacional, só dígitos (55 + DDD + número)
    whatsapp: '5511900000000',
    whatsappDisplay: '(11) 90000-0000',
    email: 'contato@pontoafeto.com.br', // FICTÍCIO
    instagramHandle: '@pontoafeto.atelie', // FICTÍCIO
    instagramUrl: 'https://instagram.com/pontoafeto.atelie', // FICTÍCIO
    hours: 'Seg a sex, 9h às 18h · Sáb, 9h às 13h',
    city: 'São Paulo, SP', // FICTÍCIO
  },

  shipping: {
    summary: 'Envio para todo o Brasil pelos Correios e transportadoras parceiras.',
    freeShippingFrom: 299, // DEMONSTRATIVO — valor em reais
  },

  nav: [
    { label: 'Início', href: '#inicio' },
    { label: 'Produtos', href: '#produtos' },
    { label: 'Sobre a marca', href: '#sobre' },
    { label: 'Personalizados', href: '#personalizados' },
    { label: 'Contato', href: '#contato' },
  ],

  hero: {
    eyebrow: 'Ateliê de crochê artesanal',
    title: 'Peças de crochê feitas à mão para deixar a vida mais colorida.',
    note: 'pequenos pontos, grandes afetos',
    text: 'Amigurumis, bolsas, flores e decoração criados ponto a ponto, com fios de algodão e muito cuidado. Escolha uma peça pronta ou encomende uma do seu jeito.',
    primaryCta: 'Ver produtos',
    secondaryCta: 'Encomendar uma peça',
  },

  customOrder: {
    title: 'Pensou em uma peça? Vamos transformar em crochê.',
    text: 'Conte a ideia, escolha as cores e o tamanho. Respondemos com um orçamento e um esboço antes de começar o primeiro ponto.',
  },

  finalCta: {
    title: 'Seu próximo presente favorito pode começar com um fio.',
    text: 'Escolha uma peça pronta ou chame a gente para criar algo só seu.',
  },

  // Mensagens pré-preenchidas do WhatsApp
  whatsappMessages: {
    general: 'Olá! Vim pelo site da Ponto Afeto e gostaria de saber mais sobre as peças.',
    custom: 'Olá! Quero encomendar uma peça personalizada de crochê.',
  },

  legal: {
    privacyUrl: '#privacidade', // resumo no rodapé — troque por uma página completa se necessário
    cnpj: '', // preencher quando houver
  },
} as const

export type Site = typeof site
