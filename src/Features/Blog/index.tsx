import React from 'react'
import TableBlog from './Components/TableBlog';
import { getBlogAsync } from '../../Apis/Blogs/RBlog';
import { blogCtx } from '../../Store/blog.context';
import Modal from '../../Components/Modal';
import BlogDetail from './Pages/blogDetail';



const BlogEdit = () => {
  const [blogState, blogActions] = blogCtx()

  const getBlogApi = async () => {
    const result = await getBlogAsync()
    if (result.success === true) {
      blogActions.setBlog(result.data)
    }
    else {
      console.log(result.message)
      blogActions.setBlog([])
    }
  }
  React.useEffect(() => {
    getBlogApi()
  }, [])

  return (
    <div>
      {/* <TableBlog handleShowEdit={handleShowEdit} /> */}
    </div>
  )
}

export default BlogEdit
