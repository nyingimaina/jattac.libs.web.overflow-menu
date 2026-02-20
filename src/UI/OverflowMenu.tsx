import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { motion, AnimatePresence } from 'framer-motion';
import IOverflowMenuItem from '../Data/IOverflowMenuItem';
import DefaultIcon from './DefaultIcon';
import MenuRow from './MenuRow';
import { menuVariants } from './Animations';
import styles from '../Styles/OverflowMenu.module.css';

interface OverflowMenuProps {
  items: IOverflowMenuItem[];
  icon?: React.ReactNode;
  className?: string;
  portal?: HTMLElement;
}

const OverflowMenu: React.FC<OverflowMenuProps> = ({ items, icon, className = '', portal = null }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const renderMenuItem = (item: IOverflowMenuItem, index: number) => {
    return <MenuRow key={index} item={item} index={index} portal={portal} renderMenuItem={renderMenuItem} />;
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
