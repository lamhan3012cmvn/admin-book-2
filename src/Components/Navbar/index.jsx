import React from 'react';
import user from '../../Images/logo/avatar-vat.jpg';

import {
	FaListUl,
	FaChevronDown,
	FaRegEnvelope,
	FaRegComments,
	FaCheckCircle,
	FaCalendarCheck,
	FaUserEdit,
	FaInbox,
	FaRegIdBadge,
	FaRegCommentDots,
	FaUserTimes,
	FaRegBell,
	FaRegUserCircle,
	FaImage,
	FaBirthdayCake
} from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom';
const Navbar = () => {
	const refNavbar = React.useRef(null);
	// navbar = document.getElementById('navbar');
	const token = localStorage.getItem('token');
	const router = useHistory();
	React.useEffect(() => {
		if (!token) {
			router.push('/login');
		}
	}, []);

	const onClickNavbar = () => {
		if (refNavbar.current.classList.contains('md:hidden')) {
			refNavbar.current.classList.remove('md:hidden');
			refNavbar.current.classList.add('fadeIn');
		} else {
			var _classRemover = function () {
				refNavbar.current.classList.remove('fadeIn');
				refNavbar.current.classList.add('fadeOut');
				console.log('removed');
			};

			var animate = async function () {
				await _classRemover();
				console.log('animated');

				setTimeout(function () {
					refNavbar.current.classList.add('md:hidden');
					refNavbar.current.classList.remove('fadeOut');
				}, 450);
			};

			animate();
		}
	};

	const logout = () => {
		localStorage.removeItem('token');
		router.push('/login');
	};
	return (
		<div className='md:fixed md:w-full md:top-0 md:z-20 flex flex-row flex-wrap items-center bg-white p-6 border-b border-gray-300'>
			{/* <!-- logo --> */}
			<div className='flex-none w-[300px] flex flex-row items-center'>
				{/* <img src={logo} className='w-10 flex-none' /> */}
				<p className='capitalize ml-1 flex-1 text-xl'>
					Trang Quản Trị PureAgarwood
				</p>

				{/* <button
						id='sliderBtn'
						className='flex-none text-right text-gray-900 hidden md:block'>
						<FaListUl />
					</button> */}
			</div>
			{/* <!-- end logo -->    */}

			{/* <!-- navbar content toggle --> */}
			<button
				id='navbarToggle'
				onClick={onClickNavbar}
				className='hidden md:block md:fixed right-0 mr-6'>
				<FaChevronDown />
			</button>

			<ul className='wrap_menuAvatar flex flex-1 justify-end mr-10'>
				<li className='menuItem'>
					<div className='flex items-center gap-[20px]'>
						<div className='iconAvatar w-[36px] h-[36px] rounded-[50%] overflow-hidden'>
							<img
								src={user}
								className='w-full h-full object-cover'
								alt='icon'
							/>
						</div>
						<p className='flex items-center gap-[5px]'>
							Admin
							<FaChevronDown />
						</p>
					</div>

					<div className='wrap_contentHover'>
						<div className='contentHover py-[5px]'>
							<p className='menuProfile menuLinkHover' onClick={logout}>Đăng xuất</p>
							<div className='lineMenu'></div>
						</div>
					</div>
				</li>
			</ul>
		</div>
	);
};

export default Navbar;
