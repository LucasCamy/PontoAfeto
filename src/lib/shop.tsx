/**
 * Estado da vitrine: sacola, categoria ativa e produto aberto.
 * A sacola não faz checkout — ela monta um pedido enviado pelo WhatsApp.
 * Para integrar um e-commerce real, troque `addToBag`/`checkout` aqui.
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, type ReactNode } from 'react'
import type { CategoryId } from '../data/categories'
import { getProduct, type Product } from '../data/products'

export interface BagLine {
  slug: string
  color?: string
  quantity: number
}

interface ShopState {
  bag: BagLine[]
  bagOpen: boolean
  openSlug: string | null
  category: CategoryId | 'todos'
  /** Último item adicionado — usado pelo aviso "adicionado à sacola" */
  lastAdded: { slug: string; tick: number } | null
}

type Action =
  | { type: 'add'; slug: string; color?: string; quantity?: number }
  | { type: 'setQty'; index: number; quantity: number }
  | { type: 'remove'; index: number }
  | { type: 'clear' }
  | { type: 'bag'; open: boolean }
  | { type: 'open'; slug: string | null }
  | { type: 'category'; category: CategoryId | 'todos' }

const STORAGE_KEY = 'ponto-afeto:sacola'

function reducer(state: ShopState, action: Action): ShopState {
  switch (action.type) {
    case 'add': {
      const qty = action.quantity ?? 1
      const index = state.bag.findIndex((l) => l.slug === action.slug && l.color === action.color)
      const bag =
        index >= 0
          ? state.bag.map((l, i) => (i === index ? { ...l, quantity: Math.min(l.quantity + qty, 20) } : l))
          : [...state.bag, { slug: action.slug, color: action.color, quantity: qty }]
      return { ...state, bag, lastAdded: { slug: action.slug, tick: (state.lastAdded?.tick ?? 0) + 1 } }
    }
    case 'setQty':
      return {
        ...state,
        bag: state.bag.map((l, i) => (i === action.index ? { ...l, quantity: Math.max(1, Math.min(action.quantity, 20)) } : l)),
      }
    case 'remove':
      return { ...state, bag: state.bag.filter((_, i) => i !== action.index) }
    case 'clear':
      return { ...state, bag: [] }
    case 'bag':
      return { ...state, bagOpen: action.open }
    case 'open':
      return { ...state, openSlug: action.slug }
    case 'category':
      return { ...state, category: action.category }
  }
}

function loadBag(): BagLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? (JSON.parse(raw) as BagLine[]) : []
    return Array.isArray(parsed) ? parsed.filter((l) => getProduct(l.slug)) : []
  } catch {
    return []
  }
}

interface ShopContextValue extends ShopState {
  dispatch: React.Dispatch<Action>
  bagCount: number
  bagItems: (BagLine & { product: Product })[]
  bagTotal: number
  addToBag: (slug: string, color?: string, quantity?: number) => void
  openProduct: (slug: string | null) => void
  setCategory: (category: CategoryId | 'todos') => void
}

const ShopContext = createContext<ShopContextValue | null>(null)

export function ShopProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, () => ({
    bag: loadBag(),
    bagOpen: false,
    openSlug: null,
    category: 'todos' as const,
    lastAdded: null,
  }))

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.bag))
    } catch {
      /* armazenamento indisponível: a sacola vale só para esta visita */
    }
  }, [state.bag])

  const addToBag = useCallback(
    (slug: string, color?: string, quantity?: number) => dispatch({ type: 'add', slug, color, quantity }),
    [],
  )
  const openProduct = useCallback((slug: string | null) => dispatch({ type: 'open', slug }), [])
  const setCategory = useCallback((category: CategoryId | 'todos') => dispatch({ type: 'category', category }), [])

  const value = useMemo<ShopContextValue>(() => {
    const bagItems = state.bag.flatMap((l) => {
      const product = getProduct(l.slug)
      return product ? [{ ...l, product }] : []
    })
    return {
      ...state,
      dispatch,
      bagItems,
      bagCount: bagItems.reduce((n, l) => n + l.quantity, 0),
      bagTotal: bagItems.reduce((n, l) => n + l.quantity * l.product.price, 0),
      addToBag,
      openProduct,
      setCategory,
    }
  }, [state, addToBag, openProduct, setCategory])

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useShop() {
  const ctx = useContext(ShopContext)
  if (!ctx) throw new Error('useShop precisa estar dentro de <ShopProvider>')
  return ctx
}
