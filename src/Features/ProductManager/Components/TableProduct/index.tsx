import moment from 'moment';
import React, { useState } from 'react';
import { FaEye, FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import ActionTable from '../../../../Components/ActionTable';
import ActionWrapper from '../../../../Components/ActionWrapper';
import Button from '../../../../Components/Button';
import Modal from '../../../../Components/Modal';
import {
	ProductDetailModel,
	ProductModel,
	ProductTextModel
} from '../../../../Models/product.model';
import { productCtx } from '../../Contexts/product.context';
import CreateProduct from '../CreateProduct';
import EditProduct from '../EditProduct';
import ProductDetail from '../ProductDetail';
import ProductForm from '../ProductForm';
import Pagination from 'react-js-pagination';
import { findAllProduct } from '../../../../Apis';
import useDebounce from '../../../../hooks/useDebounce';
import axiosClient from '../../../../Apis/clientAxios';

interface Props { }

interface IViewTableProduct {
	handleShowDetail: (
		product: ProductModel,
		productDetail: ProductTextModel
	) => void;
	handleShowForm: (
		product: ProductModel,
		productDetail: ProductTextModel
	) => void;
	handleShowCreateProduct: () => void;
	handleShowEdit: () => void;
}

const ViewTableProduct = ({
	handleShowDetail,
	handleShowForm,
	handleShowCreateProduct,
	handleShowEdit
}: IViewTableProduct) => {
	const [pState, pActions] = productCtx();
	const keysLength = 5 + 1;
	const [str, setStr] = useState('');

	const getProductAsync = async (currenPage: number, str: string) => {
		const result: any = await findAllProduct({
			pageNo: currenPage - 1,
			search: str
		});
		console.log("result", result)
		if (result?.length > 0)
			pActions.getProductSuccess(result, result.length);
		else pActions.getProductError();
	};

	React.useEffect(() => {
		getProductAsync(pState.pageNo, str);
	}, [pState.pageNo, str]);

	const handleUpdateIdProduct = (data:any) => {
		pActions.setProductDetail(data);
		// handleShowEdit();
		handleShowCreateProduct();
	};

	const handlePageChange = (pageNumber: number) => {
		pActions.setPageNo(pageNumber);
	};


	const handleDeleteProduct = async (id: string) => {
		const product = await axiosClient.delete(`book/${id}`)
		console.log(product)
	}

	return (
		<div className='rounded bg-white border border-gray-300'>
			<div className='flex items-center justify-between px-5'>
				<div className='p-6'>Danh S??ch S???n Ph???m</div>
				<div>
					{/* <label className='mr-[10px]' htmlFor=''>
						Ti??m ki???m theo t??n ti???ng Vi???t:
					</label>
					<input
						className='border py-2 px-3 text-grey-800  mr-20 w-[300px]'
						type='text'
						name='search'
						placeholder='T??m ki???m'
						onChange={useDebounce(e => {
							setStr(e.target.value);
							pActions.setPageNo(1);
						}, 500)}
					/> */}
					<Button onClick={handleShowCreateProduct}>T???o s???n ph???m</Button>
				</div>
			</div>
			<table className='table-auto w-full text-left'>
				<thead>
					<tr className='border-t'>
						<th className='px-4 py-2 border-r text-center'>M?? SP</th>
						<th className='px-4 py-2 border-r text-center'>???nh</th>
						<th className='px-4 py-2 border-r text-center'>T??n s???n ph???m</th>
						<th className='px-4 py-2 border-r text-center'>Gi?? s???n ph???m</th>
						<th className='px-4 py-2 border-r text-center'>Ng??y t???o</th>
						<th className='px-4 py-2 border-r text-center' key={'action'}>
							{'Ch???c n??ng'}
						</th>
					</tr>
				</thead>
				<tbody className='text-gray-600'>
					{pState.products.map((e, i) => {
						return (
							<React.Fragment key={i}>
								<tr>
									<td className='border border-l-0 px-4 py-2 text-center text-black'>
										{e.id}
									</td>
									<td className='border border-l-0 px-4 py-2 text-center text-black flex justify-center'>
										<div className='w-[100px] h-[100px] rounded-xl'>
											<img
												src={e?.image_URLs?.[0]}
												className='w-full h-full object-cover rounded-xl'
												alt=''
											/>
										</div>
									</td>
									<td className='border border-l-0 px-4 py-2 text-left text-black'>
										{e?.name}
									</td>
									<td className='border border-l-0 px-4 py-2 text-left text-black'>
										{e?.price.price}
									</td>
									<td className='border border-l-0 px-4 py-2 text-center text-black'>
										{moment(e?.createdAt).fromNow()}
									</td>
									<td className='border border-l-0 border-r-0 px-4 py-2 text-center'>
										<ActionWrapper>
											<label htmlFor={`child${i}`}>
												<ActionTable onClick={() => { }}>
													<FaEye />
												</ActionTable>
											</label>
											<ActionTable onClick={() => handleUpdateIdProduct(e)}>
												<FaPencilAlt />
											</ActionTable>
											<ActionTable onClick={() => { handleDeleteProduct(e?.id) }}>
												<FaTrashAlt />
											</ActionTable>
										</ActionWrapper>
									</td>
								</tr>

								{e?.productTexts?.length > 0 && (
									<tr>
										<td colSpan={keysLength}>
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
															<tr className='text-black text-center capitalize'>
																<th className='px-4 py-2 border-r border-green-400'>
																	Ng??n ng???
																</th>
																<th className='px-4 py-2 border-r border-green-400'>
																	T??n
																</th>
																<th className='px-4 py-2 border-r border-green-400'>
																	Gi??
																</th>
																<th className='px-4 py-2 border-r border-green-400 w-[130px]'>
																	T??nh tr???ng
																</th>
																<th className='px-4 py-2 border-r border-green-400'>
																	???????ng d???n
																</th>
																<th className='px-4 py-2 border-r border-green-400 w-[190px]'>
																	Tr???ng th??i
																</th>
																<th className='px-4 py-2 border-r border-green-400'>
																	C???p nh???t
																</th>
																<th className='px-4 py-2  w-[180px]'>
																	Ch???c n??ng
																</th>
															</tr>
														</thead>
														<tbody className='text-black'>
															{e.productTexts.map((data, _) => {
																return (
																	<tr key={_}>
																		<td className='border border-l-0 px-4 py-2 border-green-400'>
																			{data.lang == 1 ? '????????' : '????????'}
																		</td>
																		<td className='border border-l-0 px-4 py-2 border-green-400'>
																			{data.name}
																		</td>
																		<td className='border border-l-0 px-4 py-2 border-green-400'>
																			{data.price}
																		</td>
																		<td className='border border-l-0 px-4 py-2 border-green-400'>
																			<span
																				className={` px-3 py-2 text-white rounded-md select-none ${data.inventory === 1
																						? 'bg-green-400'
																						: 'bg-red-400'
																					}`}>
																				{data.inventory
																					? 'Co??n ha??ng'
																					: 'H????t h??ng'}
																			</span>
																		</td>
																		<td className='border border-l-0 px-4 py-2 border-green-400'>
																			/{data.slug}
																		</td>
																		<td className='border border-l-0 px-4 py-2 border-green-400'>
																			<span
																				className={` px-3 py-2 text-white rounded-md select-none ${data.status === 1
																						? 'bg-green-400'
																						: 'bg-red-400'
																					}`}>
																				{data.status
																					? '??ang ho???t ?????ng'
																					: 'Kh??ng ho???t ?????ng'}
																			</span>
																		</td>
																		<td className='border border-l-0 px-4 py-2 border-green-400'>
																			{moment(data.updatedAt).fromNow()}
																		</td>
																		<td className='border border-l-0 border-r-0 border-green-400 px-4 py-2'>
																			<ActionWrapper>
																				<ActionTable
																					onClick={() =>
																						handleShowDetail(e, data)
																					}>
																					<FaEye />
																				</ActionTable>
																				<ActionTable
																					onClick={() =>
																						handleShowForm(e, data)
																					}>
																					<FaPencilAlt />
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
			{/* <div className='h-[60px] flex justify-center items-center'>
				<Pagination
					activePage={pState.pageNo}
					itemsCountPerPage={15}
					totalItemsCount={pState.totalPage}
					pageRangeDisplayed={5}
					onChange={handlePageChange}
				/>
			</div> */}
		</div>
	);
};

const MemoViewTable = React.memo(ViewTableProduct);

const TableProduct = () => {
	const [_, PActions] = productCtx();

	const [showDetail, setShowDetail] = React.useState(false);
	const [showForm, setShowForm] = React.useState(false);
	const [showCreateProduct, setShowCreateProduct] = React.useState(false);
	const [showEditProduct, setShowEditProduct] = React.useState(false);

	const handleShowDetail = (
		product: ProductModel,
		productDetail: ProductTextModel
	) => {
		setShowDetail(true);
		const obj: ProductDetailModel = {
			...productDetail,
			categoryName:
				productDetail.lang === 1
					? product.category.nameEn
					: product.category.nameVn,
			subCategoryName:
				productDetail.lang === 1
					? product.subCategory.nameEn
					: product.subCategory.nameVn,
			productImages: product.productImages.map(e => e.url)
		};
		PActions.setProductDetail(obj);
	};

	const handleShowForm = (
		product: ProductModel,
		productDetail: ProductTextModel
	) => {
		setShowForm(true);
		const obj: ProductDetailModel = {
			...productDetail,
			categoryName:
				productDetail.lang === 1
					? product.category.nameEn
					: product.category.nameVn,
			subCategoryName:
				productDetail.lang === 1
					? product.subCategory.nameEn
					: product.subCategory.nameVn
		};
		PActions.setProductDetail(obj);
	};

	const handleShowCreateProduct = () => {
		setShowCreateProduct(true);
	};



	return (
		<div>
			{/* {showCreateProduct && (
				<Modal showed={true} setShowed={setShowCreateProduct}>
					<CreateProduct hiddenCreate={() => setShowCreateProduct(false)} />
				</Modal>
			)} */}
			{showDetail && (
				<Modal showed={true} setShowed={setShowDetail}>
					<ProductDetail />
				</Modal>
			)}
			{/* {showCreateProduct && (
				<Modal showed={true} setShowed={setShowCreateProduct}>
					<EditProduct hideForm={() => setShowCreateProduct(false)} />
				</Modal>
			)} */}
			{showCreateProduct ? (
				<ProductForm hideForm={() => setShowCreateProduct(false)} />
			) : (
				<div>
					<MemoViewTable
						handleShowEdit={() => setShowEditProduct(true)}
						handleShowDetail={handleShowDetail}
						handleShowForm={handleShowForm}
						handleShowCreateProduct={handleShowCreateProduct}
					/>
				</div>
			)}
		</div>
	);
};

export default TableProduct;
