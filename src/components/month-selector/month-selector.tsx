// @ts-ignore
import Picker from 'react-month-picker'

type MonthSelectorProps = {
    onChangeMonth: (month: Date) => void
    useRange?: boolean
}

const MonthSelector = ({ onChangeMonth, useRange = false }: MonthSelectorProps) => {
    return <span>
        📆
        {/* <Picker
            value={{ year: 2020, month: 11 }}
            lang={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']} /> */}
    </span>
}
export default MonthSelector