import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import { forgotPasswordAsync } from '../../Apis/Users/ForgotPassword';
import { loginAdminAsync } from '../../Apis/Users/Login';
import ErrorMessage from '../../Components/ErrorMessage';
interface Props {}

const schema = yup
	.object({
		email: yup
			.string()
			.email('Email chưa đúng định dạng')
			.required('Vui lòng nhập email'),
	})
	.required();
const ForgotPassword = (props: Props) => {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({
		resolver: yupResolver(schema)
	});

	const handleForgotPassword = async data => {
		const result = await forgotPasswordAsync({
			email: data.email,
		});
		if (result.success ) {
			window.open('https://mail.google.com/mail', '_blank');
		}
	};
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
									Tên tài khoản
								</div>
								<input
									{...register('email')}
									className='w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-green-600'
									type=''
									placeholder='mike@gmail.com'
								/>
								{errors.email && <ErrorMessage title={errors.email.message} />}
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

export default ForgotPassword;
