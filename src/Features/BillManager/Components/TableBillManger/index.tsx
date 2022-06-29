import React from 'react';
import { FaEye, FaPencilAlt } from 'react-icons/fa';
import { formatMoney, listStatus, listStatusOrder } from '../../../../Common';
import ActionTable from '../../../../Components/ActionTable';
import ActionWrapper from '../../../../Components/ActionWrapper';
import { BillManagerModel } from '../../../../Models/billManager.model';
import { billManagerCtx } from '../../../../Store/billManager.context';
import Pagination from 'react-js-pagination';
import { getBillManagerAsync } from '../../../../Apis/BillManager/RBillManager';
import moment from 'moment';

const TableBillManager = ({
	handleShowDetail,
	handleShowEdit
}: {
	handleShowDetail: () => void;
	handleShowEdit: () => void;
}) => {
	const [billState, billActions] = billManagerCtx();
	const [lang, setLang] = React.useState(0);

	const getBillManagerApi = async (page: number, lang: number) => {
		const result = await getBillManagerAsync(page, lang);
		if (result.success) {
			billActions.setBillManager(result.data.datas, result.data.totalItem);
		} else {
			billActions.setBillManager([], 0);
		}
	};

	React.useEffect(() => {
		getBillManagerApi(billState.pageNo - 1, lang);
	}, [billState.pageNo, lang]);

	const showBillDetail = (data: BillManagerModel) => {
		handleShowDetail();
		billActions.setBillManagerDetail(data);
	};

	const showEditBill = (data: BillManagerModel) => {
		billActions.setBillManagerDetail(data);
		handleShowEdit();
	};
	const handleChangeLang = currentLang => {
		if (currentLang !== lang) {
			setLang(currentLang);
			billActions.setPageNo(1)
		}
	};
	return (
		<div>
			<div className='rounded bg-white border border-gray-300'>
				<div className='border-b p-6'>
					<p className='flex gap-[10px]'>
						<span
							className={`cursor-pointer ${lang===0?'text-green-500':'text-gray-500'}`}
							onClick={() => handleChangeLang(0)}>
							VI
						</span>
						<span
							className={`cursor-pointer ${lang===1?'text-green-500':'text-gray-500'}`}
							onClick={() => handleChangeLang(1)}>
							EN
						</span>
					</p>
				</div>

				<table className='table-auto w-full text-left'>
					<thead>
						<tr>
							<th className='px-4 py-2 border-r text-center'>Khách hàng</th>
							<th className='px-4 py-2 border-r text-center'>Địa chỉ</th>
							<th className='px-4 py-2 border-r text-center'>Số điện thoại</th>
							<th className='px-4 py-2 border-r text-center'>Tổng đơn</th>
							<th className='px-4 py-2 border-r text-center'>Ngày tạo đơn</th>
							<th className='px-4 py-2 border-r text-center'>Trạng thái</th>
							<th className='px-4 py-2 border-r text-center'>
								Ghi chú (nếu có)
							</th>
							<th className='px-4 py-2 border-r text-center' key={'action'}>
								{'Chức năng'}
							</th>
						</tr>
					</thead>
					<tbody className='text-gray-600'>
						{billState.bills.map((item, i) => {
							return (
								<tr key={i}>
									<td className='border border-l-0 px-4 py-2 text-left text-black'>
										{item.name}
									</td>
									<td className='border border-l-0 px-4 py-2 text-left text-black'>
										{item.address}
									</td>
									<td className='border border-l-0 px-4 py-2 text-center text-black'>
										{item.phone}
									</td>
									<td className='border border-l-0 px-4 py-2 text-center text-black'>
										{formatMoney(item.totalPrice)}
									</td>
									<td className='border border-l-0 px-4 py-2 text-center text-black'>
										{moment(item.createdAt).format(" DD:mm DD/MM/YYYY")}
									</td>
									<td className='border border-l-0 px-4 py-2 text-center text-black'>
										<span
											className={` px-3 py-2 text-black rounded-md select-none ${
												item.status === 0
													? 'bg-blue-300'
													: item.status === 1
													? 'bg-yellow-200'
													: item.status === 2
													? 'bg-green-300'
													: 'bg-red-300'
											}`}>
											{listStatusOrder[item.status].value}
										</span>
									</td>
									<td className='border border-l-0 px-4 py-2 text-center text-black'>
										{item.note}
									</td>
									<td className='border border-l-0 border-r-0 px-4 py-2 text-center'>
										<ActionWrapper>
											<ActionTable
												onClick={() => {
													showBillDetail(item);
												}}>
												<FaEye />
											</ActionTable>
											<ActionTable
												onClick={() => {
													showEditBill(item);
												}}>
												<FaPencilAlt />
											</ActionTable>
										</ActionWrapper>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
				<div className='h-[60px] flex justify-center items-center'>
					<Pagination
						activePage={billState.pageNo}
						itemsCountPerPage={15}
						totalItemsCount={billState.totalPage}
						pageRangeDisplayed={5}
						onChange={page => billActions.setPageNo(page)}
					/>
				</div>
			</div>
		</div>
	);
};

export default TableBillManager;
