import React, { useMemo } from 'react';
import { useTable, useRowSelect } from 'react-table';
import MOCK_DATA from './MOCK_DATA.json';
import { COLUMNS } from './columns';
import './table.css';
import { Checkbox } from './CheckBox';

export const RowSelection = () => {

    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => MOCK_DATA, []);

    const tableInstance = useTable({
        columns: columns,
        data: data  
        }, useRowSelect,
        (hooks) => {
            hooks.visibleColumns.push((columns) => {
                return [
                    {
                        id: 'selection',
                        Header: ({ getToggleAllRowsSelectedProps}) => (
                            <Checkbox {...getToggleAllRowsSelectedProps()} />
                        ),
                        Cell: ({row}) => (
                            <Checkbox {...row.getToggleRowSelectedProps()} />
                        )
                    },
                    ...columns
                ]
            })
        }
    )

    const  {
        getTableProps, 
        getTableBodyProps, 
        headerGroups, 
        footerGroups,
        rows, 
        prepareRow,
        selectedFlatRows
    } = tableInstance

    const firstPageRows = rows.slice(0,10); 

    return (
        <div>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}> {column.render('Header')} </th>
                            ))}
                        </tr>
                    ))}
                   
                </thead>
                <tbody {...getTableBodyProps()}>
                    {
                        firstPageRows.map((row) => {
                            prepareRow(row)
                            return(
                                <tr {...row.getRowProps()} onClick={(e) =>console.log(row.original)}>
                                    {
                                        row.cells.map((cell) => {
                                            return <td {...cell.getCellProps()}> {cell.render('Cell')} </td>
                                        })
                                    }
                                    
                                </tr>
                            )
                        })
                    }
                   
                </tbody>
                <tfoot>
                    {footerGroups.map((footerGroup) => (
                        <tr {...footerGroup.getFooterGroupProps()}>
                            {footerGroup.headers.map((column) => (
                                <td {...column.getHeaderProps()}> {column.render('Footer')} </td>
                            ))}
                        </tr>
                    ))}
                   
                </tfoot>
            </table>
            <pre>
                    <code>
                        {JSON.stringify(
                            {
                                selectedFlatRows: selectedFlatRows.map((row) => row.original)
                            },
                            null,
                            2
                        )}
                    </code>
                </pre>
        </div>
    )
}