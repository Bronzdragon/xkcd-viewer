import React from 'react';
import Thumbnail from './thumbnail';
import styles from './overview.module.css'

type OverviewProps = {
    onOpenComic?: (id: number) => void
    latestComic: number
}

const Overview: React.FC<OverviewProps> = ({onOpenComic, latestComic}) => {
    if(latestComic < 1){
        return <div>Loading latest comic...</div>
    }

    return <div onScroll={(event) => console.log("Scrolling!", event)}>
        Most recent comic: {latestComic}!
        <div className={styles.thumbnailContainer}>
            <Thumbnail className={styles.thumbnail} onClick={() => { if (onOpenComic) onOpenComic(latestComic) }} comicId={latestComic} />
            <Thumbnail onClick={() => { if (onOpenComic) onOpenComic(latestComic - 1) }} comicId={latestComic - 1} />
            <Thumbnail onClick={() => { if (onOpenComic) onOpenComic(latestComic - 2) }} comicId={latestComic - 2} />
            <Thumbnail onClick={() => { if (onOpenComic) onOpenComic(latestComic - 3) }} comicId={latestComic - 3} />
        </div>
    </div>
}
export default Overview

