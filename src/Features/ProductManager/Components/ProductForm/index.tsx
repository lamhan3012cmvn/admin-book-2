import React from 'react';

import SelectBox from '../../../../Components/SelectBox';
import { productCtx } from '../../Contexts/product.context';

import './style.css';
import { updateProduct, updateProductText } from '../../../../Apis';
import useDebounce from '../../../../hooks/useDebounce';
import { notify } from '../../../../helper/notify';
import { Editor } from '@tinymce/tinymce-react/lib/cjs/main/ts/components/Editor';
interface Props {
	hideForm: () => void;
}

const listInventory = [
	{ id: 0, value: 'Hết hàng' },
	{ id: 1, value: 'Còn hàng' }
];

const listStatus = [
	{ id: 0, value: 'Không hoạt động' },
	{ id: 1, value: 'Đang hoạt động' }
];
const ProductForm = (props: Props) => {
	const { hideForm } = props;
	const [pState, pActions] = productCtx();
	const { productDetail } = pState;
	console.log("productDetail",productDetail)

	const editorRef = React.useRef(null);

	

	const [inventory, setInventory] = React.useState<{
		id: number;
		value: string;
	}>(listInventory[productDetail?.inventory || 0]);
	const [status, setStatus] = React.useState<{ id: number; value: string }>(
		listStatus[productDetail?.status || 0]
	);

	const handleChooseInventory = (payload: { id: number; value: string }) => {
		setInventory(payload);
		// cActions.setIdCategory(payload.id)
	};

	const handleChooseStatus = (payload: { id: number; value: string }) => {
		setStatus(payload);
		// cActions.setIdCategory(payload.id)
	};

	// {
	// 	"discount": 0,
	// 	"fallIntoCategories": [
	// 		{
	// 			"id": "",
	// 			"name": "Truyện Trinh Thám"
	// 		}
	// 	],
	// 	"image_URLs": [
	// 		"https://salt.tikicdn.com/cache/400x400/ts/product/93/2e/f9/10d0c4b3ff8954c418706aa26eb76ee7.jpg.webp",
	// 		"https://salt.tikicdn.com/cache/100x100/ts/product/93/2e/f9/10d0c4b3ff8954c418706aa26eb76ee7.jpg.webp",
	// 		"https://salt.tikicdn.com/cache/100x100/ts/product/9f/96/3c/54b47e095c4be44c0da4cc40708f36be.jpg.webp"
	// 	],
	// 	"name": "Combo Trọn Bộ CONAN ĐẶC SẮC: Conan và Tổ chức Áo Đen",
	// 	"price": {
	// 		"currency": "vnd",
	// 		"price": 350.000
	// 	},
	// 	"publishers": {
	// 		"date": "2020-11-05",
	// 		"name": "NXB Kim Đồng"
	// 	},
	// 	"quantity": 150
	// }

	const handleSaveProduct = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const obj = {
			name: e.target['name'].value,
			author: e.target['author'].value,
			price: {
				price: e.target['price'].value,
				currency: 'vnd'
			},
			description: [
				{
					description:editorRef.current.getContent(),
					language: 'vn'
				}
			],
			discount:0,
			fallIntoCategories:[{
				id: '',
				name: e.target['fallIntoCategories'].value
			}],
			image_URLs:[e.target['images'].value],
			publishers:{
				date: new Date(),
				name: e.target['publishers'].value
			},
			quantity: e.target['quantity'].value,
		};
		let result:any=undefined;
		if(productDetail){
			result = await updateProduct(productDetail.id,obj);
		}else{
			result = await updateProductText(obj);
		}

		if (result) {
			console.log('success');
			// pActions.getProductSuccess(result.data.datas, result.data.totalItem);
			hideForm();
			notify('Cập nhật sản phẩm thành công');
		} else {
			notify('Cập nhật sản phẩm thất bại');
		}
	};


	return (
		<div className='py-6 px-4 mt-[20px] bg-white'>
			<h1 className='block w-full text-center text-gray-800 text-2xl font-bold mb-6'>
				Cập nhật
			</h1>
			<form action='/' method='post' onSubmit={e => handleSaveProduct(e)}>
				<div className='flex flex-col mb-4'>
					<h3 className='mb-2 font-bold text-lg text-gray-900'>
						Mã sản phẩm : {productDetail?.id}
					</h3>
				</div>
				<div className='flex flex-col mb-4'>
					<label
						className='mb-2 font-bold text-lg text-gray-900'
						htmlFor='name_Product'>
						Tên sản phẩm
					</label>
					<input
						className='border py-2 px-3 text-grey-800'
						type='text'
						name='name'
						id='name_Product'
						defaultValue={productDetail?.name}
					/>
				</div>
				<div className='flex flex-col mb-4'>
					<label
						className='mb-2 font-bold text-lg text-gray-900'
						htmlFor='name_Product'>
						Tên tác giả
					</label>
					<input
						className='border py-2 px-3 text-grey-800'
						type='text'
						name='author'
						id='name_Product'
						defaultValue={productDetail?.author}
					/>
				</div>
				<div className='flex flex-col mb-4'>
					<label
						className='mb-2 font-bold text-lg text-gray-900'
						htmlFor='name_Product'>
						Giá sản phẩm
					</label>
					<input
						className='border py-2 px-3 text-grey-800'
						type='text'
						name='price'
						id='price_Product'
						defaultValue={productDetail?.price?.price}
					/>
				</div>
				<div className='flex flex-col mb-4'>
					<label
						className='mb-2 font-bold text-lg text-gray-900'
						htmlFor='name_Product'>
					Link anh
					</label>
					<input
						className='border py-2 px-3 text-grey-800'
						type='text'
						name='images'
						id='price_Product'
						defaultValue={productDetail?.image_URLs?.[0]}
					/>
				</div>
				<div className='flex flex-col mb-4'>
					<label
						className='mb-2 font-bold text-lg text-gray-900'
						htmlFor='price_Product'>
						Category
					</label>
					<input
						className='border py-2 px-3 text-grey-800'
						type='text'
						name='fallIntoCategories'
						id='price_Product'
						defaultValue={productDetail?.fallIntoCategories?.[0]?.name}
					/>
				</div>
				<div className='flex flex-col mb-4'>
					<label
						className='mb-2 font-bold text-lg text-gray-900'
						htmlFor='price_Product'>
						Số lượng
					</label>
					<input
						className='border py-2 px-3 text-grey-800'
						type='text'
						name='quantity'
						id='quantity_Product'
						defaultValue={productDetail?.quantity}
					/>
				</div>

				<div className='flex flex-col mb-4'>
					<label
						className='mb-2 font-bold text-lg text-gray-900'
						htmlFor='price_Product'>
							Ngày xuất bản
					</label>
					<input
						className='border py-2 px-3 text-grey-800'
						type='text'
						name='publishers'
						id='publishers_product'
						defaultValue={productDetail?.publishers?.name}
					/>
				</div>
				<div className='flex flex-col mb-4'>
					<label
						className='mb-2 font-bold text-lg text-gray-900'
						htmlFor='description_Product'>
						Mô tả
					</label>
					<Editor
						apiKey='y76jxx43mgkptc4d0yhzovx3duuirvviil3zetp2ekdkhjaq'
						onInit={(evt, editor) => (editorRef.current = editor)}
						initialValue={productDetail?.description?.[0].description || ''}
						init={{
							height: 400,
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
					{/* <CKEditor
								editor={ClassicEditor}
								data={productDetail?.description || ''}
								onInit={editor => {
									editor.editing.view.change(writer => {
										writer.setStyle(
											'height',
											'200px',
											editor.editing.view.document.getRoot()
										);
									});
								}}
								onReady={editor => {
									console.log('Editor is ready to use!', editor);
								}}
								onChange={(event, editor) => {
									const data = editor.getData();
									handleChangeDesc(data);
								}}
							/> */}
				</div>
				{/* <div className='flex flex-col mb-4'>
					<label
						className='mb-2 font-bold text-lg text-gray-900'
						htmlFor='video'>
						Link video
					</label>
					<input
						className='border py-2 px-3 text-grey-800'
						type='text'
						name='video'
						id='video'
						defaultValue={productDetail?.videoUrl||""}
					/>
				</div>
				<div className='flex flex-col mb-4'>
					<label
						className='mb-2 font-bold text-lg text-gray-900'
						htmlFor='Select'>
						Tình trạng
					</label>
					<SelectBox
						state={inventory.value}
						handleChoose={handleChooseInventory}
						idCheckBox='inventory_checked'
						list={listInventory}
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
				</div> */}
				<div className='flex justify-center items-center gap-x-[20px]'>
					<button
						onClick={() => hideForm()}
						className='border min-w-[120px] justify-center border-[#38b2ac] text-[#38b2ac] rounded-sm font-bold py-2 px-6 ml-2 flex items-center'>
							Hủy
					</button>
					<button className='border min-w-[120px] justify-center  border-[#38b2ac] bg-[#38b2ac] text-white rounded-sm font-bold py-2 px-6 ml-2 flex items-center'>
						Lưu
					</button>
				</div>
			</form>
		</div>
	);
};

export default ProductForm;
