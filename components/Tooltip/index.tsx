import React from 'react';
import { useTooltip, TooltipPopup, TooltipProps } from '@reach/tooltip';
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  Variants,
} from 'framer-motion';
import { cx } from 'lib/utils';

import styles from './Tooltip.module.css';

const variants: Variants = {
  hidden: { opacity: 0, x: 0, y: -4 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: -0, y: -4 },
};

type TriggerRect = {
  left: number;
  width: number;
  bottom: number;
};

type TooltipRect = {
  width: number;
};

const centered = (triggerRect: TriggerRect, tooltipRect: TooltipRect) => {
  const triggerCenter = triggerRect.left + triggerRect.width / 2;
  const left = triggerCenter - tooltipRect.width / 2;
  const maxLeft = window.innerWidth - tooltipRect.width - 2;

  return {
    left: Math.min(Math.max(2, left), maxLeft) + window.scrollX,
    top: triggerRect.bottom + 5 + window.scrollY,
  };
};

interface Props extends TooltipProps {
  shortcut?: string[];
  children: React.ReactElement;
}

export function Tooltip({
  ariaLabel,
  label,
  shortcut,
  children,
  ...rest
}: Props) {
  const MotionTooltipPopup = motion(TooltipPopup);
  const shouldReduceMotion = useReducedMotion();

  const [trigger, tooltip] = useTooltip();
  const { isVisible } = tooltip;

  return (
    <>
      {React.cloneElement(children, trigger)}

      <AnimatePresence>
        {isVisible && (
          <MotionTooltipPopup
            {...tooltip}
            variants={!shouldReduceMotion ? variants : (null as any)}
            initial="hidden"
            animate="enter"
            exit="exit"
            transition={{ duration: 0.1, type: 'easeInOut' }}
            position={centered as any}
            className={cx(styles.root, { [styles.shortcut]: shortcut })}
            ariaLabel={ariaLabel}
            label={
              <>
                {label}
                {shortcut && shortcut.length > 0 ? (
                  <span>
                    {shortcut.map((item, i) => {
                      return (
                        <React.Fragment key={i}>
                          {item}
                          {i + 1 < shortcut.length ? (
                            <>
                              {' '}
                              <span>+</span>{' '}
                            </>
                          ) : null}
                        </React.Fragment>
                      );
                    })}
                  </span>
                ) : null}
              </>
            }
            {...rest}
          />
        )}
      </AnimatePresence>
    </>
  );
}
