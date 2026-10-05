/** Curvas e variantes de movimento compartilhadas (ver DESIGN.md › Motion) */
export const ease = [0.22, 1, 0.36, 1] as const
export const easeIn = [0.55, 0, 0.75, 0.2] as const

export const staggerParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}

export const staggerChild = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
}
