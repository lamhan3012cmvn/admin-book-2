import React, { FormEvent } from 'react';
import { createCategory } from '../../../../Apis';
import Button from '../../../../Components/Button';
import { categoryCtx } from '../../../../Store/category.context';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ErrorMessage from '../../../../Components/ErrorMessage';
import { notify } from '../../../../helper/notify';
interface CreateCategoryProps {
	hiddenCreate: (value: boolean) => void;
}

const schema = yup
	.object({
		nameVn: yup.string().required('Vui lòng nhập danh mục'),
		nameEn: yup.string().required('Vui lòng nhập danh mục con')
	})
	.required();
const CreateCategory = ({ hiddenCreate }: CreateCategoryProps) => {
	const [_, cActions] = categoryCtx();

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({
		resolver: yupResolver(schema)
	});

	const handleCreateCategory = async data => {
		const obj = {
			nameVn: data.nameVn,
			nameEn: data.nameEn
		};
		const result = await createCategory(obj);
		if (result.success) {
			cActions.getCategorySuccess(result.data);
			hiddenCreate(false);
			notify('Tạo danh mục thành công');
		} else {
			notify('Tạo danh mục thất bại');
		}
	};
	return (
		<div>
			<div className='max-w-[1200px] min-w-[400px] py-8 px-8 w-full relative createProduct_wrapper'>
				<h3 className='text-2xl text-center mb-5'>Tạo danh mục</h3>
				<form
					className='flex flex-col gap-x-3 gap-y-4'
					onSubmit={handleSubmit(handleCreateCategory)}>
					<div>
						{/* <h3 className="text-lg mb-2">Category EN</h3> */}
						<div className='w-full pl-3'>
							<div className='flex flex-col mb-4'>
								<label
									className='mb-2 font-bold text-lg text-gray-900'
									htmlFor='category-en'>
									Danh mục 🇺🇸
								</label>
								<input
									{...register('nameEn')}
									className='border py-2 px-3 text-grey-800'
									type='text'
									id='category-en'
									placeholder={'VD: Material'}
								/>
								{errors.nameEn && (
									<ErrorMessage title={errors.nameEn.message} />
								)}
							</div>
						</div>
					</div>
					<div className=''>
						{/* <h3 className="text-lg mb-2">Category VN</h3> */}
						<div className='w-full pl-3'>
							<div className='flex flex-col mb-4'>
								<label
									className='mb-2 font-bold text-lg text-gray-900'
									htmlFor='category-vn'>
									Danh mục 🇻🇳
								</label>
								<input
									{...register('nameVn')}
									className='border py-2 px-3 text-grey-800'
									type='text'
									id='category-vn'
									placeholder={'VD: Nguyên liệu'}
								/>
								{errors.nameVn && (
									<ErrorMessage title={errors.nameVn.message} />
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

export default CreateCategory;
