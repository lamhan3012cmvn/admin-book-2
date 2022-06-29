import React from 'react';
import { createProductAsync } from '../../../../Apis/Products/CProduct';
import Button from '../../../../Components/Button';
import SelectBox from '../../../../Components/SelectBox';
import { notify } from '../../../../helper/notify';
import { categoryCtx } from '../../../../Store/category.context';
import { productCtx } from '../../Contexts/product.context';
import './style.css';

interface CreateProductProps {
	hiddenCreate: () => void;
}
const CreateProduct = (props: CreateProductProps) => {
	const [cState, cActions] = categoryCtx();
	const [pState, pActions] = productCtx();
	const initial = { id: -1, value: 'Value' };
	const [category, setCategory] =
		React.useState<{ id: number; value: string }>(initial);
	const [subCategory, setSubCategory] =
		React.useState<{ id: number; value: string }>(initial);

	const handleChooseCategory = (payload: { id: number; value: string }) => {
		setCategory(payload);
		cActions.setIdCategory(payload.id);
	};
	const handleChooseSubCategory = (payload: { id: number; value: string }) => {
		setSubCategory(payload);
		cActions.setIdCategory(payload.id);
	};

	const handleCreateProduct = async () => {
		console.log('asdb');
		if (category.id === -1 || subCategory.id === -1) {
			console.log('handle Fail');
			return;
		}
		const params = {
			categoryId: category.id,
			subcategoryId: subCategory.id,
			pageNo: pState.pageNo - 1
		};
		const result = await createProductAsync(params);
		if (result.success) {
			pActions.getProductSuccess(result.data.datas, result.data.totalItem);
			notify('Tạo sản phẩm thành công');
			props.hiddenCreate();
		} else {
			notify('Tạo sản phẩm thất bại');
		}
	};
	return (
		<div>
			<div className='max-w-[1200px] min-w-[400px] py-8 px-8 w-full relative createProduct_wrapper'>
				<h3 className='text-2xl text-center mb-5'>Tạo sản phẩm</h3>
				<div className='flex flex-col gap-x-3 gap-y-4'>
					<div>
						<h3 className='text-lg mb-2'>Danh mục</h3>
						<div className='w-full pl-3'>
							<SelectBox
								state={category.value}
								handleChoose={handleChooseCategory}
								list={cState.listCategory}
								idCheckBox='category_checked'
							/>
						</div>
					</div>
					<div className=''>
						<h3 className='text-lg mb-2'>Danh mục con</h3>
						<div className='w-full pl-3'>
							<SelectBox
								state={subCategory.value}
								handleChoose={handleChooseSubCategory}
								idCheckBox='sub_category_checked'
								list={cState.listSubCategory()}
							/>
						</div>
					</div>
					<div className='flex items-center justify-center mt-3'>
						<Button onClick={() => handleCreateProduct()}>Lưu</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreateProduct;
