import moment from 'moment';
import React from 'react';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import Pagination from 'react-js-pagination';
import { deletePriceShipAsync } from '../../../../Apis/PriceShip/DPriceShip';
import { getPriceShipAsync } from '../../../../Apis/PriceShip/RPriceShip';
import { formatMoney } from '../../../../Common';
import ActionTable from '../../../../Components/ActionTable';
import ActionWrapper from '../../../../Components/ActionWrapper';
import Button from '../../../../Components/Button';
import Modal from '../../../../Components/Modal';
import { notify } from '../../../../helper/notify';
import { priceShipCtx } from '../../../../Store/priceShip.context';
import CreatePriceShip from '../CreatePriceShip';
import EditPriceShip from '../EditPriceShip';

const TablePriceShip = () => {
	const [priceShipState, priceShipActions] = priceShipCtx();

	const getPriceShipApi = async (page: number) => {
		const result = await getPriceShipAsync(page);
		if (result.success) {
			priceShipActions.setPriceShip(result.data.datas, result.data.totalItem);
		} else {
			console.log(result.message);
			priceShipActions.setPriceShip([], 0);
		}
	};
	React.useEffect(() => {
		getPriceShipApi(priceShipState.pageNo - 1);
	}, [priceShipState.pageNo]);
	const handleDeleteShip = async id => {
		const result = await deletePriceShipAsync(id);
		if (result.success) {
			priceShipActions.setPriceShip(result.data.datas, result.data.totalItem);
			notify('Xóa giá ship thành công');
		} else {
			notify('Xóa giá ship thất bại');
		}
	};

	const [showEditPriceShip, setShowEditPriceShip] = React.useState(false);
	const handleShowEditPriceShip = e => {
		priceShipActions.setPriceShipDetail(e);
		setShowEditPriceShip(true);
	};

	const [showCreatePriceShip, setShowCreatePriceShip] = React.useState(false);
	const handleShowCreateShip = () => {
		setShowCreatePriceShip(true);
	};

	return (
		<div>
			<div className='rounded bg-white border border-gray-300'>
				<div className='flex items-center justify-between px-5'>
					<div className='p-6'>Danh Sách Giá Ship</div>
					<div>
						<Button onClick={() => handleShowCreateShip()}>Tạo mới</Button>
					</div>
				</div>
				<table className='table-auto w-full text-left'>
					<thead>
						<tr>
							<th className='px-4 py-2 border-r border-t text-center'>
								Địa chỉ
							</th>
							<th className='px-4 py-2 border-r border-t text-center'>Giá</th>
							<th className='px-4 py-2 border-r border-t text-center'>
								Trạng thái
							</th>
							<th className='px-4 py-2 border-r border-t text-center'>
								Cập nhật
							</th>
							<th
								className='px-4 py-2 border-r border-t text-center'
								key={'action'}>
								{'Chức năng'}
							</th>
						</tr>
					</thead>
					<tbody className='text-gray-600'>
						{priceShipState.priceShip.map((e, i) => {
							return (
								<tr key={i}>
									<td className='border border-l-0 px-4 py-2 text-left text-black'>
										{e.province}
									</td>
									<td className='border border-l-0 px-4 py-2 text-center text-black'>
										{formatMoney(e.priceShip)}
									</td>
									<td className='border border-l-0 px-4 py-2 text-center text-black'>
										<span
											className={` px-3 py-2 text-white rounded-md select-none ${
												e.status === 1 ? 'bg-green-400' : 'bg-red-400'
											}`}>
											{e.status ? 'Đang hoạt động' : 'Không hoạt động'}
										</span>
									</td>
									<td className='border border-l-0 px-4 py-2 text-center text-black'>
										{moment(e.updatedAt).fromNow()}
									</td>
									<td className='border border-l-0 border-r-0 px-4 py-2 text-center w-[150px]'>
										<ActionWrapper>
											<ActionTable
												onClick={() => {
													handleShowEditPriceShip(e);
												}}>
												<FaPencilAlt />
											</ActionTable>
											<ActionTable
												onClick={() => {
													handleDeleteShip(e.id);
												}}>
												<FaTrashAlt />
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
						activePage={priceShipState.pageNo}
						itemsCountPerPage={15}
						totalItemsCount={priceShipState.totalPage}
						pageRangeDisplayed={5}
						onChange={page => priceShipActions.setPageNo(page)}
					/>
				</div>
			</div>

			{showEditPriceShip && (
				<Modal showed={true} setShowed={setShowEditPriceShip}>
					<EditPriceShip handleHideFrom={() => setShowEditPriceShip(false)} />
				</Modal>
			)}
			{showCreatePriceShip && (
				<Modal showed={showCreatePriceShip} setShowed={setShowCreatePriceShip}>
					<CreatePriceShip
						handleHideFrom={() => setShowCreatePriceShip(false)}
					/>
				</Modal>
			)}
		</div>
	);
};

export default TablePriceShip;
