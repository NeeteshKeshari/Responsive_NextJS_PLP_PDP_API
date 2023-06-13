import React from 'react';
import styles from './styles.module.css'
const Label = ({ content, htmlFor }) => {
  return (
    <label htmlFor={htmlFor} className={styles.zakInputLabel}>
      {content}<span className="text-error -mt-1 inline-block">*</span>
    </label>
  );
};

export default Label;