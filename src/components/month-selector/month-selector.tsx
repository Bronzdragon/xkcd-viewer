import { useRef } from 'react'
// @ts-ignore
import Picker from 'react-month-picker'
import 'react-month-picker/css/month-picker.css'
import './month-selector.css'
import type { DateRange } from '../overview'
import { MonthSelectorButton } from './month-selector-button'

export const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] as const

export type Month = {
    year: number
    month: number
}

export type MonthRange = {
    from: Month
    to: Month
}

type MonthSelectorProps = {
    onChangeMonth: (start: Date, end: Date) => void
    dateRange: DateRange
    useRange?: boolean
    validDateRange: DateRange
}

let age = 0;
function MonthSelector({ dateRange, onChangeMonth, useRange = false, validDateRange: [firstValidYear, lastValidYear] }: MonthSelectorProps) {
    const selectedMonths = dateRangeToMonthRange(dateRange)
    const pickerRef = useRef<Picker>();

    return <Picker
        age={age++}
        ref={pickerRef}
        value={useRange ? selectedMonths : selectedMonths.from}
        lang={monthNames.map(monthName => monthName.slice(0, 3))}
        years={{ min: dateToMonthObj(firstValidYear), max: dateToMonthObj(lastValidYear) }}
        autoRange={1}
        onDismiss={(arg: Month | MonthRange) => { onChangeMonth(...monthRangeToDateRange(arg))}}
    >
        <MonthSelectorButton onOpen={() => pickerRef.current?.show()} dateRange={selectedMonths} />
    </Picker>
}

export default MonthSelector

function monthRangeToDateRange(arg: Month | MonthRange): DateRange {
    if (isMonthRange(arg)) {
        return [
            new Date(arg.from.year, arg.from.month - 1),
            new Date(arg.to.year, arg.to.month)
        ]
    } else {
        // Must be a single month
        return [
            new Date(arg.year, arg.month - 1),
            new Date(arg.year, arg.month)
        ]
    }
}

function dateRangeToMonthRange([from, to]: DateRange): MonthRange {
    to.setDate(to.getDate() - 1) // go back one day to the end of last month.
    return {
        from: dateToMonthObj(from),
        to: dateToMonthObj(to)
    }
}

function dateToMonthObj(date: Date): Month {
    return {
        year: date.getFullYear(),
        month: date.getMonth() + 1, // The Date() month counting is 0-indexed
    }
}

function isMonthRange(obj: unknown): obj is MonthRange {
    return (
        typeof obj == 'object'
        && obj != null
        && isMonth((obj as { from: unknown }).from)
        && isMonth((obj as { to: unknown }).to)
    )
}

function isMonth(obj: unknown): obj is Month {
    return (
        typeof obj === 'object'
        && obj !== null
        && typeof (obj as { year: unknown }).year === 'number'
        && typeof (obj as { month: unknown }).month === 'number'
    )
}