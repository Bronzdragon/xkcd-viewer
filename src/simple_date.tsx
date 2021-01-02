export type SimpleDate = {
    year: number;
    month: number;
};

export type SimpleDateRange = {
    from: SimpleDate;
    to: SimpleDate;
};

export function isSimpleDateRange(obj: unknown): obj is SimpleDateRange {
    return (
        typeof obj == 'object'
        && obj != null
        && isSimpleDate((obj as { from: unknown }).from)
        && isSimpleDate((obj as { to: unknown }).to)
    )
}

export function isSimpleDate(obj: unknown): obj is SimpleDate {
    return (
        typeof obj === 'object'
        && obj !== null
        && typeof (obj as { year: unknown }).year === 'number'
        && typeof (obj as { month: unknown }).month === 'number'
    )
}

export function isDate(obj: unknown): obj is Date {
    return obj instanceof Date
}

export function getSimpleDateRange(from?: Date, to?: Date): SimpleDateRange;
export function getSimpleDateRange(from: SimpleDate, to: SimpleDate): SimpleDateRange;
export function getSimpleDateRange(from: SimpleDate | Date = new Date(), to: SimpleDate | Date = new Date()): SimpleDateRange {
    if (isSimpleDate(from) && isSimpleDate(to)) {
        return { from, to }
    }

    // as Date is required because the type system isn't quite clever enough
    return { from: dateToSimpleDate(from as Date), to: dateToSimpleDate(to as Date) }
}


export function compareSimpleDate(range: SimpleDateRange): number
export function compareSimpleDate(first: SimpleDate, second:SimpleDate): number
export function compareSimpleDate(arg: SimpleDate | SimpleDateRange, second?: SimpleDate): number {
    if(isSimpleDateRange(arg)){
        return compareSimpleDate(arg.from, arg.to)
    }

    // Typescript is unhappy with the second argument possibly being undefined.
    // This is a shortcoming of the type system, though.
    if(arg.year !== second!.year) return Math.sign(arg.year - second!.year)
    return Math.sign(arg.month - second!.month)
}

export function dateToSimpleDate(date: Date): SimpleDate {
    return {
        year: date.getFullYear(),
        month: date.getMonth() + 1, // The Date() month counting is 0-indexed
    }
}

export function simpleDateToDate({ year, month }: SimpleDate, endOfMonth = false): Date {
    if (endOfMonth) {
        // year, month, day, hour, minute, second, milisecond
        // Month isn't subtracted one because it's 0-indexed, but we need the next one to loop back around
        return new Date(year, month, 1, 0, 0, 0, -1)
    }
    return new Date(year, month - 1)
}

export function adjustSimpleDate({year, month}: SimpleDate, amount = 1) {
    // Don't forget that SimpleDate months are 1-indexed.
    const months = year * 12 + (month - 1) + amount;

    return {
        month: 1 + (months % 12),
        year: Math.floor(months / 12),
    }
}

export function adjustSimpleDateRange({ from, to }: SimpleDateRange, amount = 1): SimpleDateRange {
    return { from: adjustSimpleDate(from, amount), to: adjustSimpleDate(to, amount) }
}
