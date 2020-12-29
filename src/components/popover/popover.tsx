import React from 'react';
import styles from './popover.module.css';

export function Popover({ open = false, onClose, children }: PopoverProps) {
    if (!open)
        return null;

    return <div className={styles.background} onClick={onClose}>
        {children}
    </div>;
}
type PopoverProps = {
    open?: boolean;
    onClose?: () => void;
    children: React.ReactNode;
};
