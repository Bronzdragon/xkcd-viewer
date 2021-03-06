import React from "react"
import cs, { csType } from "cs"

import styles from './throbber.module.css'

type ThrobberProps = {
    color?: string
    className?: csType
}

const Throbber: React.FC<ThrobberProps> = ({ color, className }) => <div className={cs(styles.container, className)}>
    <div style={{ background: color }} />
    <div style={{ background: color }} />
    <div style={{ background: color }} />
</div>
export default Throbber

// Throbber based on examples from here: https://loading.io/css/