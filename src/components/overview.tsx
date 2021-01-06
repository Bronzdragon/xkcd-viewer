import { FC } from 'react'
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
    viewingFavourites?: boolean
}

const Overview: FC<OverviewProps> = ({ dateRange, comics, onOpenComic, onUpdateDateRange, onToggleFavourites, validDateRange, viewingFavourites }: OverviewProps) => {
    return <>
        <div className={styles.container}>
            {comics.length === 0 ? "loading..." : ""}
            {comics.map(([id, info]) => <Preview key={id} info={info} onOpenComic={onOpenComic} />)}
        </div>
        <Navigator
            viewingFavourites={viewingFavourites}
            dateRange={dateRange}
            onToggleViewFavourites={() => onToggleFavourites && onToggleFavourites()}
            setMonthRange={(range) => onUpdateDateRange && onUpdateDateRange(range)}
            validDateRange={validDateRange}
        />
    </>
}

export default Overview

