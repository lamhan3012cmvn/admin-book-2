import React from 'react';
import { Link } from 'react-router-dom';
import { getSideBarAsync } from '../../Apis/SideBar/RSideBar';
import { sideBarCtx } from '../../Store/sider.context';
const SideBar = () => {
	const [sideBarState, sideBarActions] = sideBarCtx();

	const sideBarData = [
		// {
		// 	page: 'Home',
		// 	child: []
		// },
		{
			page: 'Quản Lý Banner',
			child: [
				{
					url: '/admin/banner-manager',
					title: 'Danh sách banner'
				}
			]
		},
		{
			page: 'Quản Lý Danh Mục Sản Phẩm',
			child: [
				{
					url: '/admin/category-manager',
					title: 'Danh sách danh mục'
				}
			]
		},
		{
			page: 'Quản Lý Sản Phẩm',
			child: [
				{
					url: '/admin/product-manager',
					title: 'Danh sách sản phẩm'
				}
			]
		},
		{
			page: 'Quản Lý Bài Đăng',
			child: [
				...sideBarState.blogs.map((item, index) => {
					return {
						url: `/admin/blog-manager/${item.id}`,
						title: item.title
					};
				})
			]
		},
		{
			page: 'Quản Lý Đơn Hàng',
			child: [
				{
					url: '/admin/bill-manager',
					title: 'Danh sách đơn hàng'
				}
			]
		},
		{
			page: 'Quản Lý Giá Ship',
			child: [
				{
					url: '/admin/price-ship-manager',
					title: 'Danh sách giá ship'
				}
			]
		},
		{
			page: 'Quản Lý Người Dùng',
			child: [
				{
					url: '/admin/user-manager',
					title: 'Danh sách tài khoản'
				},
				{
					url: '/admin/email-request',
					title: 'Danh Sách Email Đăng Ký'
				}
			]
		}
	];

	const getSideBarApi = async () => {
		const result = await getSideBarAsync();
		if (result.success) {
			sideBarActions.setSideBar(result.data);
		} else {
			sideBarActions.setSideBar([]);
		}
	};

	React.useEffect(() => {
		getSideBarApi();
	}, []);

	return (
		// <!-- start sidebar -->
		<div
			id='sideBar'
			className='relative flex flex-col flex-wrap bg-white border-r border-gray-300 p-6 flex-none w-64 md:-ml-64 md:fixed md:top-0 md:z-30 md:h-screen md:shadow-xl animated faster'>
			{/* <!-- sidebar content --> */}
			<div className='flex flex-col'>
				{/* <!-- sidebar toggle --> */}
				<div className='text-right hidden md:block mb-4'>
					<button id='sideBarHideBtn'>
						<i className='fad fa-times-circle'></i>
					</button>
				</div>
				{/* <!-- end sidebar toggle --> */}
				{sideBarData.map((e, i) => {
					return (
						<React.Fragment key={i}>
							<p className='uppercase text-xs text-gray-600 mb-4 tracking-wider'>
								{e.page}
							</p>
							{e.child.map((el, il) => {
								return (
									<Link
										key={il}
										to={el.url}
										className='mb-3 capitalize font-medium text-sm hover:text-teal-600 transition ease-in-out duration-500'>
										<i className='fad fa-chart-pie text-xs mr-2'></i>
										{el.title}
									</Link>
								);
							})}
						</React.Fragment>
					);
				})}

				{/* <!-- link --> */}
			</div>
		</div>
		// <!-- end sidbar -->
	);
};

export default SideBar;
