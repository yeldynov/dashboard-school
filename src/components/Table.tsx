import React from 'react'

type Column = {
  header: string
  accessor: string
  className?: string
}

const Table = ({
  columns,
  renderRow,
  data,
}: {
  columns: Column[]
  renderRow: (item: any) => React.ReactNode
  data: any[]
}) => {
  return (
    <table className='w-full mt-4'>
      <thead>
        <tr className='text-xs text-left text-gray-500'>
          {columns.map((col) => (
            <th key={col.accessor} className={col.className}>
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{data.map((item) => renderRow(item))}</tbody>
    </table>
  )
}

export default Table
