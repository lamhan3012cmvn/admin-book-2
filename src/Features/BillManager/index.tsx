import React from 'react';
import { getBillManagerAsync } from '../../Apis/BillManager/RBillManager';
import { EmailRequestShipAsync } from '../../Apis/Emails/REmail';
import Modal from '../../Components/Modal';
import Table from '../../Components/Table';
import { billManagerCtx } from '../../Store/billManager.context';
import BillDetail from './Components/BillDetail';
import EditBillManager from './Components/EditBillManager';
import TableBillManager from './Components/TableBillManger';
import TableEmailRequest from './Components/TableBillManger';

interface Props {}

const BillManager = (props: Props) => {
	const [showDetail, setShowDetail] = React.useState(false);
	const [showEdit, setShowEdit] = React.useState(false);
	return (
		<div className='mt-5'>
			{showDetail && (
				<Modal showed={showDetail} setShowed={setShowDetail}>
					<BillDetail />
				</Modal>
			)}
			{showEdit && (
				<Modal showed={showEdit} setShowed={setShowEdit}>
					<EditBillManager handleHideModal={() => setShowEdit(false)} />
				</Modal>
			)}

			<TableBillManager
				handleShowDetail={() => setShowDetail(true)}
				handleShowEdit={() => setShowEdit(true)}
			/>
		</div>
	);
};

export default BillManager;
