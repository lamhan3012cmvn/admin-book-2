import React from 'react';
import { updateBlogDetailAsync } from '../../../../Apis/Blogs/UBlogDetail';
import SelectBox from '../../../../Components/SelectBox';
import { notify } from '../../../../helper/notify';
import useDebounce from '../../../../hooks/useDebounce';
import { blogCtx } from '../../../../Store/blog.context';
import { Editor } from '@tinymce/tinymce-react/lib/cjs/main/ts/components/Editor';

interface EditBlogProps {
	hideModal: () => void;
}
const EditBlog = (props: EditBlogProps) => {
	const [blogState, blogActions] = blogCtx();
	const { hideModal } = props;
	const editorRef = React.useRef(null);
	const listStatus = [
		{ id: 0, value: 'Không hoạt động' },
		{ id: 1, value: 'Đang hoạt động' }
	];
	const [status, setStatus] = React.useState<{ id: number; value: string }>(
		listStatus[blogState.blogDetail?.status || 0]
	);
	const [title, setTitle] = React.useState(blogState.blogDetail?.title || '');
	const [content, setContent] = React.useState<string>(
		blogState.blogDetail?.content || ''
	);

	const func = useDebounce((data: string) => {
		setContent(data);
	}, 300);

	const handleChooseStatus = (payload: { id: number; value: string }) => {
		setStatus(payload);
	};

	React.useEffect(() => {
		setStatus(listStatus[blogState.blogDetail?.status || 0]);
	}, [blogState.blogDetail?.status]);

	React.useEffect(() => {
		setTitle(blogState.blogDetail?.title);
	}, [blogState.blogDetail?.title]);

	const refBlogForm = React.useRef<HTMLFormElement>();
	const handleSaveBlog = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const obj = {
			id: blogState.blogDetail?.id,
			title: e.target['name_blog'].value,
			status: status.id,
			postId: blogState.blogDetail?.postId,
			content: editorRef.current.getContent()
		};
		const result = await updateBlogDetailAsync(obj);
		if (result.success === true) {
			blogActions.setBlogDetail(result.data);
			hideModal();
			notify('Cập nhật bài đăng thành công');
		} else {
			hideModal();
			notify('Cập nhật bài đăng thất bại');
		}
	};
	return (
		// <div className='py-6 px-4 max-w-[1200px] w-full relative  '>
		// 	<div className='w-full bg-white rounded shadow-2xl p-8 m-4 productForm-wrapper z-10'>
		<div className='py-6 px-4 bg-white mt-[20px]'>
			<div>
				<h1 className='block w-full text-center text-gray-800 text-2xl font-bold mb-6'>
					Cập nhật
				</h1>
				<form
					action='/'
					method='post'
					ref={refBlogForm}
					onSubmit={e => handleSaveBlog(e)}>
					<div className='flex flex-col mb-4'>
						<label
							className='mb-2 font-bold text-lg text-gray-900'
							htmlFor='name_blog'>
							Tiêu đề
						</label>
						<input
							className='border py-2 px-3 text-grey-800'
							type='text'
							name='name_blog'
							id='name_blog'
							defaultValue={title}
						/>
					</div>
					<div className='flex flex-col mb-4'>
						<label
							className='mb-2 font-bold text-lg text-gray-900'
							htmlFor='Select'>
							Trạng thái
						</label>
						<SelectBox
							state={status.value}
							handleChoose={handleChooseStatus}
							idCheckBox='status_checked'
							list={listStatus}
						/>
					</div>
					<div className='flex flex-col mb-4'>
						<label
							className='mb-2 font-bold text-lg text-gray-900'
							htmlFor='description_BlogEdit'>
							Mô tả
						</label>

						<Editor
							apiKey='y76jxx43mgkptc4d0yhzovx3duuirvviil3zetp2ekdkhjaq'
							onInit={(evt, editor) => (editorRef.current = editor)}
							initialValue={blogState.blogDetail?.content}
							init={{
								height: 700,
								menubar: true,
								plugins: [
									'advlist autolink lists link image',
									'charmap print preview anchor help',
									'searchreplace visualblocks code',
									'insertdatetime media table paste wordcount'
								],
								toolbar:
									'undo redo | formatselect | bold italic | TextColor | \
            alignleft aligncenter alignright | \
            bullist numlist outdent indent| Image | help'
							}}
							// onChange={func}
						/>
					</div>
					<div className='flex justify-center items-center gap-x-[20px]'>
						<button
							onClick={() => hideModal()}
							className='border min-w-[120px] justify-center border-[#38b2ac] text-[#38b2ac] rounded-sm font-bold py-2 px-6 ml-2 flex items-center'>
							Hủy
						</button>
						<button className='border min-w-[120px] justify-center  border-[#38b2ac] bg-[#38b2ac] text-white rounded-sm font-bold py-2 px-6 ml-2 flex items-center'>
							Lưu
						</button>
					</div>
				</form>
			</div>
		</div>
		// 	</div>
		// </div>
	);
};

export default EditBlog;
