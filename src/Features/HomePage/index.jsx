import React from 'react';
import SideBar from '../../Components/SideBar';
import Table from '../../Components/Table_2';
import StartNumber from './Components/ StartNumbers';
import Analytics from './Components/Analytics';
import GeneralReport from './Components/GeneralReport';
import SalesOverview from './Components/SalesOverview';

const HomePage = () => {
	return (
		<div className='h-screen flex flex-row flex-wrap'>
			{/* @include('./base/sidebar.html') */}
			<SideBar />
			<div className='bg-gray-100 flex-1 p-6 md:mt-16'>
				<GeneralReport />
				<Analytics />
				<SalesOverview />
				<Table depth={1} />
			</div>
		</div>
	);
};

export default HomePage;
