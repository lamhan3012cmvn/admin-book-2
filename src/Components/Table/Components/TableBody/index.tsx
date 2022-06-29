import React from 'react'
import { AiFillCiCircle } from 'react-icons/ai'
import Table from '../..'
import TableItem from '../TableItem'

// interface TableBodyProps<T> {
//   data: T
// }

const TableBody = ({ data }: { data: any }) => {

  const keys = Object.keys(data[0]).filter(e => typeof data[0][e] !== typeof [])

  return (
    <tbody className="text-gray-600">
      {
        data.map((e, i) => {
          return (
            <React.Fragment key={i}>
              <TableItem items={e} index={i}/>
            </React.Fragment>
          )
        })
      }
    </tbody>
  )
}

export default TableBody
