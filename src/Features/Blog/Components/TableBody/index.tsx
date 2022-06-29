import moment from 'moment'
import React from 'react'
import { AiFillCiCircle } from 'react-icons/ai'
import Table from '../..'
import { blogCtx } from '../../../../Store/blog.context'
import { IBlog } from '../../interface'
import TableItemCategory from '../TableItem'
import TableItem from '../TableItem'

const TableBodyBlog = () => {
  const [blogState, blogActions] = blogCtx()


  return (
    <tbody className="text-gray-600">
      {
        blogState.blogs.map((e, i) => {
          return (
            <React.Fragment key={i}>
              <TableItemCategory items={e} index={i} />
            </React.Fragment>
          )
        })
      }
    </tbody>
  )
}

export default TableBodyBlog
