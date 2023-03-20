import React from 'react'
import { usePagination, useTable } from 'react-table'

import { range } from 'ramda'
import { classNames } from '../../utils'

// Let's add a fetchData method to our Table component that will be used to fetch
// new data when pagination state changes
// We can also add a loading state to let our table know it's loading new data
function Table({
  columns,
  data,
  fetchData,
  loading,
  pageCount: controlledPageCount,
  pageSize: controlledPageSize = 10,
  searchValue
}: any) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    // Get the state from the instance
    state: { pageIndex, pageSize }
  }: any = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: controlledPageSize }, // Pass our hoisted table state
      manualPagination: true, // Tell the usePagination
      // hook that we'll handle our own data fetching
      // This means we'll also have to provide our own
      // pageCount.
      pageCount: controlledPageCount
    } as any,
    usePagination
  )

  // Listen for changes in pagination and use the state to fetch our new data
  React.useEffect(() => {
    fetchData({ pageIndex, pageSize, newSearchValue: searchValue })
  }, [fetchData, pageIndex, pageSize, searchValue])

  // console.log({
  // 	pageIndex,
  // 	pageSize,
  // 	pageCount,
  // 	canNextPage,
  // 	canPreviousPage,
  // });

  // Render the UI for your table
  return (
    <div className="relative">
      <table
        {...getTableProps()}
        className="w-full border divide-y border-black3 divide-black3"
      >
        <thead className="divide-y divide-black3">
          {headerGroups.map((headerGroup: any) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              className="divide-x divide-black3 "
            >
              {headerGroup.headers.map((column: any) => (
                <th {...column.getHeaderProps()} className="py-3">
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row: any) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()} className="divide-x divide-black3 ">
                {row.cells.map((cell: any) => {
                  const {
                    column: { center, Header }
                  } = cell
                  return (
                    <td
                      {...cell.getCellProps()}
                      className={classNames(
                        'px-3 py-2',
                        center && 'text-center',
                        Header === 'ID' && 'w-[70px]'
                      )}
                    >
                      {cell.render('Cell')}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      {
        loading && (
          // Use our custom loading state to show a loading indicator
          <div className="absolute inset-0 bg-black center bg-opacity-10">
            <span className="">Loading...</span>
          </div>
        )
        // : (
        //   <td colSpan={10000} className="px-3 py-2">
        //     Showing {page.length} of ~{controlledPageCount * pageSize}{' '}
        //     results
        //   </td>
        // )
      }

      <div className="justify-end gap-3 mt-4 row w-ful">
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className={classNames(
            'rounded-md w-7 h-7 ',
            !canPreviousPage ? 'bg-second' : 'bg-black3'
          )}
        >
          {'<'}
        </button>
        {range(0, pageCount).map((item) => (
          <button
            key={item}
            onClick={() => gotoPage(item)}
            className={classNames(
              'rounded-md w-7 h-7',
              pageIndex === item ? ' bg-gradient-default' : 'bg-black3'
            )}
          >
            {item + 1}
          </button>
        ))}
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className={classNames(
            'rounded-md w-7 h-7 ',
            !canNextPage ? 'bg-second' : 'bg-black3'
          )}
        >
          {'>'}
        </button>

        {/* <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value))
          }}
          className="text-default"
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select> */}
      </div>
    </div>
  )
}

export default Table
