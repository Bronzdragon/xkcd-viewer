import { useState } from 'react'
import MonthSelector from '../month-selector/month-selector';
import styles from './navigator.module.css'
import type { DateRange } from '../overview'

type navigatorProps = {
    setMonthRange: (start: Date, end: Date) => void
    viewFavourites: () => void
    dateRange: DateRange
    validDateRange: DateRange
}

const Navigator = ({ setMonthRange, viewFavourites, dateRange, validDateRange }: navigatorProps) => {
    const [useRange, setUseRange] = useState(false);

    return <div className={styles.container}>
        <MonthSelector onChangeMonth={setMonthRange} useRange={useRange} dateRange={dateRange} validDateRange={validDateRange} />
        <span onClick={() => { setUseRange(use => !use) }}>
            &lt;Range toggle<input type="checkbox" checked={useRange} onChange={event => setUseRange(event.target.checked)} />&gt;
        </span>
        <span onClick={viewFavourites}>&lt;⭐ View Favourites&gt;</span>
    </div>
}

export default Navigator
