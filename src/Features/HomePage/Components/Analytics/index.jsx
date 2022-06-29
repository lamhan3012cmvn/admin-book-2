import React from 'react';
import { FaUsersCog } from 'react-icons/fa';
import { AiOutlineEyeInvisible } from 'react-icons/ai';
import { teal, yellow } from '../../../../Colors';
import happy from '../../../../Images/img/happy.svg';

const Analytics = () => {
	return (
		<div className='mt-6 grid grid-cols-2 gap-6 xl:grid-cols-1'>
			{/* <!-- update section --> */}
			<div
				className={`rounded  border bg-[#4FD1C5] border-[#4FD1C5] shadow-md text-white`}>
				<div className='p-6 flex flex-row'>
					{/* <!-- image --> */}
					<div className='img-wrapper w-40 h-40 flex justify-center items-center'>
						<img src={happy} alt='img title' />
					</div>
					{/* <!-- end image --> */}

					{/* <!-- info --> */}
					<div className='py-2 ml-10'>
						<h1 className='h6'>Good Job, Mohamed!</h1>
						<p className='text-white text-xs'>
							You've finished all of your tasks for this week.
						</p>

						<ul className='mt-4'>
							<li className='text-sm font-light'>
								<i className='fad fa-check-double mr-2 mb-2'></i> Finish
								Dashboard Design
							</li>
							<li className='text-sm font-light'>
								<i className='fad fa-check-double mr-2 mb-2'></i> Fix Issue #74
							</li>
							<li className='text-sm font-light'>
								<i className='fad fa-check-double mr-2'></i> Publish version
								1.0.6
							</li>
						</ul>
					</div>
					{/* <!-- end info --> */}
				</div>
			</div>
			{/* <!-- end update section --> */}

			{/* <!-- carts --> */}
			<div className='flex flex-col'>
				{/* <!-- alert --> */}
				<div className='border rounded py-4 px-6 text-sm alert-dark mb-6 bg-gray-700 border-gray-900 text-white'>
					Hi! Wait A Minute . . . . . . Follow Me On Twitter
					<a
						className='font-extrabold text-base transition ease-in-out duration-300 ml-2 hover:opacity-75 text-gray-500'
						target='_blank'
						href='#'>
						@moesaid
					</a>
				</div>
				{/* <!-- end alert --> */}

				{/* <!-- charts --> */}
				<div className='grid grid-cols-2 gap-6 h-full'>
					<div className='rounded bg-white border border-gray-300'>
						<div className='py-3 px-4 flex flex-row justify-between'>
							<h1 className='h6'>
								<span className='uppercase'>9423k</span><p>page view</p>
							</h1>

							<div className='bg-teal-200 text-teal-700 border-teal-300 border w-10 h-10 rounded-full flex justify-center items-center'>
								<AiOutlineEyeInvisible />
							</div>
						</div>
						<div className='analytics_1'></div>
					</div>

					<div className='rounded bg-white border border-gray-300'>
						<div className='py-3 px-4 flex flex-row justify-between'>
							<h1 className='h6'>
								<span className="uppercase">23k</span><p>Unique Users</p>
							</h1>

							<div className='bg-indigo-200 text-indigo-700 border-indigo-300 border w-10 h-10 rounded-full flex justify-center items-center'>
								<FaUsersCog />
							</div>
						</div>
						<div className='analytics_1'></div>
					</div>
				</div>
				{/* <!-- charts    --> */}
			</div>
			{/* <!-- end charts --> */}
		</div>
	);
};

export default Analytics;
