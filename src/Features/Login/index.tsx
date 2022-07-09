import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import { loginAdminAsync } from '../../Apis/Users/Login';
import ErrorMessage from '../../Components/ErrorMessage';
import { Link } from 'react-router-dom';
import { notify } from '../../helper/notify';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
interface Props {}

const schema = yup
	.object({
		email: yup
			.string()
			.email('Email chưa đúng định dạng')
			.required('Vui lòng nhập email'),
		password: yup.string().trim().required('Vui lòng nhập mật khẩu')
	})
	.required();
const LoginPage = (props: Props) => {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({
		resolver: yupResolver(schema)
	});
	const history = useHistory();

	const handleLogin = async data => {
		const result:any = await loginAdminAsync({
			email: data.email,
			password: data.password
		});
		console.log(result);
		if (result && result?.roles.includes("ROLE_ADMIN")) {
			localStorage.setItem('token',result.token_type+" "+ result.token);
			notify('Đăng nhập thành công');
			history.push('/admin/');
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
						Đăng nhập
					</h2>
					<div className='mt-12'>
						<form onSubmit={handleSubmit(handleLogin)}>
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
							<div className='mt-8'>
								<div className='flex justify-between items-center'>
									<div className='text-sm font-bold text-gray-700 tracking-wide'>
										Mật khẩu
									</div>
									<div>
										<Link to='/forgotPassword'>
											<a
												className='text-xs font-display font-semibold text-green-400 hover:text-green-600
											cursor-pointer'>
												Quên mật khẩu?
											</a>
										</Link>
									</div>
								</div>
								<div className='relative'>
									<input
										{...register('password')}
										className='w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500'
										type={showPassword ? 'text' : 'password'}
										placeholder='Enter your password'
									/>
									<div
										className='absolute top-[50%] right-[15px] translate-y-[-50%] cursor-pointer'
										onClick={() => setShowPassword(!showPassword)}>
										{showPassword ? <AiFillEyeInvisible className='text-[20px]'/> : <AiFillEye className='text-[20px]'/>}
									</div>
								</div>
								{errors.password && (
									<ErrorMessage title={errors.password.message} />
								)}
							</div>
							<div className='mt-10'>
								<button
									className='bg-green-400 text-white p-4 w-full rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-opacity-80
                                shadow-lg'>
									Đăng nhập
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
