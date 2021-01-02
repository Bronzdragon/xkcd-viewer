import React, { useEffect, useState } from 'react'
import Preview from './preview/preview'
import styles from './overview.module.css'
import Navigator from './navigator/navigator'
import fetchComicInfo, { xkcdInfo } from '../XKCDApiApi'
import { SimpleDateRange, getSimpleDateRange } from '../simple_date'

type OverviewProps = {
    onOpenComic?: (id: number) => void
    onUpdateDateRange?: (range: SimpleDateRange) => void
    latestComic?: number
    dateRange: SimpleDateRange
    validDateRange: SimpleDateRange
    comics: [number, Promise<xkcdInfo>][]
}

const Overview: React.FC<OverviewProps> = ({dateRange, comics, onOpenComic, onUpdateDateRange, latestComic, validDateRange }: OverviewProps) => {
    return <div>
        <div className={styles.container}>
            {comics.length === 0 ? "loading..." : ""}
            {comics.map(([id, info]) => <Preview key={id} info={info} onOpenComic={onOpenComic} />)}
        </div>
        <Navigator dateRange={dateRange}
            viewFavourites={() => console.log("Viewing favourites!")}
            setMonthRange={(range) => onUpdateDateRange && onUpdateDateRange(range)}
            validDateRange={validDateRange}
        />
    </div>
}

export default Overview

