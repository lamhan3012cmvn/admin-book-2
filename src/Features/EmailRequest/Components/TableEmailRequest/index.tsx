import React from 'react';
import { AiFillCiCircle } from 'react-icons/ai';
import moment from 'moment';
import { emailRequestCtx } from '../../../../Store/emailRequest.context';
import { UpdateEmailAsync } from '../../../../Apis/Emails/UEmail';
import ActionWrapper from '../../../../Components/ActionWrapper';
import ActionTable from '../../../../Components/ActionTable';
import { FaCheckCircle, FaEdit } from 'react-icons/fa';
import { EmailRequestShipAsync } from '../../../../Apis/Emails/REmail';
import Pagination from 'react-js-pagination';
import { notify } from '../../../../helper/notify';

interface TableEmailRequestProps {
	data: Array<{
		id: number;
		name: string;
		createdAt: string;
		updatedAt: string;
		status: number;
	}>;
}

const TableEmailRequest = () => {
	const [stateEmailRequest, actionsEmailRequest] = emailRequestCtx();
	const [currentPage, setCurrentPage] = React.useState(1);

	const getEmailRequestApi = async (page: number) => {
		const result = await EmailRequestShipAsync(page);
		if (result.success) {
			actionsEmailRequest.setEmails(result.data.datas, result.data.totalItem);
		}
	};

	React.useEffect(() => {
		getEmailRequestApi(currentPage - 1);
	}, [currentPage]);

	const handleUpdateEmailRequest = async (id: number, status: number = 1) => {
		const result = await UpdateEmailAsync({
			id,
			status,
			pageNo: currentPage - 1
		});
		if (result.success) {
			actionsEmailRequest.setEmails(result.data.datas, result.data.totalItem);
			notify("Đã phản hồi email")
		}else {
			notify("Trạng thái chưa được thay đổi")
		}
	};

	return (
		<div>
			<div className='rounded bg-white border border-gray-300'>
				<div className='border-b p-6'>Danh Sách Email Đăng Ký</div>

				<table className='table-auto w-full text-left'>
					<thead>
						<tr>
							<th className='px-4 py-2 border-r text-center'>Email</th>
							<th className='px-4 py-2 border-r text-center'>Thời gian tạo</th>
							<th className='px-4 py-2 border-r text-center'>Phản hồi</th>
							<th className='px-4 py-2 border-r text-center' key={'action'}>
								{'Đã phản hồi'}
							</th>
						</tr>
					</thead>
					<tbody className='text-gray-600'>
						{stateEmailRequest.emails.map((e, i) => {
							return (
								<tr key={i}>
									<td className='border border-l-0 px-4 py-2 text-left text-black'>
										{e.name}
									</td>
									<td className='border border-l-0 px-4 py-2 text-center text-black'>
										{moment(e.createdAt).fromNow()}
									</td>
									<td className='border border-l-0 px-4 py-2 text-center text-black'>
										<span
											className={` px-3 py-2 text-white rounded-md select-none ${
												e.status === 1 ? 'bg-green-400' : 'bg-red-400'
											}`}>
											{e.status ? 'Đã phản hồi' : 'Chưa phản hồi'}
										</span>
									</td>
									<td className='border border-l-0 border-r-0 px-4 py-2 text-center'>
										<ActionWrapper>
											<ActionTable
												onClick={e.status===1?()=>{}:() => {
													handleUpdateEmailRequest(e.id, 1);
												}}>
												<FaCheckCircle />
											</ActionTable>
										</ActionWrapper>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
				<div className='flex justify-center items-center my-[20px]'>
					<Pagination
						activePage={currentPage}
						itemsCountPerPage={15}
						totalItemsCount={stateEmailRequest.totalPage}
						pageRangeDisplayed={5}
						onChange={page => setCurrentPage(page)}
					/>
				</div>
			</div>
		</div>
	);
};

export default TableEmailRequest;
