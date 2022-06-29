import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { updateBannerAsync } from '../../../../Apis/Banners/UBanner';
import { updatePriceShipAsync } from '../../../../Apis/PriceShip/UPriceShip';
import SelectBox from '../../../../Components/SelectBox';
import { notify } from '../../../../helper/notify';
import { bannerCtx } from '../../../../Store/banner.context';
import { priceShipCtx } from '../../../../Store/priceShip.context';
import * as yup from 'yup';
import { listLanguage } from '../../../../Common';
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

const EditBanner = (props: Props) => {
	const { handleHideFrom } = props;
	const [bannerState, bannerActions] = bannerCtx();

	const handleSaveBanner = async data => {
  console.log(`LHA:  ===> file: index.tsx ===> line 38 ===> data`, data)
		const obj = {
			id: bannerState.banner.id,
			title: data.title,
			desc: data.desc,
			url: data.url,
			lang: data.lang
		};
		const result = await updateBannerAsync(obj);
		// updatePriceShipAsync
		if (result.success) {
			bannerActions.setBanners(result.data);
			handleHideFrom();
			notify('Cập nhật banner thành công');
		} else {
			handleHideFrom();
			notify('Cập nhật banner thất bại');
		}
	};

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors }
	} = useForm({
		resolver: yupResolver(schema)
	});
	const [stateLang, setLang] = React.useState('Viet Nam');

	const handleChangeLang = (value: { id: number; value: string }) => {
		setLang(value.value);
		setValue('lang', value.id);
	};

	React.useEffect(() => {
		if (bannerState.banner) {
			setLang(
				listLanguage.find(item => item.id === bannerState.banner.lang)?.value
			);
			setValue('lang', bannerState.banner.lang);
			setValue('title', bannerState.banner.title);
			setValue('desc', bannerState.banner.desc);
			setValue('url', bannerState.banner.url);
		}
	}, [bannerState.banner]);

	return (
		<div className='py-6 px-4 max-w-[800px] w-full relative  '>
			<div className='w-full bg-white rounded shadow-2xl p-8 m-4 productForm-wrapper z-10'>
				<div className='py-6 px-4'>
					<h1 className='block w-full text-center text-gray-800 text-2xl font-bold mb-6'>
						Cập nhật
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
								defaultValue={bannerState.banner?.url}
							/>
						</div>
						{errors.url && <ErrorMessage title={errors.url.message} />}
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
								name='title'
								id='title'
								defaultValue={bannerState.banner?.title}
							/>
						</div>
						{errors.title && <ErrorMessage title={errors.title.message} />}
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
						{errors.lang && <ErrorMessage title={errors.lang.message} />}
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
								defaultValue={bannerState.banner?.desc}
							/>
						</div>
						{errors.desc && <ErrorMessage title={errors.desc.message} />}
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

export default EditBanner;
