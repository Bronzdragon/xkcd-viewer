import { useRef } from 'react'
// @ts-ignore
import Picker from 'react-month-picker'
import 'react-month-picker/scss/month-picker.scss'
import './month-selector.css'
import { compareSimpleDate, isSimpleDate } from '../../simple_date'
import { SimpleDate, SimpleDateRange } from "../../simple_date"
import { MonthSelectorButton } from './month-selector-button'

export const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] as const

type MonthSelectorProps = {
    onChangeMonth: (start: SimpleDate, end: SimpleDate) => void
    dateRange: SimpleDateRange
    validDateRange: SimpleDateRange
}

let age = 0;
function MonthSelector({ dateRange, onChangeMonth, validDateRange: { from: validFrom, to: validTo } }: MonthSelectorProps) {
    const pickerRef = useRef<Picker>();

    return <Picker
        age={age++}
        ref={pickerRef}
        value={compareSimpleDate(dateRange) === 0 ? dateRange.from : dateRange}
        lang={monthNames.map(monthName => monthName.slice(0, 3))}
        years={{ min: validFrom, max: validTo }}
        autoRange={1}
        onDismiss={(arg: SimpleDate | SimpleDateRange) => { isSimpleDate(arg) ? onChangeMonth(arg, arg) : onChangeMonth(arg.from, arg.to) }}
    >
        <MonthSelectorButton onOpen={() => pickerRef.current?.show()} dateRange={dateRange} />
    </Picker>
}

export default MonthSelector
