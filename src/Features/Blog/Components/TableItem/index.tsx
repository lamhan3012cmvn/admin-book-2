import moment from 'moment'
import React from 'react'
import { AiFillCiCircle } from 'react-icons/ai'
import { BlogModel } from '../../../../Models/blog.model'

const TableItemBlog = ({ items, index }: { items: BlogModel, index: number }) => {
  return (
    <tr>
      <td className="border border-l-0 px-4 py-2 text-left text-black">{items.postTexts[0].title}</td>
      <td className="border border-l-0 px-4 py-2 text-left text-black">{items.postTexts[0].slug}</td>
      <td className="border border-l-0 px-4 py-2 text-left text-black">{items.postTexts[0].status}</td>
      <td className="border border-l-0 px-4 py-2 text-left text-black">{moment(items.postTexts[0].updatedAt).fromNow()}</td>

      <td className="border border-l-0 px-4 py-2 text-left text-black">{items.postTexts[1].title}</td>
      <td className="border border-l-0 px-4 py-2 text-left text-black">{items.postTexts[1].slug}</td>
      <td className="border border-l-0 px-4 py-2 text-left text-black">{items.postTexts[1].status}</td>
      <td className="border border-l-0 px-4 py-2 text-left text-black">{moment(items.postTexts[1].updatedAt).fromNow()}</td>

      <td className="border border-l-0 border-r-0 px-4 py-2 text-center"><AiFillCiCircle /></td>
    </tr>
  )
}

export default TableItemBlog
