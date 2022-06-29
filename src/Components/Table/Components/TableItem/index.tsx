import React from 'react'
import { AiFillCiCircle } from 'react-icons/ai'

const TableItem = ({ items, index }: { items: any, index: number }) => {
  return (
    <tr>
      {Object.entries(items).map((obj => {
        if (obj[0] == 'id')
          return <td className="border border-l-0 px-4 py-2"><label htmlFor={`child${index}`}>
            {obj[1]}</label></td>
        return <td className="border border-l-0 px-4 py-2 text-center text-green-500">{obj[1]}</td>
      }))}
      <td className="border border-l-0 border-r-0 px-4 py-2 text-center"><AiFillCiCircle /></td>
    </tr>
  )
}

export default TableItem
