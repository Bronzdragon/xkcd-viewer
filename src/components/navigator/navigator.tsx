import { useState } from 'react'
import MonthSelector from '../month-selector/month-selector';
import styles from './navigator.module.css'
 
type navigatorProps = {
    setMonth: (start: Date, end: Date) => void
    viewFavourites: () => void
}

const Navigator = ({ setMonth, viewFavourites }: navigatorProps) => {
    const [useRange, setUseRange] = useState(false);

    return <div className={styles.container}>
        &lt;Search&gt;
        <MonthSelector onChangeMonth={() => {}} />
        <span onClick={(event) => {event.preventDefault(); setUseRange(use => !use)}}>
            &lt;Range toggle<input type="checkbox" checked={useRange} onChange={event => setUseRange(event.target.checked)} />&gt;
        </span>
        <span onClick={viewFavourites}>&lt;⭐ View Favourites&gt;</span>
    </div>
}

export default Navigator

