import { useState } from 'react'
import styles from './page_selector.module.css'

type MonthSelectorProps = {
    onChangeMonth: (month: Date) => void
}

const MonthSelector = ({onChangeMonth}: MonthSelectorProps) => <span onClick={() => {
    const now = new Date();
    onChangeMonth(
        new Date(now.getFullYear(), now.getMonth(), 1))
}}>&lt;📆month selector&gt;</span>


type PageSelectorProps = {
    setMonth: (start: Date, end: Date) => void
}

const PageSelector = ({ setMonth }: PageSelectorProps) => {
    const [useRange, setUseRange] = useState(false);

    console.log("use range state: ", useRange)

    return <div className={styles.container}>
        &lt;Search&gt;
        {
            useRange
            // TODO: Make the selector actually useful?
            ? <>
                <MonthSelector onChangeMonth={month => setMonth(
                    month, // Start of range
                    new Date(month.getFullYear(), month.getMonth() + 1, 0))} />
                <MonthSelector onChangeMonth={month => setMonth(
                    month, // Start of range
                    new Date(month.getFullYear(), month.getMonth() + 1, 0))} />
            </>
            : <MonthSelector onChangeMonth={month => setMonth(
                month, // Start of range
                new Date(month.getFullYear(), month.getMonth() + 1, 0))} />
        }
        <span onClick={() => setUseRange(use => !use)}>&lt;Range toggle<input type="checkbox" checked={useRange} />&gt;</span>
        &lt;⭐ View Favourites&gt;
    </div>
}

export default PageSelector

