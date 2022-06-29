import React from 'react';
import { blogCtx } from '../../../../Store/blog.context';
import { useParams } from 'react-router';
import { getBlogDetailAsync } from '../../../../Apis/Blogs/RBlogDetail';
import ReactHtmlParser from 'react-html-parser';
import moment from 'moment';
import { FaPencilAlt } from 'react-icons/fa';
import Modal from '../../../../Components/Modal';
import EditBlog from '../../Components/EditBlog';
interface Props {}

const BlogDetail = (props: Props) => {
	const listStatus = [
		{ id: 0, value: 'Không hoạt động' },
		{ id: 1, value: 'Đang hoạt động' }
	];
	console.log('Blog Detail');
	const [blogState, blogActions] = blogCtx();
	const parmas = useParams();
	const getBlogDetailApi = async (id: number) => {
		console.log(`LHA:  ===> file: index.tsx ===> line 14 ===> id`, id);
		const result = await getBlogDetailAsync({ id });
		if (result.success === true) {
			blogActions.setBlogDetail(result.data);
		} else {
			console.log(result.message);
			blogActions.setBlogDetail(undefined);
		}
	};

	const [showEdit, setShowEdit] = React.useState(false);

	const handleShowEdit = () => {
		setShowEdit(true);
	};

	React.useEffect(() => {
		console.log(parmas.slug);
		getBlogDetailApi(+parmas.slug);
	}, [parmas.slug]);
	return (
		<div>
			{showEdit ? (
				// <Modal showed={true} setShowed={setShowEdit}>
				<EditBlog hideModal={() => setShowEdit(false)} />
			) : (
				//* </Modal> */}
				<div className='bg-white mt-8 px-12 py-5 relative'>
					<p className='text-3xl font-bold text-black mt-5'>
						<span>Bài đăng: </span>
						{blogState.blogDetail?.title}
					</p>
					<p className='text-lg text-black'>
						<span>Cập nhật: </span>
						{moment(blogState.blogDetail?.updatedAt).fromNow()}
					</p>
					<p className='text-lg text-black'>
						<span>Trạng thái: </span>
						{listStatus[blogState.blogDetail?.status || 0].value}
					</p>
					<div
						className='ck5 mt-8'
						dangerouslySetInnerHTML={{
							__html: blogState.blogDetail?.content || ''
						}}></div>
					<div
						onClick={() => handleShowEdit()}
						className='fixed top-[50%] right-0 w-[50px] h-[50px] border-2 border-green-400 bg-white rounded-md flex items-center justify-center cursor-pointer'>
						<FaPencilAlt className='text-green-600' />
					</div>
				</div>
			)}
		</div>
	);
};

export default BlogDetail;
