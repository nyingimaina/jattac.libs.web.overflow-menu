import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { motion } from 'framer-motion';
import IOverflowMenuItem from '../Data/IOverflowMenuItem';
import { evaluate } from '../Utils/Evaluate';
import { menuVariants, itemVariants } from './Animations';
import styles from '../Styles/OverflowMenu.module.css';

interface MenuRowProps {
  item: IOverflowMenuItem;
  index: number;
  portal: HTMLElement | null;
  renderMenuItem: (item: IOverflowMenuItem, index: number) => React.ReactNode;
}

const MenuRow: React.FC<MenuRowProps> = ({ item, index, portal, renderMenuItem }) => {
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

export default MenuRow;
