import React from 'react';
import { ProductDetailModel, ProductTextModel } from '../../../../Models/product.model';


const ProductInfo = ({ productDetail }: { productDetail: ProductDetailModel }) => {
	const yellow = '#4FD1C5';
	return (
		<div className=' p-8 '>
			<h3 className='font-light text-3xl sm:text-2xl md:text-3xl text-[#4FD1C5]'>
				{productDetail?.name}
			</h3>
			<ul>
				<li className='my-4'>
					<p>
						<span className={`text-base md:text-xl text-${yellow} font-light`}>
							Mã SP
						</span>
						: <span className={`text-base md:text-xl`}>3730</span>
					</p>
				</li>
				<li className='my-4'>
					<p>
						<span className={`text-base md:text-xl text-${yellow} font-light`}>
							Danh mục
						</span>
						:{' '}
						<span className={`text-base md:text-xl`}>{productDetail?.categoryName} / {productDetail?.subCategoryName}</span>
					</p>
				</li>
				<li className='my-4'>
					<p>
						<span className={`text-base md:text-xl text-${yellow} font-light`}>
							Giá
						</span>
						:{' '}
						<span className={`text-base md:text-xl`}>{productDetail?.price}</span>
					</p>
				</li>
				<li className='my-4'>
					<p>
						<span className={`text-base md:text-xl text-${yellow} font-light`}>
							Tình trạng
						</span>
						:{' '}
						<span className={`text-base md:text-xl`}>{productDetail?.inventory===1 ? 'Còn hàng'
							: 'Hết hàng'}</span>
					</p>
				</li>

			</ul>
		</div>
	);
};

export default ProductInfo;
