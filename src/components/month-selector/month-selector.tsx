import { useRef } from 'react'
// @ts-ignore
import Picker from 'react-month-picker'
import 'react-month-picker/css/month-picker.css'
import './month-selector.css'
import type { DateRange } from '../overview'


type Month = {
    year: number
    month: number
}
type MonthRange = {
    from: Month
    to: Month
}

type MonthSelectorProps = {
    onChangeMonth: (start: Date, end: Date) => void
    dateRange: [Date, Date]
    useRange?: boolean
    validYearRange: [number, number]
}

const MonthSelector = ({ dateRange, onChangeMonth, useRange = false, validYearRange: [firstValidYear, lastValidYear]  }: MonthSelectorProps) => {
    const selectedMonths = dateRangeToMonthRange(dateRange)
    const pickerRef = useRef<Picker>();

    console.log("YearRange: ", firstValidYear, lastValidYear)

    const pickerProps = {
        key: useRange ? "WithRange" : "NoRange",
        ref: pickerRef,
        value: useRange ? selectedMonths : selectedMonths.from,
        lang: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        years: {min: firstValidYear},
        onDismiss(arg: Month | MonthRange) {
            onChangeMonth(...monthRangeToDateRange(arg))
        },
    }

    return <span>
        Selected month: {JSON.stringify(selectedMonths)}
        <Picker {...pickerProps}>
            <span onClick={() => pickerRef.current?.show()}>📆</span>
        </Picker>
    </span>
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
    return ({
        from: {
            year: from.getFullYear(),
            month: from.getMonth() + 1, // The Date() month counting is 0-indexed
        },
        to: {
            year: to.getFullYear(),
            month: to.getMonth() + 1, // The Date() month counting is 0-indexed
        }
    })
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
