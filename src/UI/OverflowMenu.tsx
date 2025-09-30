import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import IOverflowMenuItem from '../Data/IOverflowMenuItem';
import styles from '../Styles/OverflowMenu.module.css';
import { createPortal } from 'react-dom';

// A more dynamic and engaging animated icon to replace the static '⋮'
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
        <motion.div
            className={styles.dotsWrapper}
            initial="rest"
            whileHover="hover"
            animate="rest"
        >
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

const OverflowMenu: React.FC<OverflowMenuProps> = ({
    items,
    icon,
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
                            whileHover={{
                                scale: 1.05,
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
                            {item.content}
                        </motion.button>
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    );

    return (
        <div className={styles.overflowMenu}>
            <motion.button
                ref={triggerRef}
                onClick={toggleMenu}
                className={`${styles.trigger} ${className}`}
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
            {portal ? createPortal(menuContent, portal) : menuContent}
        </div>
    );
};

export default OverflowMenu;