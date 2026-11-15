import type { Variants } from "motion/react"

const ease: [number, number, number, number] = [0.2, 0.8, 0.2, 1]

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.88, ease } },
}

export const bob: Variants = {
  rest: { y: 0, rotate: -1 },
  bob: {
    y: [0, -10, 0],
    rotate: [-1, 1, -1],
    transition: { duration: 6, ease: "easeInOut", repeat: Infinity },
  },
}

export const sway: Variants = {
  rest: { y: 0, rotate: -2 },
  sway: {
    y: [0, -10, 0],
    rotate: [-2, 2, -2],
    transition: { duration: 6, ease: "easeInOut", repeat: Infinity },
  },
}
