import React from 'react';
import { getUserAsync } from '../../Apis/Users/RUser';
import Table from '../../Components/Table';
import { userCtx } from '../../Store/user.context';
import TableUser from './Components/TableUser';

const UserManager = () => {


	return (
		<div className='mt-5'>
			<TableUser/>
		</div>
	);
};

export default UserManager;
