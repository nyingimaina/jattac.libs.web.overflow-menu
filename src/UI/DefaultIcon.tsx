import React from 'react';
import { motion } from 'framer-motion';
import { dotVariants } from './Animations';
import styles from '../Styles/OverflowMenu.module.css';

const DefaultIcon: React.FC = () => {
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

export default DefaultIcon;
