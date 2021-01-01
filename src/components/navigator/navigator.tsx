import { useState } from 'react'
import { getSimpleDateRange, SimpleDate, SimpleDateRange } from '../overview'

import MonthSelector from '../month-selector/month-selector';

import chevron from './chevron.svg'
import styles from './navigator.module.css'


type navigatorProps = {
    setMonthRange: (range: SimpleDateRange) => void
    viewFavourites: () => void
    dateRange: SimpleDateRange
    validDateRange: SimpleDateRange
}

const Navigator = ({ setMonthRange, viewFavourites, dateRange, validDateRange }: navigatorProps) => {
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
        <span onClick={viewFavourites}>&lt;⭐ View Favourites&gt;</span>
    </div>
}

export default Navigator

function adjustSimpleDateRange({ from, to }: SimpleDateRange, amount = 1): SimpleDateRange {
    return { from: adjustSimpleDate(from, amount), to: adjustSimpleDate(to, amount) }
}

function adjustSimpleDate({year, month}: SimpleDate, amount = 1) {
    const months = year * 12 + month + amount;

    return {
        month: months % 12,
        year: Math.floor(months / 12),
    }
}