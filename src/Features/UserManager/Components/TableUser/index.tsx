import moment from 'moment';
import React from 'react';
import { getUserAsync } from '../../../../Apis/Users/RUser';
import { listStatus } from '../../../../Common';
import { userCtx } from '../../../../Store/user.context';

const TableUser = () => {
	const [userState, userAction] = userCtx();

	const [currentPage, setCurrentPage] = React.useState(1);
	const getUserApi = async (page: number) => {
		const result = await getUserAsync({ pageNo: page });
		if (result.success === true) {
			userAction.setUser(result.data.datas, result.data.totalItem);
		} else {
			userAction.setUser([], 0);
			console.log(result.data);
		}
	};

	React.useEffect(() => {
		getUserApi(currentPage - 1);
	}, [currentPage]);

	return (
		<div>
			<div className='rounded bg-white border border-gray-300'>
				<div className='border-b p-6'>Danh Sách Tài Khoản</div>

				<table className='table-auto w-full text-left'>
					<thead>
						<tr>
							<th className='px-4 py-2 border-r text-center'>Email</th>
							<th className='px-4 py-2 border-r w-[200px] text-center'>
								Tên tài khoản
							</th>
							<th className='px-4 py-2 border-r w-[500px] text-center'>
								Địa chỉ
							</th>
							<th className='px-4 py-2 border-r text-center'>Số điện thoại</th>
							<th className='px-4 py-2 border-r text-center w-[200px]'>
								Trạng thái
							</th>
							<th className='px-4 py-2 border-r text-center'>
								Lần truy cập gần nhất
							</th>
							{/* <th className="px-4 py-2 border-r text-center" key={"action"}>{"Actions"}</th> */}
						</tr>
					</thead>
					<tbody className='text-gray-600'>
						{userState.users.map((e, i) => {
							return (
								<tr key={i}>
									<td className='border border-l-0 px-4 py-2 text-left text-black'>
										{e.email}
									</td>
									<td className='border border-l-0 px-4 py-2 text-left text-black'>
										{e.name}
									</td>
									<td className='border border-l-0 px-4 py-2 text-left text-black'>
										{e.address}
									</td>
									<td className='border border-l-0 px-4 py-2 text-center text-black'>
										{e.phone}
									</td>
									<td className='border border-l-0 px-4 py-2 text-center text-black'>
										<span
											className={` px-3 py-2 text-white rounded-md ${
												e.status === 1 ? 'bg-green-400' : 'bg-red-400'
											}`}>
											{listStatus[e.status].value}
										</span>
									</td>
									<td className='border border-l-0 px-4 py-2 text-left text-black'>
										{moment(e.lastAccess).fromNow()}
									</td>
									{/* <td className="border border-l-0 border-r-0 px-4 py-2 text-center"><AiFillCiCircle /></td> */}
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default TableUser;
