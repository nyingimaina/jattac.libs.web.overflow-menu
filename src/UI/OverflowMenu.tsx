import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IOverflowMenuItem } from '../Data/IOverflowMenuItem';
import styles from '../Styles/OverflowMenu.module.css';
import { createPortal } from 'react-dom';

interface OverflowMenuProps {
    items: IOverflowMenuItem[];
    icon?: React.ReactNode;
    className?: string;
    portal?: HTMLElement;
}

const OverflowMenu: React.FC<OverflowMenuProps> = ({
    items,
    icon = '⋮',
    className = '',
    portal = null,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isInitialRender, setIsInitialRender] = useState(true);
    const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
    const menuRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        setIsInitialRender(false);
    }, []);

    const toggleMenu = (event: React.MouseEvent) => {
        event.stopPropagation();
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (triggerRef.current && triggerRef.current.contains(event.target as Node)) {
            return;
        }
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    useEffect(() => {
        if (isOpen && triggerRef.current && menuRef.current) {
            const triggerRect = triggerRef.current.getBoundingClientRect();
            const menuRect = menuRef.current.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            let top = triggerRect.bottom;
            let left = triggerRect.left;

            if (left + menuRect.width > viewportWidth) {
                left = viewportWidth - menuRect.width - 10;
                if (left < 0) left = 10;
            }

            if (top + menuRect.height > viewportHeight) {
                top = triggerRect.top - menuRect.height - 10;
                if (top < 0) top = 10;
            }

            setMenuPosition({ top, left });
        }
    }, [isOpen, menuRef.current]);

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
        hover: { // New hover variant for menu items
            backgroundColor: 'rgba(2, 75, 89, 0.05)', // Matching CSS
            scale: 1.03, // Matching CSS
        }
    };

    const triggerHoverVariants = { // New hover variant for trigger button
        hover: {
            color: '#016a80', // Matching CSS
            backgroundColor: 'rgba(2, 75, 89, 0.05)', // Matching CSS
        }
    };

    const menuContent = (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    ref={menuRef}
                    className={styles.menu}
                    style={{
                        position: 'fixed',
                        top: `${menuPosition.top}px`,
                        left: `${menuPosition.left}px`,
                    }}
                    variants={menuVariants}
                    initial={isInitialRender ? false : "hidden"}
                    animate="visible"
                    exit="hidden"
                >
                    {items.map((item, index) => (
                        <motion.button
                            key={index}
                            className={styles.menuItem}
                            onClick={() => {
                                item.onClick?.();
                                setIsOpen(false);
                            }}
                            variants={itemVariants}
                            whileHover="hover" // Apply hover variant
                        >
                            {item.content}
                        </motion.button>
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    );

    return (
        <div className={styles.overflowMenu}>
            <motion.button // Changed to motion.button
                ref={triggerRef}
                onClick={toggleMenu}
                className={`${styles.trigger} ${className}`}
                aria-haspopup="true"
                aria-expanded={isOpen}
                whileHover="hover" // Apply hover variant
                variants={triggerHoverVariants} // Apply trigger hover variants
            >
                {icon}
            </motion.button>
            {portal ? createPortal(menuContent, portal) : menuContent}
        </div>
    );
};

export default OverflowMenu;