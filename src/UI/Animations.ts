import { Variants } from 'framer-motion';

export const dotVariants: Variants = {
  initial: { y: 0, scale: 1 },
  hover: {
    y: -4,
    scale: 1.2,
    transition: {
      type: 'spring',
      stiffness: 500,
      damping: 20,
    },
  },
  rest: {
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 500,
      damping: 20,
    },
  },
};

export const menuVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.1,
    },
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
      staggerChildren: 0.05,
    },
  },
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
};
