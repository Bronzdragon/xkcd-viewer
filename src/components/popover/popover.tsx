import React, { useEffect, useRef } from 'react';
import styles from './popover.module.css';

type PopoverProps = {
    open?: boolean;
    onDismiss?: () => void;
    children: React.ReactNode;
};

export default function Popover({ open = false, onDismiss, children }: PopoverProps) {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if(!onDismiss) return;
        const handler = (event: MouseEvent) => {
            if (!ref.current?.contains(event.target as Node)) { onDismiss() }
        }
        window.addEventListener('click', handler)
        return () => { window.removeEventListener('click', handler) }
    }, [onDismiss])

    if (!open)
        return null;

    return <div className={styles.background}>
        <span ref={ref}>{children} </span>
    </div>;
}
