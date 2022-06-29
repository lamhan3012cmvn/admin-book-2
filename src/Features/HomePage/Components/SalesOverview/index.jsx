import React from 'react';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import { Bar } from 'react-chartjs-2';

const data = {
	labels: [
		'Red',
		'Blue',
		'Yellow',
		'Green',
		'Purple',
		'Orange',
		'Red',
		'Blue',
		'Yellow',
		'Green',
		'Purple',
		'Orange'
	],
	datasets: [
		{
			label: '# of Votes',
			data: [12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3],
			backgroundColor: [
				'rgba(255, 99, 132, 0.2)',
				'rgba(54, 162, 235, 0.2)',
				'rgba(255, 206, 86, 0.2)',
				'rgba(75, 192, 192, 0.2)',
				'rgba(153, 102, 255, 0.2)',
				'rgba(255, 159, 64, 0.2)',
				'rgba(255, 99, 132, 0.2)',
				'rgba(54, 162, 235, 0.2)',
				'rgba(255, 206, 86, 0.2)',
				'rgba(75, 192, 192, 0.2)',
				'rgba(153, 102, 255, 0.2)',
				'rgba(255, 159, 64, 0.2)'
			],
			borderColor: [
				'rgba(255, 99, 132, 1)',
				'rgba(54, 162, 235, 1)',
				'rgba(255, 206, 86, 1)',
				'rgba(75, 192, 192, 1)',
				'rgba(153, 102, 255, 1)',
				'rgba(255, 159, 64, 1)',
				'rgba(255, 99, 132, 1)',
				'rgba(54, 162, 235, 1)',
				'rgba(255, 206, 86, 1)',
				'rgba(75, 192, 192, 1)',
				'rgba(153, 102, 255, 1)',
				'rgba(255, 159, 64, 1)'
			],
			borderWidth: 1
		}
	]
};

const options = {
	scales: {
		yAxes: [
			{
				gridLines: {
					display: false,
					color: 'rgba(219,219,219,0.3)',
					zeroLineColor: 'rgba(219,219,219,0.3)',
					drawBorder: false, // <---
					lineWidth: 27,
					zeroLineWidth: 1
				},
				ticks: {
					beginAtZero: false,
					display: false
				}
			}
		]
	}
};

const SalesOverview = () => {
	return (
		<div className='card rounded bg-white border border-gray-300 mt-6'>
			{/* <!-- header --> */}
			<div className='card-header border-b p-6 flex flex-row justify-between'>
				<h1 className='h6'>Sales Overview</h1>

				<div className='flex flex-row justify-center items-center'>
					<a href=''>
						<i className='fad fa-chevron-double-down mr-6'></i>
					</a>

					<a href=''>
						<i className='fad fa-ellipsis-v'></i>
					</a>
				</div>
			</div>
			{/* <!-- end header --> */}

			{/* <!-- body --> */}
			<div className='card-body p-6 grid grid-cols-2 gap-6 lg:grid-cols-1'>
				<div className='p-8'>
					<h1 className='h2'>5,337</h1>
					<p className='text-black font-medium'>Sales this month</p>

					<div className='mt-20 mb-2 flex items-center'>
						<div className='py-1 px-3 rounded bg-green-200 text-green-900 mr-3'>
							<FaCaretDown />
						</div>
						<p className='text-black'>
							<span className='num-2 text-green-400'></span>
							<span className='text-green-400'>% more sales</span> in comparison to
							last month.
						</p>
					</div>

					<div className='flex items-center'>
						<div className='py-1 px-3 rounded bg-red-200 text-red-900 mr-3'>
							<FaCaretUp />
						</div>
						<p className='text-black'>
							<span className='num-2 text-red-400'></span>
							<span className='text-red-400'>% revenue per sale</span> in comparison
							to last month.
						</p>
					</div>

					<a
						href='#'
						className='text-center capitalize bg-[#4FD1C5] block py-2 px-5 rounded text-white transition-all ease-in-out duration-300 shadow-md mt-6 hover:shadow-lg'>
						view details
					</a>
				</div>

				<div className=''>
					<div id='sealsOverview'>
						<Bar data={data} options={options} />
					</div>
				</div>
			</div>
			{/* <!-- end body --> */}
		</div>
	);
};

export default SalesOverview;
