import React from 'react'
import { FaEye } from 'react-icons/fa'
interface ActionTableProps {
  children: React.ReactElement,
  onClick: () => void
}

const ActionTable = ({ children, onClick }: ActionTableProps) => {
  return (
    <div className="border border-green-600 rounded-md px-3 py-2 text-green-400 cursor-pointer hover:bg-green-600 hover:text-green-200" onClick={onClick}>
      {children}
    </div>
  )
}

export default ActionTable
