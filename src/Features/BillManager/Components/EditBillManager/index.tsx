import React, { FormEvent } from 'react';
import { UpdateBillManagerAsync } from '../../../../Apis/BillManager/UBillManager';
import axiosClient from '../../../../Apis/clientAxios';
import { listStatusOrder } from '../../../../Common';
import SelectBox from '../../../../Components/SelectBox';
import { notify } from '../../../../helper/notify';
import { billManagerCtx } from '../../../../Store/billManager.context';

interface Props {
	handleHideModal: () => void;
}

const EditBillManager = (props: Props) => {
	const { handleHideModal } = props;
	const [billManagerState, billManagerActions] = billManagerCtx();

	const handleSaveBillManager = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// const reuslt = await UpdateBillManagerAsync({
		// 	id: billManagerState.billManager?.id,
		// 	status: status.id,
		// 	pageNo: 0
		// });
		// if (reuslt.success) {
		// 	billManagerActions.setBillManager(
		// 		reuslt.data.datas,
		// 		reuslt.data.totalItem
		// 	);
		// 	handleHideModal();
		// 	notify('Cập nhật hóa đơn thành công');
		// } else {
		// 	handleHideModal();
		// 	notify('Cập nhật hóa đơn thất bại');
		// }
		let rs = undefined
		const bill: any = billManagerState.billManager;
		if (bill.shipping) {
			rs = await axiosClient.put('/order/delivered/' + bill.id)
		} else if (bill.cancelled) {
			rs = await axiosClient.put('/order/status/' + bill.id)
		}
		else {
			rs = await axiosClient.put('/order/shipping/' + bill.id)
		}
		if (rs) {
			notify('Cập nhật hóa đơn thành công');
			window.location.reload();
		}
		else {
			notify('Cập nhật hóa đơn thất bại');
		}
	};


	const [status, setStatus] = React.useState<{ id: number; value: string }>(
		listStatusOrder[billManagerState.billManager?.status || 0]
	);
	const handleChangeStatus = (data: { id: number; value: string }) => {
		setStatus(data);
	};

	React.useEffect(() => {
		const status = {
			delivered: "Đã giao hàng",
			pending: "Chưa giao hàng",
			cancelled: "Đã hủy",
			shipping: "Đang giao hàng",
			awaitForConfirm: "Chờ xác nhận",
		}

		const getStatus = (obj: any) => {
			if (obj.delivered) return listStatusOrder[2];
			if (obj.pending) return listStatusOrder[2];
			if (obj.cancelled) return listStatusOrder[3];
			if (obj.shipping) return listStatusOrder[1];
			return listStatusOrder[0];
		}
		setStatus(getStatus(billManagerState?.billManager));
	}, [billManagerState.billManager]);

	return (
		<div className='py-6 px-4 max-w-[600px] w-full relative  '>
			<div className='w-full bg-white rounded shadow-2xl p-8 m-4 productForm-wrapper z-10'>
				<div className='py-6 px-4'>
					<h1 className='block w-full text-center text-gray-800 text-2xl font-bold mb-6'>
						Cập nhật trạng thái đơn
					</h1>
					<form onSubmit={e => handleSaveBillManager(e)}>
						{/* <div className="flex flex-col mb-4">
              <label className="mb-2 font-bold text-lg text-gray-900" htmlFor="price_ship">Gia</label>
              <input className="border py-2 px-3 text-grey-800" type="text" name="price_ship" id="price_ship" defaultValue={priceShipState.priceShipDetail?.priceShip} />
            </div> */}
						<div className='flex flex-col mb-4'>
							<label
								className='mb-2 font-bold text-lg text-gray-900'
								htmlFor='Select'>
								Trạng thái
							</label>
							<SelectBox
								state={status?.value || ""}
								handleChoose={handleChangeStatus}
								idCheckBox='status'
								list={listStatusOrder}
							/>
						</div>
						<div className='flex justify-center items-center'>
							<button className='border border-[#38b2ac] bg-[#38b2ac] text-white rounded-sm font-bold py-2 px-6 ml-2 flex items-center'>
								Lưu
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default EditBillManager;
