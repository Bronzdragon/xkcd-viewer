import cs from "cs";
import { getSimpleDateRange, SimpleDateRange, adjustSimpleDateRange } from "../../simple_date";

import MonthSelector from '../month-selector/month-selector';
import Star from '../star/star'

import chevron from './chevron.svg'
import styles from './navigator.module.css'


type navigatorProps = {
    setMonthRange: (range: SimpleDateRange) => void
    onToggleViewFavourites: () => void
    dateRange: SimpleDateRange
    validDateRange: SimpleDateRange
    viewingFavourites?: boolean
}

const Navigator = ({ setMonthRange, onToggleViewFavourites, dateRange, validDateRange, viewingFavourites = false }: navigatorProps) =>
    <div className={styles.container}>
        <img src={chevron} className={cs(styles.chevron, styles.left)}
            onClick={() => setMonthRange(adjustSimpleDateRange(dateRange, -1))} alt="one month earlier" />
        
        <MonthSelector onChangeMonth={(start, end) => setMonthRange(getSimpleDateRange(start, end))}
            dateRange={dateRange} validDateRange={validDateRange} />
        
        <img src={chevron} className={cs(styles.chevron, styles.right)}
            onClick={() => setMonthRange(adjustSimpleDateRange(dateRange, 1))} alt="one month later" />
        
        <span onClick={onToggleViewFavourites} className={cs(styles.favouritesButton, viewingFavourites ? styles.active : null)}>
            <Star filled={viewingFavourites} size={30} className={styles.star} />
        </span>
    </div>

export default Navigator
