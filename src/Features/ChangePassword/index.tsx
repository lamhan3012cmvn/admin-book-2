import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import { updatePasswordAsync } from '../../Apis/Users/ChangePasswprd';
import ErrorMessage from '../../Components/ErrorMessage';
import { notify } from '../../helper/notify';
interface Props {}

const schema = yup
	.object({
		password: yup
			.string()
			.min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
			.required('Vui lòng nhập mật khẩu'),
		confirmPassword: yup
			.string()
			.min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
			.oneOf([yup.ref('password')], 'Mật khẩu không khớp')
	})
	.required();
const ChangePassword = (props: Props) => {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({
		resolver: yupResolver(schema)
	});
	const router = useHistory();

	const params = new URLSearchParams(router.location.search);
	const handleForgotPassword = async data => {
		const result = await updatePasswordAsync({
			newPassword: data.password,
			forgotPasswordCode: params.get('forgotPasswordCode')
		});
		if (result.success) {
			notify('Đổi mật khẩu thành công');
			router.push('/login');
		}
	};
	const [showPassword, setShowPassword] = React.useState(false);

	return (
		<div className='flex items-center justify-center h-screen'>
			<div className='w-1/2 max-w-[550px]'>
				<div className='mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl'>
					<h2
						className='text-center text-4xl text-green-400 font-display font-semibold lg:text-left xl:text-5xl
                    xl:text-bold'>
						Quên mật khẩu
					</h2>
					<div className='mt-12'>
						<form onSubmit={handleSubmit(handleForgotPassword)}>
							<div>
								<div className='text-sm font-bold text-gray-700 tracking-wide'>
									Password
								</div>

								<div className='relative'>
									<input
										{...register('password')}
										className='w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-green-600'
										type={showPassword ? 'text' : 'password'}
										placeholder='VD: 12345'
									/>
									<div
										className='absolute top-[50%] right-[15px] translate-y-[-50%] cursor-pointer'
										onClick={() => setShowPassword(!showPassword)}>
										{showPassword ? (
											<AiFillEyeInvisible className='text-[20px]' />
										) : (
											<AiFillEye className='text-[20px]' />
										)}
									</div>
								</div>
								{errors.password && (
									<ErrorMessage title={errors.password.message} />
								)}
							</div>
							<div className='mt-[20px]'>
								<div className='text-sm font-bold text-gray-700 tracking-wide'>
									Confirm Password
								</div>
								<div className='relative'>
									<input
										{...register('confirmPassword')}
										className='w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-green-600'
										type={showPassword ? 'text' : 'password'}
										placeholder='VD: 12345'
									/>
									<div
										className='absolute top-[50%] right-[15px] translate-y-[-50%] cursor-pointer'
										onClick={() => setShowPassword(!showPassword)}>
										{showPassword ? (
											<AiFillEyeInvisible className='text-[20px]' />
										) : (
											<AiFillEye className='text-[20px]' />
										)}
									</div>
								</div>
								{errors.confirmPassword && (
									<ErrorMessage title={errors.confirmPassword.message} />
								)}
							</div>

							<div className='mt-10'>
								<button
									className='bg-green-400 text-white p-4 w-full rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-opacity-80
                                shadow-lg'>
									Quên mật khẩu
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChangePassword;
