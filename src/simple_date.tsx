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
