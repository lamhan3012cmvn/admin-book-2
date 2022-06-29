import React from 'react';
import { createPriceShipAsync } from '../../../../Apis/PriceShip/CPriceShip';
import { updatePriceShipAsync } from '../../../../Apis/PriceShip/UPriceShip';
import SelectBox from '../../../../Components/SelectBox';
import { priceShipCtx } from '../../../../Store/priceShip.context';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ErrorMessage from '../../../../Components/ErrorMessage';
import { notify } from '../../../../helper/notify';

interface Props {
	handleHideFrom: () => void;
}

const schema = yup
	.object({
		province: yup.string().required('Vui lòng chọn category'),
		priceShip: yup.string().required('Vui lòng nhập giá ship')
	})
	.required();

const CreatePriceShip = (props: Props) => {
	const { handleHideFrom } = props;
	const [priceShipState, priceShipActions] = priceShipCtx();

  const {
		register,
		handleSubmit,
		setValue,
		formState: { errors }
	} = useForm({
		resolver: yupResolver(schema)
	});
  
	const handleSavePriceShip = async data => {
		const obj = {
			province: data.province,
			priceShip: data.priceShip
		};
		const result = await createPriceShipAsync(obj);
		if (result.success) {
			priceShipActions.setPriceShip(result.data.datas, result.data.totalItem);
			handleHideFrom();
			notify("Tạo giá ship thành công")
		} else {
			notify("Tạo giá ship thất bại")
		}
	};
	return (
		<div className='py-6 px-4 max-w-[600px] w-full relative  '>
			<div className='w-full bg-white rounded shadow-2xl p-8 m-4 productForm-wrapper z-10'>
				<div className='py-6 px-4'>
					<h1 className='block w-full text-center text-gray-800 text-2xl font-bold mb-6'>
						Tạo mới
					</h1>
					<form onSubmit={handleSubmit(handleSavePriceShip)}>
						<div className='flex flex-col mb-4'>
							<label
								className='mb-2 font-bold text-lg text-gray-900'
								htmlFor='name_provider'>
								Địa chỉ
							</label>
							<input
								{...register('province')}
								className='border py-2 px-3 text-grey-800'
								type='text'
								id='name_provider'
								defaultValue=''
								placeholder='VD: Hồ Chí Minh'
							/>
							{errors.province && (
								<ErrorMessage title={errors.province.message} />
							)}
						</div>
						<div className='flex flex-col mb-4'>
							<label
								className='mb-2 font-bold text-lg text-gray-900'
								htmlFor='price_ship'>
								Giá
							</label>
							<input
								{...register('priceShip')}
								className='border py-2 px-3 text-grey-800'
								type='text'
								id='price_ship'
								placeholder='VD: 80000'
							/>
							{errors.priceShip && (
								<ErrorMessage title={errors.priceShip.message} />
							)}
						</div>
						<div className='flex justify-center items-center'>
							<button className='border border-[#38b2ac] bg-[#38b2ac] text-white rounded-sm font-bold py-2 px-6 ml-2 flex items-center'>
								Lưu
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default CreatePriceShip;
