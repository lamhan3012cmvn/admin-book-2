import React from 'react';
import ReactHtmlParser from 'react-html-parser';

import { productCtx } from '../../Contexts/product.context';
import ProductInfo from '../ProductInfo';
import './style.css';

const ProductDetail = () => {
	const [PState, _] = productCtx();
	const { productDetail } = PState;
	return (
		<div className='py-8 px-4 productDetail'>
			<div className='max-w-[1200px] w-full relative productDetail-content'>
				<div className='grid grid-cols-2 gap-x-4 px-4 py-6 h-[600px]'>
					<div className='col-span-2'>
						<div className='mt-5 grid grid-cols-2 lg:h-[350px] gap-[20px]'>
							<div className='lg:col-span-1 h-[350px]'>
								<img
									src={productDetail?.productImages[0]}
									style={{
										width: '100%',
										height: '95%',
										objectFit: 'cover'
									}}></img>
								{/* <ProductImageZoom images={productsImage}></ProductImageZoom> */}
							</div>

							<div className='lg:col-span-1'>
								<ProductInfo productDetail={productDetail} />
							</div>
						</div>
						<div>
							<h3 className='font-light text-3xl sm:text-2xl md:text-3xl truncate text-[#4FD1C5]'>
								{productDetail?.name}
							</h3>
							<div
								className='px-7 py-5 flex flex-col gap-x-2 gap-y-3'
								dangerouslySetInnerHTML={{
									__html: productDetail?.description || ''
								}}>
								{/* {ReactHtmlParser(productDetail?.description)} */}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductDetail;
