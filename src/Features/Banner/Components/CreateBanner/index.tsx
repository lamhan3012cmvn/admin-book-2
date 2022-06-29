import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { createBannerAsync } from '../../../../Apis/Banners/CBanner';
import { createPriceShipAsync } from '../../../../Apis/PriceShip/CPriceShip';
import { updatePriceShipAsync } from '../../../../Apis/PriceShip/UPriceShip';
import { listLanguage } from '../../../../Common';
import SelectBox from '../../../../Components/SelectBox';
import { notify } from '../../../../helper/notify';
import { bannerCtx } from '../../../../Store/banner.context';
import { priceShipCtx } from '../../../../Store/priceShip.context';
import * as yup from 'yup';
import ErrorMessage from '../../../../Components/ErrorMessage';
interface Props {
	handleHideFrom: () => void;
}

const schema = yup
	.object({
		url: yup
			.string()
			.required('Vui lòng nhập thông tin tấm ảnh')
			.url('Không đúng định dạng URL'),
		title: yup.string().required('Vui lòng nhập tiêu đề'),
		desc: yup.string().required('Vui lòng nhập mô tả'),
		lang: yup
			.number()
			.required('Vui lòng chọn ngôn ngữ')
			.min(0, 'Vui lòng chọn ngôn ngữ')
			.max(1, 'Vui lòng chọn ngôn ngữ')
	})
	.required();

const CreateBanner = (props: Props) => {
	const { handleHideFrom } = props;
	const [bannerState, bannerActions] = bannerCtx();

	const handleSaveBanner = async data => {
		const obj = {
			url: data.url,
			title: data.title,
			desc: data.desc,
			lang: data.lang
		};
		const result = await createBannerAsync(obj);
		if (result.success) {
			bannerActions.setBanners(result.data);
			handleHideFrom();
			notify('Tạo banner thành công');
		} else {
			console.log(result.message);
			handleHideFrom();
			notify('Tạo banner thất bại');
		}
	};

	const handleChangeLang = (value: { id: number; value: string }) => {
		setLang(value.value);
		setValue('lang', value.id);
	};

	React.useEffect(() => {
		setValue('lang', 0);
	}, []);

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors }
	} = useForm({
		resolver: yupResolver(schema)
	});

	const [stateLang, setLang] = React.useState('Tiếng Việt');
	return (
		<div className='py-6 px-4 max-w-[800px] w-full relative  '>
			<div className='w-full bg-white rounded shadow-2xl p-8 m-4 productForm-wrapper z-10'>
				<div className='py-6 px-4'>
					<h1 className='block w-full text-center text-gray-800 text-2xl font-bold mb-6'>
						Tạo Banner
					</h1>
					<form onSubmit={handleSubmit(handleSaveBanner)}>
						<div className='flex flex-col mb-4'>
							<label
								className='mb-2 font-bold text-lg text-gray-900'
								htmlFor='link_Image'>
								Link ảnh
							</label>
							<input
								{...register('url')}
								className='border py-2 px-3 text-grey-800'
								type='text'
								id='link_Image'
								defaultValue={''}
								placeholder='VD: https://www.google.com/'
							/>
						</div>
						{errors.url && (<ErrorMessage title={errors.url.message} />)}
						<div className='flex flex-col mb-4'>
							<label
								className='mb-2 font-bold text-lg text-gray-900'
								htmlFor='title'>
								Tiêu đề
							</label>
							<input
								{...register('title')}
								className='border py-2 px-3 text-grey-800'
								type='text'
								id='title'
								defaultValue={''}
								placeholder='VD: Trầm hương nguyên chất'
							/>
						</div>
						{errors.title && (<ErrorMessage title={errors.title.message} />)}
						<div className='flex flex-col mb-4'>
							<label
								className='mb-2 font-bold text-lg text-gray-900'
								htmlFor='language'>
								Ngôn ngữ
							</label>
							<SelectBox
								state={stateLang}
								handleChoose={handleChangeLang}
								idCheckBox='status_checked'
								list={listLanguage}
							/>
						</div>
						{errors.lang && (<ErrorMessage title={errors.lang.message} />)}
						<div className='flex flex-col mb-4'>
							<label
								className='mb-2 font-bold text-lg text-gray-900'
								htmlFor='desc'>
								Mô tả ngắn
							</label>
							<textarea
								{...register('desc')}
								className='border py-2 px-3 text-grey-800 min-h-[200px]'
								id='desc'
								defaultValue={''}
								placeholder='VD: Trầm hương nguyên chất'
							/>
						</div>
						{errors.desc && (<ErrorMessage title={errors.desc.message} />)}

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

export default CreateBanner;
