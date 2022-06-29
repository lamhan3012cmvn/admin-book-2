import React from 'react';
import { formatMoney, listStatusOrder } from '../../../../../Common';
import { BillManagerModel } from '../../../../../Models/billManager.model';

const CardOrder = ({ bill }: { bill: BillManagerModel }) => {
  const { orderItem } = bill || { orderItem: undefined }
  return (
    <div>
      <div className='card-header w-full'>
        <div className='px-[20px] flex justify-between items-center mt-4'>
          <p className='m-0'>
            <strong>Mã đơn hàng:</strong> {orderItem?.orderId}
          </p>

          <p className='m-0'><strong>Tổng: </strong>{formatMoney(orderItem?.totalPrice || 0)}</p>
        </div>
      </div>
      <div className="mt-4 px-[20px]">

        {orderItem?.orderProducts.map((orderProduct, index) => {
          return (
            <div className='card-body w-full grid grid-cols-[3fr,2fr,1fr] mt-[20px]' key={index}>
              <div className='flex'>
                <div className='card-image'>
                  <img
                    src={orderProduct.productImage}
                    alt=''
                  />
                  <span>{orderProduct.productName}</span>
                </div>
              </div>
              <div className='flex items-center'>
                <p>{listStatusOrder[bill?.status || 0].value}</p>
              </div>
              <div className='flex items-center'>
                <span> {orderProduct.quantity}</span>
                <span> x {formatMoney(orderProduct.price)}</span>
                {/* <p>Thanh toán khi nhận hàng</p> */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CardOrder;
