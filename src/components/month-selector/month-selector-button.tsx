import { isSimpleDateRange, SimpleDate, SimpleDateRange } from "../overview";
import { monthNames } from "./month-selector";

type SelectorElementProps = {
    onOpen?: () => void;
    dateRange: SimpleDateRange;
};

export function MonthSelectorButton({ onOpen, dateRange: { from, to } }: SelectorElementProps) {
    if (compareSimpleDate(from, to) === 0) {
        return <span onClick={onOpen}>{monthToString(from)}</span>;
    }

    return <span onClick={onOpen}>From: {monthToString(from)} — To: {monthToString(to)}</span>;
}

function monthToString({month, year}: SimpleDate): string {
    // Month objects are 1-indexed, arrays are 0-indexed.
    return `${monthNames[month - 1]} ${year}`
}

function compareSimpleDate(range: SimpleDateRange): number
function compareSimpleDate(first: SimpleDate, second:SimpleDate): number
function compareSimpleDate(arg: SimpleDate | SimpleDateRange, second?: SimpleDate): number {
    if(isSimpleDateRange(arg)){
        return compareSimpleDate(arg.from, arg.to)
    }

    // Typescript is unhappy with the second argument possibly being undefined.
    // This is a shortcoming of the type system, though.
    if(arg.year !== second!.year) return Math.sign(arg.year - second!.year)
    return Math.sign(arg.month - second!.month)
}
