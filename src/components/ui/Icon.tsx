import {
  ChatsCircle,
  Gift,
  HandHeart,
  Leaf,
  Needle,
  Package,
  Palette,
  Seal,
  Sparkle,
  Truck,
  Yarn,
  type IconProps,
} from '@phosphor-icons/react'
import type { IconName } from '../../data/content'

const map = {
  hand: HandHeart,
  truck: Truck,
  palette: Palette,
  gift: Gift,
  chat: ChatsCircle,
  leaf: Leaf,
  yarn: Yarn,
  needle: Needle,
  sparkle: Sparkle,
  package: Package,
  seal: Seal,
} satisfies Record<IconName, unknown>

export function Icon({ name, ...props }: { name: IconName } & IconProps) {
  const Cmp = map[name]
  return <Cmp aria-hidden="true" {...props} />
}
