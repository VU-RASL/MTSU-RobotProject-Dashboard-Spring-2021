// Table.js
import "bootstrap/dist/css/bootstrap.min.css"
import { useTable, useSortBy, usePagination, useGlobalFilter } from "react-table";
import './table.css';
import { GlobalFilter } from './GlobalFilter';

export default function Table(props) {
  const columns = props.props.columns;
  const data = props.props.data;
  // Use the useTable Hook to send the columns and data to build the table
  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    // rows, // rows for the table based on the data passed
    page, // page is used instead of rows for pagination
    nextPage, // helper function from react-table to navigate to next page
    previousPage, // helper function from react-table to navigate to previous page
    canNextPage, // returns false if in last page
    canPreviousPage, // returns false if in first page
    pageOptions,
    state,
    gotoPage, // functions help to directly go to a specific page
    pageCount, // returns number of pages based on data
    prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
    setGlobalFilter
  } = useTable({
    columns,
    data,
    initialState: { pageSize: 10 }
  },
    useGlobalFilter,
    useSortBy,
    usePagination);

  const { pageIndex, globalFilter } = state;


  /* 
    Render the UI for your table
    - react-table doesn't have UI, it's headless. We just need to put the react-table props from the Hooks, and it will do its magic automatically
  */
  return (
    <div>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <br /><br />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render("Header")}
                  <span>{column.isSorted ? (column.isSortedDesc ? '   ▼' : '   ▲') : ''}</span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <br /><br />
      <div>
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong> {' '}
        </span>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button>
      </div>
    </div>
  );
}