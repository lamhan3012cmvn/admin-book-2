import React from 'react';

const StartNumber = () => {
	return (
		<div className='grid grid-cols-5 gap-6 xl:grid-cols-2'>
			{/* <!-- card --> */}
			<div className='card mt-6'>
				<div className='card-body flex items-center'>
					<div className='px-3 py-2 rounded bg-indigo-600 text-white mr-3'>
						<i className='fad fa-wallet'></i>
					</div>

					<div className='flex flex-col'>
						<h1 className='font-semibold'>
							<span className='num-2'></span> Sales
						</h1>
						<p className='text-xs'>
							<span className='num-2'></span> payments
						</p>
					</div>
				</div>
			</div>
			{/* <!-- end card --> */}

			{/* <!-- card --> */}
			<div className='card mt-6'>
				<div className='card-body flex items-center'>
					<div className='px-3 py-2 rounded bg-green-600 text-white mr-3'>
						<i className='fad fa-shopping-cart'></i>
					</div>

					<div className='flex flex-col'>
						<h1 className='font-semibold'>
							<span className='num-2'></span> Orders
						</h1>
						<p className='text-xs'>
							<span className='num-2'></span> items
						</p>
					</div>
				</div>
			</div>
			{/* <!-- end card --> */}

			{/* <!-- card --> */}
			<div className='card mt-6 xl:mt-1'>
				<div className='card-body flex items-center'>
					<div className='px-3 py-2 rounded bg-yellow-600 text-white mr-3'>
						<i className='fad fa-blog'></i>
					</div>

					<div className='flex flex-col'>
						<h1 className='font-semibold'>
							<span className='num-2'></span> posts
						</h1>
						<p className='text-xs'>
							<span className='num-2'></span> active
						</p>
					</div>
				</div>
			</div>
			{/* <!-- end card --> */}

			{/* <!-- card --> */}
			<div className='card mt-6 xl:mt-1'>
				<div className='card-body flex items-center'>
					<div className='px-3 py-2 rounded bg-red-600 text-white mr-3'>
						<i className='fad fa-comments'></i>
					</div>

					<div className='flex flex-col'>
						<h1 className='font-semibold'>
							<span className='num-2'></span> comments
						</h1>
						<p className='text-xs'>
							<span className='num-2'></span> approved
						</p>
					</div>
				</div>
			</div>
			{/* <!-- end card --> */}

			{/* <!-- card --> */}
			<div className='card mt-6 xl:mt-1 xl:col-span-2'>
				<div className='card-body flex items-center'>
					<div className='px-3 py-2 rounded bg-pink-600 text-white mr-3'>
						<i className='fad fa-user'></i>
					</div>

					<div className='flex flex-col'>
						<h1 className='font-semibold'>
							<span className='num-2'></span> memebrs
						</h1>
						<p className='text-xs'>
							<span className='num-2'></span> online
						</p>
					</div>
				</div>
			</div>
			{/* <!-- end card --> */}
		</div>
	);
};

export default StartNumber;
