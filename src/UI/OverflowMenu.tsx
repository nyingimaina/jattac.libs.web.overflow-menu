import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import IOverflowMenuItem from '../Data/IOverflowMenuItem';
import { evaluate } from '../Utils/Evaluate';
import styles from '../Styles/OverflowMenu.module.css';

const DefaultIcon = () => {
  const dotVariants: Variants = {
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

  return (
    <motion.div className={styles.dotsWrapper} initial="rest" whileHover="hover" animate="rest">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className={styles.dot}
          variants={dotVariants}
          custom={i}
          transition={{ delay: i * 0.05 }}
        />
      ))}
    </motion.div>
  );
};

interface OverflowMenuProps {
  items: IOverflowMenuItem[];
  icon?: React.ReactNode;
  className?: string;
  portal?: HTMLElement;
}

const OverflowMenu: React.FC<OverflowMenuProps> = ({ items, icon, className = '', portal = null }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const menuVariants = {
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

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  const MenuRow: React.FC<{
    item: IOverflowMenuItem;
    index: number;
    renderMenuItem: (item: IOverflowMenuItem, index: number) => React.ReactNode;
  }> = ({ item, index, renderMenuItem }) => {
    const [isVisible, setIsVisible] = React.useState<boolean | null>(null);
    const [isEnabled, setIsEnabled] = React.useState<boolean | null>(null);

    React.useEffect(() => {
      let isMounted = true;
      const checkVisibility = async () => {
        const visible = await evaluate(item.visible, true);
        if (isMounted) setIsVisible(visible);
      };
      const checkEnabled = async () => {
        const enabled = await evaluate(item.enabled, true);
        if (isMounted) setIsEnabled(enabled);
      };

      checkVisibility();
      checkEnabled();

      return () => {
        isMounted = false;
      };
    }, [item.visible, item.enabled]);

    if (isVisible === false) return null;

    const disabled = isEnabled === false;

    if (item.children && item.children.length > 0) {
      return (
        <DropdownMenu.Sub key={index}>
          <DropdownMenu.SubTrigger asChild className={styles.menuItem} disabled={disabled}>
            <motion.button variants={itemVariants} className={styles.subTrigger}>
              {item.content}
              <span className={styles.rightArrow}>▶</span>
            </motion.button>
          </DropdownMenu.SubTrigger>
          <DropdownMenu.Portal container={portal}>
            <DropdownMenu.SubContent asChild className={styles.menu} sideOffset={2} alignOffset={-5}>
              <motion.div variants={menuVariants} initial="hidden" animate="visible" exit="hidden">
                {item.children.map((child, childIndex) => renderMenuItem(child, childIndex))}
              </motion.div>
            </DropdownMenu.SubContent>
          </DropdownMenu.Portal>
        </DropdownMenu.Sub>
      );
    }

    return (
      <DropdownMenu.Item
        key={index}
        asChild
        className={styles.menuItem}
        disabled={disabled}
        onSelect={() => {
          item.onClick?.();
        }}
      >
        <motion.button variants={itemVariants}>{item.content}</motion.button>
      </DropdownMenu.Item>
    );
  };

  const renderMenuItem = (item: IOverflowMenuItem, index: number) => {
    return <MenuRow key={index} item={item} index={index} renderMenuItem={renderMenuItem} />;
  };

  const content = (
    <AnimatePresence>
      {isOpen && (
        <DropdownMenu.Portal container={portal} forceMount>
          <DropdownMenu.Content asChild className={styles.menu} sideOffset={5} align="end">
            <motion.div variants={menuVariants} initial="hidden" animate="visible" exit="hidden">
              {items.map((item, index) => renderMenuItem(item, index))}
            </motion.div>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      )}
    </AnimatePresence>
  );

  return (
    <DropdownMenu.Root open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenu.Trigger asChild className={`${styles.trigger} ${className}`}>
        <motion.button
          aria-haspopup="true"
          aria-expanded={isOpen}
          whileHover={{
            scale: 1.1,
            y: -2,
            color: '#016a80',
            backgroundColor: 'rgba(2, 75, 89, 0.05)',
            transition: {
              type: 'spring',
              stiffness: 400,
              damping: 15,
            },
          }}
        >
          {icon || <DefaultIcon />}
        </motion.button>
      </DropdownMenu.Trigger>
      {content}
    </DropdownMenu.Root>
  );
};

export default OverflowMenu;
