import React, { FormEvent } from 'react';
import * as yup from 'yup';
import { createCategorySub } from '../../../../Apis/Categories/CCategorySub';
import Button from '../../../../Components/Button';
import SelectBox from '../../../../Components/SelectBox';
import { categoryCtx } from '../../../../Store/category.context';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ErrorMessage from '../../../../Components/ErrorMessage';
import { notify } from '../../../../helper/notify';

interface CreateCategoryProps {
	hiddenCreate: (value: boolean) => void;
}

const schema = yup
	.object({
		sub_category_checked: yup.number().required('Vui lòng chọn category'),
		nameSubCateEN: yup.string().required('Vui lòng nhập danh mục'),
		nameSubCateVN: yup.string().required('Vui lòng nhập danh mục')
	})
	.required();

const CreateCategorySub = ({ hiddenCreate }: CreateCategoryProps) => {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors }
	} = useForm({
		resolver: yupResolver(schema)
	});

	const [cState, cActions] = categoryCtx();

	const initial = { id: -1, value: 'Chọn danh mục cha' };
	const [category, setCategory] =
		React.useState<{ id: number; value: string }>(initial);

	const handleChooseCategory = (payload: { id: number; value: string }) => {
		setCategory(payload);
		setValue('sub_category_checked', payload.id);
		cActions.setIdCategory(payload.id);
	};

	const handleCreateCategory = async data => {
		const obj = {
			nameVn: data.nameSubCateVN,
			nameEn: data.nameSubCateEN,
			categoryId: data.sub_category_checked
		};
		const result = await createCategorySub(obj);
		if (result.success) {
			cActions.getCategorySuccess(result.data);
			hiddenCreate(false);
			notify('Tạo danh mục con thành công');
		} else {
			notify('Tạo danh mục con thất bại');
		}
	};
	return (
		<div>
			<div className='max-w-[1200px] min-w-[400px] py-8 px-8 w-full relative createProduct_wrapper'>
				<h3 className='text-2xl text-center mb-5'>Tạo danh mục con</h3>
				<form
					className='flex flex-col gap-x-3 gap-y-4'
					onSubmit={handleSubmit(handleCreateCategory)}>
					<div>
						<div className='w-full pl-3'>
							<div className='mb-4'>
								<h3 className='mb-2 font-bold text-lg text-gray-900'>
									Danh mục cha
								</h3>
								<SelectBox
									state={category.value}
									handleChoose={handleChooseCategory}
									idCheckBox='sub_category_checked'
									registerForm={register('sub_category_checked')}
									list={cState.listCategory}
								/>
								{errors.sub_category_checked && (
									<ErrorMessage title={errors.sub_category_checked.message} />
								)}
							</div>
						</div>
						{/* <h3 className="text-lg mb-2">Category EN</h3> */}
						<div className='w-full pl-3'>
							<div className='flex flex-col mb-4'>
								<label
									className='mb-2 font-bold text-lg text-gray-900'
									htmlFor='category-en'>
									Danh mục con 🇺🇸
								</label>
								<input
									{...register('nameSubCateEN')}
									className='border py-2 px-3 text-grey-800'
									type='text'
									id='category-en'
									placeholder='VD: Pure Agarwood'
								/>
								{errors.nameSubCateEN && (
									<ErrorMessage title={errors.nameSubCateEN.message} />
								)}
							</div>
						</div>
						{/* <h3 className="text-lg mb-2">Category VN</h3> */}
						<div className='w-full pl-3'>
							<div className='flex flex-col mb-4'>
								<label
									className='mb-2 font-bold text-lg text-gray-900'
									htmlFor='category-vn'>
									Danh mục con 🇻🇳
								</label>
								<input
									{...register('nameSubCateVN')}
									className='border py-2 px-3 text-grey-800'
									type='text'
									id='category-vn'
									placeholder='VD: Trầm Hương Nguyên Chất'
								/>
								{errors.nameSubCateVN && (
									<ErrorMessage title={errors.nameSubCateVN.message} />
								)}
							</div>
						</div>
					</div>
					<div className='flex items-center justify-center mt-3'>
						<Button onClick={() => {}}>Lưu</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CreateCategorySub;
