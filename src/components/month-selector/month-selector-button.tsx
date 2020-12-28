import { Month, MonthRange, monthNames } from './month-selector';

type SelectorElementProps = {
    onOpen?: () => void;
    dateRange: MonthRange;
};

export function MonthSelectorButton({ onOpen, dateRange: { from, to } }: SelectorElementProps) {
    if (compareMonths(from, to) === 0) {
        return <span onClick={onOpen}>{monthToString(from)}</span>;
    }

    return <span onClick={onOpen}>From: {monthToString(from)} — To: {monthToString(to)}</span>;
}

function compareMonths(first: Month, second: Month) {
    if(first.year !== second.year){ 
        return Math.sign(first.year - second.year)
    }

    return Math.sign(first.month - second.month)
}

export function monthToString({month, year}: Month): string {
    // Month objects are 1-indexed, arrays are 0-indexed.
    return `${monthNames[month - 1]} ${year}`
}