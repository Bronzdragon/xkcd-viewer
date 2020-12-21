import React, { useState } from 'react'
//import Thumbnail from './thumbnail'
import Preview from './preview/preview'
import styles from './overview.module.css'

type OverviewProps = {
    onOpenComic: (id: number) => void
    latestComic: number
}

const generateThumbnails = (num: number, index: number, onOpenComic: (id: number) => void, ascending = false) => {
    const incrementer = ascending ? 1 : -1
    const newPreviews: JSX.Element[] = []

    for (let i = index; i > index + (num * incrementer); i += incrementer) {
        newPreviews.push(<Preview key={i} onClick={() => onOpenComic(i)} comicId={i} />,)
    }

    return newPreviews
}

const Overview: React.FC<OverviewProps> = ({ onOpenComic, latestComic }) => {
    const [previews, setPreviews] = useState<JSX.Element[]>([])
    if(!previews.length)
        setPreviews(generateThumbnails(50, latestComic, onOpenComic))

    return <div onScroll={(event) => console.log("Scrolling!", event)}>
        Most recent comic: {latestComic}!
        <div className={styles.container}>
            {previews}
        </div>
    </div>
}

export default Overview

