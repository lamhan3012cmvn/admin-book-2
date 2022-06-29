import React from 'react'

const TableHeaderBlog = () => {
  return (
    <thead>
      <tr>
        <th className="px-4 py-2 text-center border-r">Blog Name VI</th>
        <th className="px-4 py-2  text-center border-r">Blog Slug VI</th>
        <th className="px-4 py-2  text-center border-r">Blog Status VI</th>
        <th className="px-4 py-2  text-center border-r">Blog Update VI</th>


        <th className="px-4 py-2  text-center border-r">Blog Name EN</th>
        <th className="px-4 py-2  text-center border-r">Blog Slug EN</th>
        <th className="px-4 py-2  text-center border-r">Blog Status EN</th>
        <th className="px-4 py-2  text-center border-r">Blog Update EN</th>

        <th className="px-4 py-2 border-r" key={"action"}>{"Actions"}</th>
      </tr>
    </thead>
  )
}

export default TableHeaderBlog
