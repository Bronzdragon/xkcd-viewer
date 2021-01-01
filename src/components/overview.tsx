import React, { useEffect, useState } from 'react'
import Preview from './preview/preview'
import styles from './overview.module.css'
import Navigator from './navigator/navigator'
import fetchComicInfo, { xkcdInfo } from '../XKCDApiApi'

type OverviewProps = {
    onOpenComic?: (id: number) => void
    latestComic?: number
}

export type SimpleDate = {
    year: number
    month: number
}

export type SimpleDateRange = {
    from: SimpleDate
    to: SimpleDate
}

const Overview: React.FC<OverviewProps> = ({ onOpenComic }: OverviewProps) => {
    const [firstComic, setFirstComic] = useState<xkcdInfo | null>(null)
    const [latestComic, setLatestComic] = useState<xkcdInfo | null>(null)
    const [dateRange, setDateRange] = useState<SimpleDateRange>(getSimpleDateRange())
    const [comicRange, setComicRange] = useState<xkcdInfo[]>([])

    useEffect(() => {
        fetchComicInfo().then(setLatestComic)
        fetchComicInfo(1).then(setFirstComic)
    }, [])

    useEffect(() => {
        setComicRange([])

        getComicIdsInRange(dateRange).then(result => {
            Promise.all(
                range(...result)
                    .map(num => fetchComicInfo(num))
            ).then(setComicRange)
        })
    }, [dateRange])

    return <div>
        <div className={styles.container}>
            {comicRange.length === 0 ? "loading..." : ''}
            {comicRange.map(info => <Preview
                key={info.number}
                comicId={info.number}
                onClick={() => { if (onOpenComic) { onOpenComic(info.number) } }}
            />)}
        </div>
        <Navigator dateRange={dateRange}
            viewFavourites={() => console.log("Viewing favourites!")}
            setMonthRange={setDateRange}
            validDateRange={getSimpleDateRange(firstComic?.date, latestComic?.date)}
        />
    </div>
}

export default Overview


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

async function getComicIdsInRange({ from, to }: SimpleDateRange)/*: Promise<[number, number]>*/ {
    const firstNumber = 1
    const [{ date: firstDate }, { date: lastDate, number: lastNumber }] = await Promise.all([fetchComicInfo(firstNumber), fetchComicInfo()])
    const firstSimpleDate = dateToSimpleDate(firstDate)
    const firstMonthCount = firstSimpleDate.year * 12 + firstSimpleDate.month
    const lastSimpleDate = dateToSimpleDate(lastDate)
    const lastMonthCount = lastSimpleDate.year * 12 + lastSimpleDate.month

    const monthRange = lastMonthCount - firstMonthCount
    const startMonthCount = from.year * 12 + from.month
    const endMonthCount = to.year * 12 + to.month

    const startMonthDelta = (startMonthCount - firstMonthCount) / monthRange
    const endMonthDelta = (endMonthCount - firstMonthCount) / monthRange

    const estimatedStartComicIndex = clamp(Math.round(startMonthDelta * lastNumber), 1, lastNumber)
    const estimatedEndComicIndex = clamp(Math.round(endMonthDelta * lastNumber), 1, lastNumber)

    return Promise.all([
        findBoundaryComic(from, estimatedStartComicIndex, lastNumber, false),
        findBoundaryComic(to, estimatedEndComicIndex, lastNumber, true),
    ])
}

async function findBoundaryComic(date: SimpleDate, estimatedIndex: number, lastComic: number, isEnd: boolean = false) {
    let dateObj = simpleDateToDate(date, isEnd)
    // Make the index odd, so we can reliably step 2 indices at a time
    let index = clamp(estimatedIndex % 2 ? estimatedIndex : estimatedIndex + 1, 1, lastComic)
    while ((await fetchComicInfo(index)).date > dateObj) {
        if (index === 1) break
        index -= 2
    }

    while ((await fetchComicInfo(index)).date < dateObj) {
        if (index === lastComic) return lastComic
        index++
    }

    return index + (isEnd ? -1 : 0);
}

function range(start: number = 0, end: number = 1): ReadonlyArray<number> {
    const returnValue = []
    for (let i = start; i <= end; i++) {
        returnValue.push(i)
    }
    return returnValue
}

function clamp(num: number, min = 0, max = 1) {
    return Math.min(
        Math.max(num, min),
        max,
    )
}

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
