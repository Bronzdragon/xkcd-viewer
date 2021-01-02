import React from 'react'
import { xkcdInfo } from '../XKCDApiApi'
import { SimpleDateRange } from '../simple_date'

import Preview from './preview/preview'
import Navigator from './navigator/navigator'

import styles from './overview.module.css'

type OverviewProps = {
    onOpenComic?: (id: number) => void
    onUpdateDateRange?: (range: SimpleDateRange) => void
    onToggleFavourites?: () => void
    dateRange: SimpleDateRange
    validDateRange: SimpleDateRange
    comics: [number, Promise<xkcdInfo>][]

}

const Overview: React.FC<OverviewProps> = ({ dateRange, comics, onOpenComic, onUpdateDateRange, onToggleFavourites, validDateRange }: OverviewProps) => {
    return <>
        <div className={styles.container}>
            {comics.length === 0 ? "loading..." : ""}
            {comics.map(([id, info]) => <Preview key={id} info={info} onOpenComic={onOpenComic} />)}
        </div>
        <Navigator dateRange={dateRange}
            onToggleViewFavourites={() => onToggleFavourites && onToggleFavourites()}
            setMonthRange={(range) => onUpdateDateRange && onUpdateDateRange(range)}
            validDateRange={validDateRange}
        />
    </>
}

export default Overview

