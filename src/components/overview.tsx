import React, { useEffect, useState } from 'react'
import Preview from './preview/preview'
import styles from './overview.module.css'
import Navigator from './navigator/navigator'
import fetchComicInfo, { xkcdInfo } from '../XKCDApiApi'

type OverviewProps = {
    onOpenComic?: (id: number) => void
    latestComic?: number
}

export type DateRange = [Date, Date]

const Overview: React.FC<OverviewProps> = ({ onOpenComic }: OverviewProps) => {
    const [firstComic, setFirstComic] = useState<xkcdInfo | null>(null)
    const [latestComic, setLatestComic] = useState<xkcdInfo | null>(null)
    const [dateRange, setDateRange] = useState<DateRange>(getDateRange())
    const [comicRange, setComicRange] = useState<xkcdInfo[]>([])

    useEffect(() => {
        fetchComicInfo().then(setLatestComic)
        fetchComicInfo(1).then(setFirstComic)
    }, [])

    useEffect(() => {
        getComicIdsInRange(dateRange).then(result => {
            Promise.all(
                range(...result)
                    .map(num => fetchComicInfo(num))
            ).then(setComicRange)
        })
    }, [dateRange])

    return <div>
        First comic: #{firstComic?.number} [{firstComic?.title}]<br />
        Most recent comic: #{latestComic?.number} [{latestComic?.title}]!

        <div className={styles.container}>
            {comicRange.map(info => <Preview 
                key={info.number}
                comicId={info.number}
                onClick={() => { if (onOpenComic) { onOpenComic(info.number) } }}
            />)}
        </div>
        <Navigator dateRange={dateRange}
            viewFavourites={() => console.log("Viewing favourites!")}
            setMonthRange={(start, end) => setDateRange([start, end])}
            validYearRange={[firstComic?.date.getFullYear() ?? 0, latestComic?.date.getFullYear() ?? 0]}
        />
    </div>
}

export default Overview

// const distanceFromBottom = () => document.body.scrollHeight - (window.pageYOffset + document.documentElement.clientHeight)

// const generateThumbnails = (num: number, index: number, onOpenComic: (id: number) => void, ascending = false) => {
//     const incrementer = ascending ? 1 : -1
//     const newPreviews: JSX.Element[] = []

//     for (let i = index; i > index + (num * incrementer); i += incrementer) {
//         newPreviews.push(<Preview key={i} onClick={() => onOpenComic(i)} comicId={i} />,)
//     }

//     return newPreviews
// }

function getDateRange(start = new Date(), end = new Date()): DateRange {
    return [
        new Date(start.getFullYear(), start.getMonth(), 1), // beginning of current month
        new Date(end.getFullYear(), end.getMonth() + 1, 1) // end of current month
    ]
}

async function getComicIdsInRange([start, end]: DateRange)/*: Promise<[number, number]>*/ {
    if (start > end) {
        // Swap the dates, so the lower one is on the left
        [start, end] = [end, start]
    }
    const firstNumber = 1
    const [{ date: firstDate }, { date: lastDate, number: lastNumber }] = await Promise.all([fetchComicInfo(firstNumber), fetchComicInfo()])

    const timeRange = lastDate.getTime() - firstDate.getTime()
    const startDateDelta = (start.getTime() - firstDate.getTime()) / timeRange
    const endDateDelta = (end.getTime() - firstDate.getTime()) / timeRange

    const estimatedStartComicIndex = clamp(Math.round(startDateDelta * lastNumber), 1, lastNumber)
    const estimatedEndComicIndex = clamp(Math.round(endDateDelta * lastNumber), 1, lastNumber)

    return Promise.all([
        findBoundaryComic(start, estimatedStartComicIndex, lastNumber, false),
        findBoundaryComic(end, estimatedEndComicIndex, lastNumber, true),
    ])
}

async function findBoundaryComic(date: Date, estimatedIndex: number, lastComic: number, isEnd: boolean = false) {
    // Make the index odd, so we can reliably step 2 indices at a time
    let index = clamp(estimatedIndex % 2 ? estimatedIndex : estimatedIndex + 1, 1, lastComic)
    while ((await fetchComicInfo(index)).date > date) {
        if (index === 1) break
        index -= 2
    }
    while ((await fetchComicInfo(index)).date < date) {
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