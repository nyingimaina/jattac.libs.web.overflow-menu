import React, { useState, useRef, useEffect, ReactNode, useLayoutEffect } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import styles from '../Styles/OverflowMenu.module.css';
import IOverflowMenuItem from '../Data/IOverflowMenuItem';

interface IProps {
  icon?: ReactNode;
  portal?: HTMLElement;
  className?: string;
  items: IOverflowMenuItem[];
}

// Variants for the main menu container
const menuVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 40,
      staggerChildren: 0.07,
    },
  },
  closed: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.2,
    },
  },
};

// Variants for the individual menu items
const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
  closed: {
    opacity: 0,
    y: 10,
    transition: { duration: 0.2 },
  },
};

interface IOverflowMenuItemProps {
  item: IOverflowMenuItem;
  index: number;
  itemVariants: Variants;
  setOpen: (open: boolean) => void;
}

const OverflowMenuItem: React.FC<IOverflowMenuItemProps> = ({ item, index, itemVariants, setOpen }) => {
  return (
    <motion.button
      key={index}
      role="menuitem"
      onClick={() => {
        if (item.onClick) item.onClick();
        setOpen(false);
      }}
      variants={itemVariants}
      whileHover={{ backgroundColor: 'rgba(0, 188, 212, 0.1)', color: '#024b59' }} // Startupy and modern hover colors
      whileTap={{ scale: 0.98, backgroundColor: 'rgba(2, 75, 89, 0.1)' }} // Subtle press effect
      transition={{ duration: 0.1 }}
    >
      {item.content}
    </motion.button>
  );
};

// Internal component for the default animated icon
const DefaultIcon = ({ open }: { open: boolean }) => {
  return (
    <motion.div
      className={styles.dotsWrapper}
    >
      <motion.span
        className={styles.dot}
        animate={open ? { x: [0, 4, 0], backgroundColor: "#00BCD4" } : { y: [0, -4, 0], backgroundColor: "#024b59" }}
        transition={{
          delay: 0 * 0.1,
          duration: 0.3,
          ease: "easeInOut",
        }}
        custom={0}
      />
      <motion.span
        className={styles.dot}
        animate={open ? { x: [0, 4, 0], backgroundColor: "#00BCD4" } : { y: [0, -4, 0], backgroundColor: "#024b59" }}
        transition={{
          delay: 1 * 0.1,
          duration: 0.3,
          ease: "easeInOut",
        }}
        custom={1}
      />
      <motion.span
        className={styles.dot}
        animate={open ? { x: [0, 4, 0], backgroundColor: "#00BCD4" } : { y: [0, -4, 0], backgroundColor: "#024b59" }}
        transition={{
          delay: 2 * 0.1,
          duration: 0.3,
          ease: "easeInOut",
        }}
        custom={2}
      />
    </motion.div>
  );
};

const OverflowMenu: React.FC<IProps> = ({ icon = '⋮', portal, className, items }) => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuPos, setMenuPos] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });

  // Handle closing menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        open &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node) &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  // Handle Escape key to close
  useEffect(() => {
    if (!open) return;
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [open]);

  // Handle positioning and focus management
  useLayoutEffect(() => {
    if (open) {
      if (!triggerRef.current || !menuRef.current) return;

      // Position menu
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const menuWidth = menuRef.current.offsetWidth; // Get menu width
      const menuHeight = menuRef.current.offsetHeight;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      const breakpoint = 768; // Define a breakpoint for mobile vs desktop

      let newTop = triggerRect.bottom + window.scrollY + 4; // Default to opening downwards
      let newLeft = 0;

      // Flip upwards if not enough space below
      if (triggerRect.bottom + menuHeight > viewportHeight) {
        newTop = triggerRect.top + window.scrollY - menuHeight - 4;
      }

      // Responsive left positioning
      if (viewportWidth < breakpoint) {
        // Mobile: Center horizontally
        newLeft = (viewportWidth - menuWidth) / 2 + window.scrollX;
      } else {
        // Desktop: Default to aligning to trigger's right, with an offset
        let desiredLeft = triggerRect.right + window.scrollX - 160;

        // Check if menu would be cut off on the right
        if (desiredLeft + menuWidth > viewportWidth + window.scrollX) {
          // If cut off, align to trigger's left
          newLeft = triggerRect.left + window.scrollX - menuWidth;
        } else {
          newLeft = desiredLeft;
        }
      }

      setMenuPos({
        top: newTop,
        left: newLeft,
      });

      // Focus first item
      const firstItem = menuRef.current?.querySelector('[role="menuitem"]') as HTMLButtonElement;
      firstItem?.focus();
    } else {
      // Return focus to trigger on close
      triggerRef.current?.focus();
    }
  }, [open]);

  const handleMenuKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
      const items = Array.from(menuRef.current?.querySelectorAll('[role="menuitem"]') as NodeListOf<HTMLButtonElement>);
      const activeIndex = items.findIndex((item) => item === document.activeElement);
      let nextIndex = -1;

      if (e.key === 'ArrowDown') {
        nextIndex = (activeIndex + 1) % items.length;
      } else if (e.key === 'ArrowUp') {
        nextIndex = (activeIndex - 1 + items.length) % items.length;
      }

      items[nextIndex]?.focus();
    }
  };

  const menuContent = (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={menuRef}
          role="menu"
          className={styles.menu}
          style={{ position: 'absolute', top: menuPos.top, left: menuPos.left }}
          variants={menuVariants}
          initial="closed"
          animate="open"
          exit="closed"
          onKeyDown={handleMenuKeyDown}
        >
          {items.map((item, index) => (
            <OverflowMenuItem
              key={index}
              item={item}
              index={index}
              itemVariants={itemVariants}
              setOpen={setOpen}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <button
        ref={triggerRef}
        className={`${styles.trigger} ${className}`}
        onClick={() => setOpen(!open)}
        aria-haspopup="true"
        aria-expanded={open}
      >
        <motion.div whileHover={{ scale: 1.2 }}>
          {icon === '⋮' ? (
            <DefaultIcon open={open} />
          ) : (
            <motion.div
              animate={{ rotate: open ? 90 : 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 40 }}
            >
              {icon}
            </motion.div>
          )}
        </motion.div>
      </button>
      {portal ? ReactDOM.createPortal(menuContent, portal) : menuContent}
    </>
  );
};

export default OverflowMenu;
