import { Variants } from 'framer-motion';
import { prefersReducedMotion } from 'lib/utils';

const shouldReduceMotion = prefersReducedMotion();

const easings = {
  easeElastic: [0.5, 1.25, 0.75, 1.25],
  easeElastic2: [0.5, 1.25, 0.75, 1.25],
  easeOut: [0, 0, 0, 1],
};

const light: Variants = {
  mask: {
    r: 10,
    transition: {
      ease: easings.easeElastic,
      duration: shouldReduceMotion ? 0 : 0.5,
    },
  },
  sun: {
    r: 9,
    transition: {
      ease: easings.easeElastic,
      duration: shouldReduceMotion ? 0 : 0.5,
    },
  },
  moon: {
    cx: 20,
    r: 10,
    transition: {
      ease: easings.easeOut,
      delay: shouldReduceMotion ? 0 : 0.25,
      duration: shouldReduceMotion ? 0 : 0.5,
    },
  },
  sunBeams: {
    rotateZ: -25,
    opacity: 0,
    transition: {
      ease: easings.easeElastic2,
      duration: shouldReduceMotion ? 0 : 0.15,
    },
  },
};

const dark: Variants = {
  mask: {
    r: 6,
    transition: {
      ease: easings.easeElastic,
      duration: shouldReduceMotion ? 0 : 0.5,
    },
  },
  sun: {
    r: 5,
    transition: {
      ease: easings.easeElastic,
      duration: shouldReduceMotion ? 0 : 0.5,
    },
  },
  moon: {
    cx: 33,
    r: 6,
    transition: {
      ease: easings.easeOut,
      duration: shouldReduceMotion ? 0 : 0.5,
      delay: 0,
    },
  },
  sunBeams: {
    rotateZ: 0,
    opacity: 1,
    transition: {
      ease: easings.easeElastic2,
      duration: shouldReduceMotion ? 0 : 0.5,
    },
  },
};

export const variants = {
  light,
  dark,
};
