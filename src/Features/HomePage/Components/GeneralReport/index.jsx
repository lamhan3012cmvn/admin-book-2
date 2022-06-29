import React from 'react';
import { FaProductHunt, FaRegMoneyBillAlt } from 'react-icons/fa';
import { FiShoppingCart } from 'react-icons/fi';
// import { BiCategoryAlt } from 'react-icons/bi';
import { statisticCtx } from '../../../../Store/statistic.context';
const GeneralReport = () => {
	const [statisticState, statisticActions] = statisticCtx();

	return (
		<div className='grid grid-cols-4 gap-6 xl:grid-cols-1'>
			<div className='report-card group'>
				<div className='card transition-all ease-in-out duration-300 rounded bg-white border border-gray-300 group-hover:shadow-lg group-hover:border-white group-hover:scale-[1.1]]'>
					<div className='card-body p-6 flex flex-col'>
						<div className='flex flex-row justify-between items-center'>
							<div className='h6 text-indigo-700'>💵</div>
							<span className='rounded-full text-white badge bg-red-400 text-xs flex px-2 py-2'>
								{statisticState.statistic?.orderCount}
							</span>
						</div>
						<div className='mt-8'>
							<h1 className='h5 num-4'></h1>
							<p>Số lượng đơn hàng</p>
						</div>
					</div>
				</div>
				<div className='transition-all ease-in-out duration-300 bg-white p-1 mx-4 border border-t-0 rounded rounded-t-none'></div>
			</div>
			<div className='report-card group'>
				<div className='card transition-all ease-in-out duration-300 rounded bg-white border border-gray-300 group-hover:shadow-lg group-hover:border-white group-hover:scale-[1.1]]'>
					<div className='card-body p-6 flex flex-col'>
						<div className='flex flex-row justify-between items-center'>
							<div className='h6 text-indigo-700'>📦</div>
							<span className='rounded-full text-white badge bg-red-400 text-xs flex px-2 py-2'>
								{statisticState.statistic?.productCount}
							</span>
						</div>
						<div className='mt-8'>
							<h1 className='h5 num-4'></h1>
							<p>Số lượng sản phẩm</p>
						</div>
					</div>
				</div>
				<div className='transition-all ease-in-out duration-300 bg-white p-1 mx-4 border border-t-0 rounded rounded-t-none'></div>
			</div>
			<div className='report-card group'>
				<div className='card transition-all ease-in-out duration-300 rounded bg-white border border-gray-300 group-hover:shadow-lg group-hover:border-white group-hover:scale-[1.1]]'>
					<div className='card-body p-6 flex flex-col'>
						<div className='flex flex-row justify-between items-center'>
							<div className='h6 text-indigo-700'>📑</div>
							<span className='rounded-full text-white badge bg-red-400 text-xs flex px-2 py-2'>
								{statisticState.statistic?.categoryCount} /{' '}
								{statisticState.statistic?.subCategoryCount}
							</span>
						</div>
						<div className='mt-8'>
							<h1 className='h5 num-4'></h1>
							<p>Số lượng danh mục/ danh mục con</p>
						</div>
					</div>
				</div>
				<div className='transition-all ease-in-out duration-300 bg-white p-1 mx-4 border border-t-0 rounded rounded-t-none'></div>
			</div>
			<div className='report-card group'>
				<div className='card transition-all ease-in-out duration-300 rounded bg-white border border-gray-300 group-hover:shadow-lg group-hover:border-white group-hover:scale-[1.1]]'>
					<div className='card-body p-6 flex flex-col'>
						<div className='flex flex-row justify-between items-center'>
							<div className='h6 text-indigo-700'>💻</div>
							<span className='rounded-full text-white badge bg-red-400 text-xs flex px-2 py-2'>
								{statisticState.statistic?.totalAccessIndexCount}
							</span>
						</div>
						<div className='mt-8'>
							<h1 className='h5 num-4'></h1>
							<p>Số lượng truy cập trang chủ</p>
						</div>
					</div>
				</div>
				<div className='transition-all ease-in-out duration-300 bg-white p-1 mx-4 border border-t-0 rounded rounded-t-none'></div>
			</div>
		</div>
	);
};

export default GeneralReport;
