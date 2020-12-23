import React, { useEffect, useState } from 'react'
import Preview from './preview/preview'
import styles from './overview.module.css'
import Navigator from './navigator/navigator'
import fetchComicInfo, { xkcdInfo } from '../XKCDApiApi'

type OverviewProps = {
    onOpenComic?: (id: number) => void
    latestComic?: number
}

type dateRange = [Date, Date]

const Overview: React.FC<OverviewProps> = (props: OverviewProps) => {
    const [firstComic, setFirstComic] = useState<xkcdInfo|null>(null)
    const [latestComic, setLatestComic] = useState<xkcdInfo|null>(null)
    const [dateRange, setDateRange] = useState<dateRange>(getDefaultRange())


    useEffect(() => {
        fetchComicInfo().then(setLatestComic)
        fetchComicInfo(1).then(setFirstComic)
    }, [])
    // const [previews, setPreviews] = useState<JSX.Element[]>([])

    // useEffect(() => {
    //     const scrollHandler = () => {
    //         if(distanceFromBottom() < 400) {
    //             setPreviews(previews => [...previews, ...generateThumbnails(5, latestComic - previews.length, onOpenComic)])
    //         }
    //     }
    //     document.addEventListener("scroll", scrollHandler )
    //     return () => document.removeEventListener("scroll", scrollHandler)
    // })

    // useEffect(() => {
    //     if(distanceFromBottom() < 400) {
    //         setPreviews(previews => [...previews, ...generateThumbnails(3, latestComic - previews.length, onOpenComic)])
    //     }
    // }, [previews, latestComic, onOpenComic])

    return <div>
        First comic: #{firstComic?.number} [{firstComic?.title}]<br />
        Most recent comic: #{latestComic?.number} [{latestComic?.title}]!

        <div className={styles.container}>
            {/* {previews} */}
        </div>
        <Navigator setMonth={month => console.log(month)} viewFavourites={() => console.log("Here are your favourites: Strawberry icecream")} />
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

function getDefaultRange(): dateRange {
    const now = new Date()
    return [
        new Date(now.getFullYear(), now.getMonth(), 1), // beginning of current month
        new Date(now.getFullYear(), now.getMonth() + 1, 0) // end of current month
    ]
}

async function getComicIdsInRange([start, end]: dateRange): Promise<[number, number]> {
    const [{date: firstDate}, {date: lastDate, number: lastNumber}] = await Promise.all([fetchComicInfo(1), fetchComicInfo()])

    const timeRange = lastDate.getTime() - firstDate.getTime()
    const startDateDelta = (start.getTime() - lastDate.getTime()) / timeRange
    const endDateDelta = (end.getTime() - lastDate.getTime()) / timeRange

    const estimatedStartComicIndex = startDateDelta * lastNumber
    const estimatedEndComicIndex = endDateDelta * lastNumber

    return Promise.all([
        findBoundaryComic(start, estimatedStartComicIndex, lastNumber),
        findBoundaryComic(end, estimatedEndComicIndex, lastNumber, true)
    ])
}

async function findBoundaryComic(date: Date, estimatedIndex: number, lastComic: number, isEnd: boolean = false){
    // Make the index odd, so we can reliably step 2 indices at a time
    let index = estimatedIndex % 2 ? estimatedIndex : estimatedIndex + 1
    while ((await fetchComicInfo(index)).date > date) {
        if(index === 1) break
        index -= 2
    }
    while ((await fetchComicInfo(index)).date < date) {
        if(index === lastComic) return lastComic
        index++
    }
    return index + (isEnd ? -1 : 0);
}