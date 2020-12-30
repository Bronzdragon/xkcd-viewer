import { useState } from 'react'
import type { DateRange } from '../overview'

import MonthSelector from '../month-selector/month-selector';

import chevron from './chevron.svg'
import styles from './navigator.module.css'


type navigatorProps = {
    setMonthRange: (start: Date, end: Date) => void
    viewFavourites: () => void
    dateRange: DateRange
    validDateRange: DateRange
}

const Navigator = ({ setMonthRange, viewFavourites, dateRange, validDateRange }: navigatorProps) => {
    const [useRange, setUseRange] = useState(false);

    return <div className={styles.container}>
        <img src={chevron} className={[styles.chevron, styles.left].join(' ')}
            onClick={() => setMonthRange(...adjustDateRange(dateRange, -1))} />
        <MonthSelector onChangeMonth={setMonthRange} useRange={useRange} dateRange={dateRange} validDateRange={validDateRange} />
        <img src={chevron} className={[styles.chevron, styles.right].join(' ')} onClick={() => setMonthRange(...adjustDateRange(dateRange, +1))} />
        <span onClick={() => { setUseRange(use => !use) }}>
            &lt;Range toggle<input type="checkbox" checked={useRange} onChange={event => setUseRange(event.target.checked)} />&gt;
        </span>
        <span onClick={viewFavourites}>&lt;⭐ View Favourites&gt;</span>
    </div>
}

export default Navigator

function adjustDateRange([start, end]: DateRange, amount: number = 1): DateRange {
    const startResult = new Date(start)    
    const endResult = new Date(end)

    startResult.setMonth(startResult.getMonth() - 1)
    startResult.setDate(1)

    endResult.setMonth(endResult.getMonth() - 1)
    endResult.setDate(1)

    return [startResult, endResult]

    let result: DateRange = [
        new Date(start.getFullYear(), start.getMonth() + amount),
        new Date(end.getFullYear(), end.getMonth() + amount)
    ]
    return result
}