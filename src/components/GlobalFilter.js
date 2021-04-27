import { useState } from 'react'
import { useAsyncDebounce } from 'react-table';

// Fiter component used for filtering the table data
export const GlobalFilter = ({ filter, setFilter }) => {
    const [value, setValue] = useState(filter);

    const onChange = useAsyncDebounce(value => {
        setFilter(value || undefined)
    }, 1000)
    return (
        <span>
            Search: {' '}
            <input value={value || ''}
                onChange={(e) => {
                    setValue(e.target.value)
                    onChange(e.target.value)
                }}
            />
        </span>
    )
}