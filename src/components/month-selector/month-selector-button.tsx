import { SimpleDate, SimpleDateRange, compareSimpleDate } from "../../simple_date";
import { monthNames } from "./month-selector";

type SelectorElementProps = {
    onOpen?: () => void;
    dateRange: SimpleDateRange;
};

export function MonthSelectorButton({ onOpen, dateRange }: SelectorElementProps) {
    if (compareSimpleDate(dateRange) === 0) {
        return <span onClick={onOpen}>{simpleDateToString(dateRange.from)}</span>;
    }

    return <span onClick={onOpen}>{simpleDateRangeToString(dateRange)}</span>;
}

function simpleDateToString({ month, year }: SimpleDate): string {
    // Month objects are 1-indexed, arrays are 0-indexed.
    return `${monthNames[month - 1]} ${year}`
}

function simpleDateRangeToString({ from, to }: SimpleDateRange) {
    return `From: ${simpleDateToString(from)} — To: ${simpleDateToString(to)}`
}