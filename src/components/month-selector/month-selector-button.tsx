import { SimpleDate, SimpleDateRange, compareSimpleDate } from "../../simple_date";
import { monthNames } from "./month-selector";

import styles from './month-selector-button.module.css'

type SelectorElementProps = {
    onOpen?: () => void;
    dateRange: SimpleDateRange;
};

export function MonthSelectorButton({ onOpen, dateRange }: SelectorElementProps) {
    const text = (compareSimpleDate(dateRange) === 0)
        ? simpleDateToString(dateRange.from) : simpleDateRangeToString(dateRange)

    return <span className={styles.button} onClick={onOpen}>{text}</span>;
}

function simpleDateRangeToString({ from, to }: SimpleDateRange) {
    return `From: ${simpleDateToString(from)} — To: ${simpleDateToString(to)}`
}

function simpleDateToString({ month, year }: SimpleDate): string {
    // Month objects are 1-indexed, arrays are 0-indexed.
    return `${monthNames[month - 1]} ${year}`
}