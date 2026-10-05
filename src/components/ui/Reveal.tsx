import { motion, type HTMLMotionProps } from 'motion/react'
import { ease } from './motion'

/** Entrada suave ao rolar: sobe 18px e aparece. Executa uma vez. */
export function Reveal({
  delay = 0,
  y = 18,
  children,
  ...rest
}: { delay?: number; y?: number } & HTMLMotionProps<'div'>) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.65, ease, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
