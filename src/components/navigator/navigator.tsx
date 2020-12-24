import { useState } from 'react'
import styles from './navigator.module.css'

type MonthSelectorProps = {
    onChangeMonth: (month: Date) => void
}

const MonthSelector = ({onChangeMonth}: MonthSelectorProps) => <span onClick={() => {
    const now = new Date();
    onChangeMonth(
        new Date(now.getFullYear(), now.getMonth(), 1))
}}>&lt;📆month selector&gt;</span>


type navigatorProps = {
    setMonth: (start: Date, end: Date) => void
    viewFavourites: () => void
}

const Navigator = ({ setMonth, viewFavourites }: navigatorProps) => {
    const [useRange, setUseRange] = useState(false);

    return <div className={styles.container}>
        &lt;Search&gt;
        {
            useRange
            // TODO: Make the selector actually useful?
            ? <>
                <MonthSelector onChangeMonth={month => setMonth(
                    month, // Start of range
                    new Date(month.getFullYear(), month.getMonth(), 0))} />
                <MonthSelector onChangeMonth={month => setMonth(
                    month, // Start of range
                    new Date(month.getFullYear(), month.getMonth() + 1, 0))} />
            </>
            : <MonthSelector onChangeMonth={month => setMonth(
                month, // Start of range
                new Date(month.getFullYear(), month.getMonth() + 1, 0))} />
        }
        <span onClick={(event) => {event.preventDefault(); setUseRange(use => !use)}}>
            &lt;Range toggle<input type="checkbox" checked={useRange} onChange={event => setUseRange(event.target.checked)} />&gt;
        </span>
        <span onClick={viewFavourites}>&lt;⭐ View Favourites&gt;</span>
    </div>
}

export default Navigator

