import React from 'react'
import { blogCtx } from '../../../../Store/blog.context'
import TableBodyBlog from '../TableBody'
import TableHeaderBlog from '../TableHeader'


const TableBlog = ({ handleShowEdit }: { handleShowEdit: () => void }) => {


  return (
    <div>
      <div className="rounded bg-white border border-gray-300">
        <div className="border-b p-6">Blog</div>

        <table className="table-auto w-full text-left">
          <TableHeaderBlog />
          <TableBodyBlog/>
        </table>
      </div>


    </div >
  )
}

export default TableBlog
