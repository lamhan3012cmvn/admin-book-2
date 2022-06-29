import moment from 'moment';
import React from 'react';
import { AiFillCiCircle, AiOutlinePlus } from 'react-icons/ai';
import { FaEye, FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import { FiChrome } from 'react-icons/fi';
import {
	delateCategory,
	delateSubCategory,
	updateSubCategory
} from '../../../../Apis';
import ActionTable from '../../../../Components/ActionTable';
import ActionWrapper from '../../../../Components/ActionWrapper';
import Modal from '../../../../Components/Modal';
import { notify } from '../../../../helper/notify';
import { CategoryModel } from '../../../../Models/caterogy.model';
import { SubCategoryModel } from '../../../../Models/subCaterogy.model';
import { categoryCtx } from '../../../../Store/category.context';
import CreateCategory from '../CreateCategogy';
import CreateCategorySub from '../CreateCategogySub';
import UpdateCategory from '../UpdateCategogy';
import UpdateCategorySub from '../UpdateCategogySub';
import './style.css';
interface TableProps {
	data: Array<CategoryModel>;
}

interface TableViewProps {
	handleShowCreateCategory: () => void;
	handleShowCreateCategorySub: () => void;
	handleShowUpdateCategorySub: () => void;
	handleShowUpdateCategory: () => void;
}

const TableView = ({
	handleShowCreateCategory,
	handleShowCreateCategorySub,
	handleShowUpdateCategorySub,
	handleShowUpdateCategory
}: TableViewProps) => {
	const [cCategory, cActions] = categoryCtx();
	const handleDeleteCategory = async (id: number) => {
		const result = await delateCategory({ id });
		if (result.success) {
			cActions.getCategorySuccess(result.data);
			notify("Xóa danh mục con thành công");
		} else {
			notify("Xoá danh mục con thất bại");
		}
	};
	const handleDeleteCategorySub = async (id: number) => {
		const result = await delateSubCategory({ id });
		if (result.success) {
			cActions.getCategorySuccess(result.data);
			notify("Xóa danh mục thành công");
		} else {
			notify("Xoá danh mục thất bại");
		}
	};

	const handleOpenUpdateCategorySub = (payload: SubCategoryModel) => {
		cActions.setCurrentSubCategory(payload);
		handleShowUpdateCategorySub();
	};

	const handleOpenUpdateCategory = (payload: CategoryModel) => {
		cActions.setCurrentCategory(payload);
		handleShowUpdateCategory();
	};

	const keys = 7;
	return (
		<div>
			<div className='rounded bg-white border border-gray-300'>
				<div className='border-b p-6'>
					<span>Danh Sách Danh Mục</span>
				</div>
				<div className='flex items-center justify-end'>
					<div className='inline-flex'>
						<div
							onClick={handleShowCreateCategory}
							className='border-2 flex items-center px-4 py-2 rounded-md gap-x-5 border-green-400 cursor-pointer my-2 mr-8'>
							<AiOutlinePlus className='text-green-400'></AiOutlinePlus>
							<span className='text-black'>Tạo danh mục</span>
						</div>
						<div
							onClick={handleShowCreateCategorySub}
							className='border-2 flex items-center px-4 py-2 rounded-md gap-x-5 border-green-400 cursor-pointer my-2 mr-8'>
							<AiOutlinePlus className='text-green-400'></AiOutlinePlus>
							<span className='text-black'>Tạo danh mục con</span>
						</div>
					</div>
				</div>
				<table className='table-auto border w-full text-left'>
					<thead>
						<tr className='text-black text-center'>
							<th className='px-4 py-2 border-r'>Danh mục 🇺🇸</th>
							<th className='px-4 py-2 border-r'>Danh mục 🇻🇳</th>
							<th className='px-4 py-2 border-r'>Đường dẫn 🇺🇸</th>
							<th className='px-4 py-2 border-r'>Đường dẫn 🇻🇳</th>
							<th className='px-4 py-2 border-r'>Trạng thái</th>
							<th className='px-4 py-2 border-r'>Cập nhật</th>
							<th className='px-4 py-2 border-r w-[180px]' key={'action'}>
								{'Chức năng'}
							</th>
						</tr>
					</thead>
					<tbody className='text-gray-600'>
						{cCategory.categories.map((e, i) => {
							return (
								<React.Fragment key={i}>
									<tr>
										<td className='border border-l-0 px-4 py-2 text-black'>
											{' '}
											{e.nameEn}
										</td>
										<td className='border border-l-0 px-4 py-2 text-black'>
											{' '}
											{e.nameVn}
										</td>
										<td className='border border-l-0 px-4 py-2 text-black'>
											{' '}
											/{e.slugEn}
										</td>
										<td className='border border-l-0 px-4 py-2 text-black'>
											{' '}
											/{e.slugVn}
										</td>
										<td className='border border-l-0 px-4 py-2 text-center text-black'>
											<span
												className={` px-3 py-2 text-white rounded-md select-none ${e.status === 1 ? 'bg-green-400' : 'bg-red-400'
													}`}>
												{e.status ? 'Đang hoạt động' : 'Không hoạt động'}
											</span>
										</td>
										<td className='border border-l-0 px-4 py-2 text-black'>
											{' '}
											{moment(e.updatedAt).fromNow()}
										</td>
										<td className='border border-l-0 border-r-0 px-4 py-2'>
											<ActionWrapper>
												<label htmlFor={`child${i}`}>
													<ActionTable onClick={() => { }}>
														<FaEye />
													</ActionTable>
												</label>
												<ActionTable
													onClick={() => {
														handleOpenUpdateCategory(e);
													}}>
													<FaPencilAlt />
												</ActionTable>
												<ActionTable onClick={() => handleDeleteCategory(e.id)}>
													<FaTrashAlt />
												</ActionTable>
											</ActionWrapper>
										</td>
									</tr>
									{e.subCategory.length > 0 && (
										<tr>
											<td colSpan={keys}>
												<div className='overflow-hidden'>
													<input
														type='checkbox'
														name='openTable'
														id={`child${i}`}
														hidden
													/>
													<div className='rounded bg-white py-4 px-3 tableChild'>
														<table className='table-auto w-full text-left border-2  rounded-md border-green-400'>
															<thead>
																<tr className='text-black text-center select-none'>
																	<th className='px-4 py-2 border-r'>
																		Danh mục con 🇺🇸
																	</th>
																	<th className='px-4 py-2 border-r'>
																		Danh mục con 🇻🇳
																	</th>
																	<th className='px-4 py-2 border-r'>
																		Đường dẫn 🇺🇸
																	</th>
																	<th className='px-4 py-2 border-r'>
																		Đường dẫn 🇻🇳
																	</th>
																	<th className='px-4 py-2 border-r'>
																		Trạng thái
																	</th>
																	<th className='px-4 py-2 border-r'>
																		Cập nhật
																	</th>
																	<th className='px-4 py-2  w-[180px]'>
																		Chức năng
																	</th>
																</tr>
															</thead>
															<tbody className='text-black'>
																{e.subCategory.map((dataSub, iz) => {
																	return (
																		<tr key={iz}>
																			<td className='border border-l-0 px-4 py-2 text-black'>
																				{' '}
																				{dataSub.nameEn}
																			</td>
																			<td className='border border-l-0 px-4 py-2 text-black'>
																				{' '}
																				{dataSub.nameVn}
																			</td>
																			<td className='border border-l-0 px-4 py-2 text-black'>
																				{' '}
																				/{dataSub.slugEn}
																			</td>
																			<td className='border border-l-0 px-4 py-2 text-black'>
																				{' '}
																				/{dataSub.slugVn}
																			</td>
																			<td className='border border-l-0 px-4 py-2 text-center text-black'>
																				<span
																					className={` px-3 py-2 text-white rounded-md select-none ${dataSub.status === 1
																						? 'bg-green-400'
																						: 'bg-red-400'
																						}`}>
																					{dataSub.status
																						? 'Đang hoạt động'
																						: 'Không hoạt động'}
																				</span>
																			</td>
																			<td className='border border-l-0 px-4 py-2 text-black'>
																				{' '}
																				{moment(dataSub.updatedAt).fromNow()}
																			</td>
																			<td className='border border-l-0 border-r-0 border-green-400 px-4 py-2'>
																				<ActionWrapper>
																					<ActionTable
																						onClick={() => {
																							handleOpenUpdateCategorySub(
																								dataSub
																							);
																						}}>
																						<FaPencilAlt />
																					</ActionTable>
																					<ActionTable
																						onClick={() => {
																							handleDeleteCategorySub(
																								dataSub.id
																							);
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
													</div>
												</div>
											</td>
										</tr>
									)}
								</React.Fragment>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
};
const TableCategory = ({ data }: TableProps) => {
	const [showCreateCategory, setShowCreateCategory] = React.useState(false);
	const [showCreateCategorySub, setShowCreateCategorySub] =
		React.useState(false);
	const [showUpdateCategorySub, setShowUpdateCategorySub] =
		React.useState(false);
	const [showUpdateCategory, setShowUpdateCategory] = React.useState(false);

	const handleShowCreateCategory = () => {
		setShowCreateCategory(true);
	};

	const handleShowCreateCategorySub = () => {
		setShowCreateCategorySub(true);
	};

	const handleShowUpdateCategorySub = () => {
		setShowUpdateCategorySub(true);
	};

	const handleShowUpdateCategory = () => {
		setShowUpdateCategory(true);
	};

	return (
		<div>
			{showCreateCategory && (
				<Modal showed={showCreateCategory} setShowed={setShowCreateCategory}>
					<CreateCategory hiddenCreate={() => setShowCreateCategory(false)} />
				</Modal>
			)}

			{showCreateCategorySub && (
				<Modal
					showed={showCreateCategorySub}
					setShowed={setShowCreateCategorySub}>
					<CreateCategorySub
						hiddenCreate={() => setShowCreateCategorySub(false)}
					/>
				</Modal>
			)}

			{showUpdateCategorySub && (
				<Modal
					showed={showUpdateCategorySub}
					setShowed={setShowUpdateCategorySub}>
					<UpdateCategorySub
						hiddenCreate={() => setShowUpdateCategorySub(false)}
					/>
				</Modal>
			)}
			{showUpdateCategory && (
				<Modal showed={showUpdateCategory} setShowed={setShowUpdateCategory}>
					<UpdateCategory hiddenCreate={() => setShowUpdateCategory(false)} />
				</Modal>
			)}

			<TableView
				handleShowCreateCategory={handleShowCreateCategory}
				handleShowCreateCategorySub={handleShowCreateCategorySub}
				handleShowUpdateCategorySub={handleShowUpdateCategorySub}
				handleShowUpdateCategory={handleShowUpdateCategory}
			/>
		</div>
	);
};

export default TableCategory;
