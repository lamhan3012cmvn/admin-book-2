import React from 'react'
import { AiFillCiCircle } from 'react-icons/ai'
import { FiChrome } from 'react-icons/fi'
import TableBody from './Components/TableBody'
import TableHeader from './Components/TableHeader'
import './style.css'
interface TableProps {
  data: any,
}

const Table = ({ data}: TableProps) => {


  const keys = Object.keys(data[0]).filter(e => typeof data[0][e] !== typeof [])
  return (
    <div>
      <div className="rounded bg-white border border-gray-300">
        <div className="border-b p-6">Recent Sales</div>

        <table className="table-auto w-full text-left">
          <TableHeader heads={keys} />
          <TableBody data={data} />
        </table>
      </div>


    </div >
  )
}

export default Table
