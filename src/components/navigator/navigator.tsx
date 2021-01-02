import { useState } from 'react'
import { getSimpleDateRange, SimpleDateRange, adjustSimpleDateRange } from "../../simple_date";

import MonthSelector from '../month-selector/month-selector';

import chevron from './chevron.svg'
import styles from './navigator.module.css'


type navigatorProps = {
    setMonthRange: (range: SimpleDateRange) => void
    onToggleViewFavourites: () => void
    dateRange: SimpleDateRange
    validDateRange: SimpleDateRange
}

const Navigator = ({ setMonthRange, onToggleViewFavourites, dateRange, validDateRange }: navigatorProps) => {
    const [useRange, setUseRange] = useState(false);

    return <div className={styles.container}>
        <img src={chevron} className={[styles.chevron, styles.left].join(' ')} onClick={() => {
            console.log("Previous date range: ", dateRange)
            const newDateRange = adjustSimpleDateRange(dateRange, -1)
            console.log("New date range: ", newDateRange)
            setMonthRange(newDateRange)
        }} alt="one month earlier" />
        <MonthSelector onChangeMonth={(start, end) => setMonthRange(getSimpleDateRange(start, end))} useRange={useRange} dateRange={dateRange} validDateRange={validDateRange} />
        <img src={chevron} className={[styles.chevron, styles.right].join(' ')} onClick={() => setMonthRange(adjustSimpleDateRange(dateRange, 1))} alt="one month later" />
        <span onClick={() => { setUseRange(use => !use) }}>
            &lt;Range toggle<input type="checkbox" checked={useRange} onChange={event => setUseRange(event.target.checked)} />&gt;
        </span>
        <span onClick={onToggleViewFavourites}>&lt;⭐ View Favourites&gt;</span>
    </div>
}

export default Navigator

