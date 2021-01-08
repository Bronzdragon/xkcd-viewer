import React, { useEffect, useState } from 'react';
import fetchComicInfo, { preloadImage, xkcdInfo } from './XKCDApiApi'
import { SimpleDateRange, SimpleDate, getSimpleDateRange, dateToSimpleDate, simpleDateToDate, compareSimpleDate, adjustSimpleDate } from './simple_date'
import getFavourites from './favourites';

import ErrorView, {ErrorQueue} from './components/error-view/error-view'
import Overview from './components/overview';
import DetailView from './components/detail_view/detail_view';

import styles from './App.module.css'

const errorQueue = new ErrorQueue()

function App() {
    const [dateRange, setDateRange] = useState<SimpleDateRange>(getSimpleDateRange())
    const [latestComic, setLatestComic] = useState<xkcdInfo>()
    const [firstComic, setFirstComic] = useState<xkcdInfo>()
    const [openComic, setOpenComic] = useState<number | null>(null)
    const [comicInfoArray, setComicInfoArray] = useState<[number, Promise<xkcdInfo>][]>([])
    const [viewingFavourites, setViewingFavourites] = useState(false)

    // Fetch first and last comic
    useEffect(() => {
        fetchComicInfo().then(info => setLatestComic(info)).catch((err: Error) => errorQueue.addItem(`Cannot load comic. [${err.message}]`))
        fetchComicInfo(1).then(info => setFirstComic(info)).catch((err: Error) => errorQueue.addItem(`Cannot load latest comic. [${err.message}]`))
    }, [])

    useEffect(() => {
        if (!latestComic) return; // Still loading.
        if (viewingFavourites) {
            const result = getFavourites()
                .map<[number, Promise<xkcdInfo>]>(num => [num, fetchComicInfo(num)])
                .sort(([a], [b]) => a - b)
            setComicInfoArray(result)
        } else {
            getComicIdsInRange(dateRange)
                .then(comicRange => {
                    setComicInfoArray(range(...comicRange).map(num => [num, fetchComicInfo(num)]))
                }).catch((err: Error) => {
                    errorQueue.addItem(`Couldn't get all the comics in this date range. [${err.message}]`)
                })
        }
    }, [dateRange, latestComic, setComicInfoArray, viewingFavourites])

    // Preload the next/previous comic pages, if there are any.
    useEffect(() => {
        if (!openComic) return;
        if (openComic + 1 <= (latestComic?.number ?? 0)) {
            fetchComicInfo(openComic + 1)
                .then(({ img }) => preloadImage(img))
                .catch((err: Error) => errorQueue.addItem(`Could not preload next image. [${err.message}]`))
        }
        if (openComic - 1 >= 1) {
            fetchComicInfo(openComic - 1)
                .then(({ img }) => preloadImage(img))
                .catch((err: Error) => errorQueue.addItem(`Could not preload previous image. [${err.message}]`))
        }
    }, [openComic, latestComic])

    // Check if our openComic value exceeds our current date range. If so, adjust the dateRange to include it
    useEffect(() => {
        if (!openComic || viewingFavourites) return;
        fetchComicInfo(openComic)
            .then(info => {
                const comicMonth = dateToSimpleDate(info.date)
                if (compareSimpleDate(comicMonth, dateRange.from) < 0) {
                    // If the date is before our current range
                    setDateRange(range => getSimpleDateRange(adjustSimpleDate(range.from, -1), range.to))
                }
                if (compareSimpleDate(comicMonth, dateRange.to) > 0) {
                    // If the date is after our current range
                    setDateRange(range => getSimpleDateRange(range.from, adjustSimpleDate(range.to, 1)))
                }
            })
            .catch((err: Error) => {
                errorQueue.addItem(`Encountered an error updating this page. [${err.message}]` )
            })
    }, [openComic, dateRange, setDateRange, viewingFavourites])

    if (!latestComic || !firstComic) {
        // No comics loaded yet...
        return <>
            <ErrorView queue={errorQueue} />
            ...loading
        </>
    }

    return <div className={styles.container}>
        <ErrorView queue={errorQueue} />
        <Overview
            comics={comicInfoArray}
            onOpenComic={setOpenComic}
            dateRange={dateRange}
            validDateRange={getSimpleDateRange(firstComic.date, latestComic.date)}
            onUpdateDateRange={(range) => {setDateRange(range); setComicInfoArray([])} }
            viewingFavourites={viewingFavourites}
            onToggleFavourites={() => { setViewingFavourites(viewingFavs => !viewingFavs) }}
        />
        {openComic && <DetailView
            number={openComic}
            nextComic={() => setOpenComic(num => Math.min(latestComic.number, (num ?? 0) + 1))}
            previousComic={() => setOpenComic(num => Math.max(1, (num ?? 0) - 1))}
            goBackHome={() => setOpenComic(null)}
            errorQueue={errorQueue}
        />}
    </div>
}

export default App;

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
