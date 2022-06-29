import React from 'react';
import { findAllSubCategory } from '../../../../Apis/Categories/FAllCategory';
import { createProductAsync } from '../../../../Apis/Products/CProduct';
import { updateProductAsync } from '../../../../Apis/Products/UProduct';
import { listLanguage } from '../../../../Common';
import Button from '../../../../Components/Button';
import SelectBox from '../../../../Components/SelectBox';
import { notify } from '../../../../helper/notify';
import { categoryCtx } from '../../../../Store/category.context';
import { productCtx } from '../../Contexts/product.context';
import './style.css';

interface CreateProductProps {
	hideForm: () => void;
}
const EditProduct = (props: CreateProductProps) => {
	const [cState, cActions] = categoryCtx();
	const [pState, pActions] = productCtx();
	// const [category, setCategory] = React.useState<{ id: number; value: string }>(
	// 	{ id: pState.product.category.id, value: pState.product.category.nameVn }
	// );
	// const [subCategory, setSubCategory] = React.useState<{
	// 	id: number;
	// 	value: string;
	// }>({
	// 	id: pState.product.subCategory.id,
	// 	value: pState.product.subCategory.nameVn
	// });
	const [images, setImages] = React.useState<
		Array<{
			readonly id: number;
			url: string;
			status: number;
			flag: boolean;
		}>
	>([]);

	const handleAddImage = () => {
		setImages([...images, { id: 0, url: '', status: 1, flag: false }]);
	};

	const handleChooseCategory = (payload: { id: number; value: string }) => {
		setCategory(payload);
		cActions.setIdCategory(payload.id);
	};
	const handleChooseSubCategory = (payload: { id: number; value: string }) => {
		setSubCategory(payload);
		cActions.setIdCategory(payload.id);
	};

	const handleUpdateProduct = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// console.log("asdb")
		// if (category.id === -1 || subCategory.id === -1) {
		//   console.log("handle Fail")
		//   return;
		// }
		const obj = {
			productId: pState.product.id,
			categoryId: category.id,
			subCategoryId: subCategory.id,
			images: images.map(item => {
				return { id: item.id, url: item.url, status: item.status };
			})
		};
		const result = await updateProductAsync({ pageNo: pState.pageNo - 1 }, obj);
		if (result.success) {
			pActions.getProductSuccess(result.data.datas, result.data.totalItem);
			props.hideForm();
			notify('Cập nhật sản phẩm thành công');
		} else {
			notify('Cập nhật sản phẩm thất bại');
		}
	};

	const handleRemoveImage = (index: number) => {
		const newImages = [...images];
		const fillter=newImages.filter(e=>e.status===1)
		if(fillter.length<=1) {
			notify("Số lượng hình tối thiểu là một")
			return;
		}
		console.log("lenght",fillter.length)
		if (newImages[index].flag) {
			newImages[index].status = 0;
		} else {
			newImages.splice(index, 1);
		}
		setImages(newImages);
	};

	const handleChangeImage = (
		e: React.ChangeEvent<HTMLInputElement>,
		index: number
	) => {
		const newImages = [...images];
		newImages[index].url = e.target.value;
		setImages(newImages);
	};
	React.useEffect(() => {
		setImages(
			pState.product?.productImages.map(e => {
				return { ...e, flag: true };
			}) || []
		);
	}, [pState.product]);

	const getCategoryAsync = async () => {
		const result = await findAllSubCategory();
		// notify(result.message)
		if (result.success) cActions.getCategorySuccess(result.data);
		// else cActions.getCategoryError()
	};

	React.useEffect(() => {
		getCategoryAsync();
	}, []);
	return (
		<div>
			<form
				onSubmit={handleUpdateProduct}
				className='max-w-[1200px] min-w-[800px] py-8 px-8 w-full relative createProduct_wrapper'>
				<h3 className='text-2xl text-center mb-5'>Cập nhật</h3>
				<div className='flex flex-col gap-x-3 gap-y-4'>
					{/* <div>
						<h3 className='text-lg mb-2'>Danh mục</h3>
						<div className='w-full pl-3'>
							<SelectBox
								state={category.value}
								handleChoose={handleChooseCategory}
								list={cState.listCategory}
								idCheckBox='category_checked2'
							/>
						</div>
					</div>
					<div className=''>
						<h3 className='text-lg mb-2'>Danh mục con 
							<span className=' text-red-500 text-base'>
							{' '}(Chọn lại danh mục con khi thay đổi danh mục)
							</span>
						</h3>
						<div className='w-full pl-3'>
							<SelectBox
								state={subCategory.value}
								handleChoose={handleChooseSubCategory}
								idCheckBox='sub_category_checked2'
								list={cState.listSubCategory()}
							/>
						</div>
					</div> */}
					{/* <div>
						<div>
							<div className='grid mb-4'>
								<label
									className='mb-2 font-bold text-lg text-gray-900'
									htmlFor='name_Product'>
									Link ảnh
								</label>
								<div className='grid gap-y-[20px] pl-3'>
									{images
										.map((item, index) => {
											if(item.status===1)
												return (
												<div
													className='flex gap-[20px] items-center'
													key={index}>
													<input
														className='border py-2 px-3 text-grey-800 w-full'
														type='text'
														name='name_Product'
														id='name_Product'
														defaultValue={item.url}
														onChange={e => handleChangeImage(e, index)}
													/>
													<div className='w-[70px]'>
														<p
															className='cursor-pointer text-red-500 select-none'
															onClick={() => handleRemoveImage(index)}>
															Xóa link
														</p>
													</div>
												</div>
											);
											return <></>
										})}
								</div>
							</div>
							<p
								className='cursor-pointer text-red-500 select-none'
								onClick={handleAddImage}>
								+ Thêm link ảnh
							</p>
						</div>
					</div> */}
					<div className='flex items-center justify-center mt-3'>
						<Button onClick={() => {}}>Lưu</Button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default EditProduct;
