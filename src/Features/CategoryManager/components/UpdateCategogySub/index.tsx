import React, { FormEvent } from 'react';
import { createCategory, updateSubCategory } from '../../../../Apis';
import { createCategorySub } from '../../../../Apis/Categories/CCategorySub';
import Button from '../../../../Components/Button';
import SelectBox from '../../../../Components/SelectBox';
import { notify } from '../../../../helper/notify';
import { categoryCtx } from '../../../../Store/category.context';

interface UpdateCategoryProps {
	hiddenCreate: (value: boolean) => void;
}
const UpdateCategorySub = ({ hiddenCreate }: UpdateCategoryProps) => {
	const [cState, cActions] = categoryCtx();
	const { currentSubCategory } = cState;

	const formRef = React.useRef<HTMLFormElement>();

	// const initial = { id: currentSubCategory.status, value: "Active" }

	const listStatus = [
		{ id: 0, value: 'Không hoạt động' },
		{ id: 1, value: 'Đang hoạt động' }
	];
	const [status, setStatus] = React.useState<{ id: number; value: string }>(
		listStatus[currentSubCategory?.status || 0]
	);

	const handleChooseStatus = (payload: { id: number; value: string }) => {
		setStatus(payload);
		// cActions.setIdCategory(payload.id)
	};

	const handleCreateCategory = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!currentSubCategory) {
			return;
		}
		const obj = {
			nameVn: formRef.current['category-vn'].value,
			nameEn: formRef.current['category-en'].value,
			status: status.id,
			categoryId: currentSubCategory.categoryId,
			id: currentSubCategory.id
		};
		const result = await updateSubCategory(obj);
		if (result.success) {
			cActions.getCategorySuccess(result.data);
			hiddenCreate(false);
      notify("Cập nhật danh mục con thành công")
		} else {
			notify('Cập nhật danh mục con thất bại');
		}
	};
	return (
		<div>
			<div className='max-w-[1200px] min-w-[400px] py-8 px-8 w-full relative createProduct_wrapper'>
				<h3 className='text-2xl text-center mb-5'>Cập nhật</h3>
				<form
					className='flex flex-col gap-x-3 gap-y-4'
					ref={formRef}
					onSubmit={handleCreateCategory}>
					<div>
						<div className='w-full pl-3'>
							<div className='flex flex-col mb-4'>
								<label
									className='mb-2 font-bold text-lg text-gray-900'
									htmlFor='category-en'>
									Danh mục con 🇺🇸
								</label>
								<input
									className='border py-2 px-3 text-grey-800'
									type='text'
									name='category-en'
									id='category-en'
									defaultValue={currentSubCategory?.nameEn}
								/>
							</div>
						</div>
						<div className='w-full pl-3'>
							<div className='flex flex-col mb-4'>
								<label
									className='mb-2 font-bold text-lg text-gray-900'
									htmlFor='category-vn'>
									Danh mục con 🇻🇳
								</label>
								<input
									className='border py-2 px-3 text-grey-800'
									type='text'
									name='category-vn'
									id='category-vn'
									defaultValue={currentSubCategory?.nameVn}
								/>
							</div>
						</div>
						<div className='w-full pl-3'>
							<div className='mb-4'>
								<h3 className='mb-2 font-bold text-lg text-gray-900'>
									Trạng thái
								</h3>
								<SelectBox
									state={status.value}
									handleChoose={handleChooseStatus}
									idCheckBox='sub_category_status_checked'
									list={listStatus}
								/>
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

export default UpdateCategorySub;
