const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

export const formatPrice = (value: number) => brl.format(value)

export const pluralDays = (days: number) => `${days} ${days === 1 ? 'dia útil' : 'dias úteis'}`
