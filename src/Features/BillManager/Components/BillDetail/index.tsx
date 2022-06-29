import React from 'react'
import { billManagerCtx } from '../../../../Store/billManager.context'
import CardOrder from './CardOrder'

interface Props {

}

const BillDetail = (props: Props) => {
  const [billState, billActions] = billManagerCtx()
  return (
    <div className="py-6 px-4 max-w-[1200px] w-full relative  ">
      <div className="w-full bg-white rounded shadow-2xl p-8 m-4 productForm-wrapper z-10">
        <div className="py-6 px-4 productForm-scroll">
          <div className='app'>
            <div className='container py-5'>
              <input type='radio' name='tab-manager' id='tab-tatCa' hidden checked />

              <div className='wrap-status'>
                <h3 className='status font-bold text-2xl tatCa'>Chi tiết đơn hàng</h3>

              </div>
              <div className='wrap-content mt-5'>

                <div className='content-tab  mt-5'>
                  <div className='tab-item tabTatCa'>
                    <div className='flex'>
                      <h4 className='soLuong font-bold text-xl'>{billState.billDetail?.orderProducts.length} Đơn hàng</h4>
                    </div>
                    <div className='grid grid-cols-[3fr,2fr,1fr] h-12 title-colum-tab items-center px-[20px] mt-4'>
                      <span >Sản phẩm</span>
                      <span >Trạng thái</span>
                      <span>Tổng đơn</span>
                    </div>
                    <div className='wrap-cart row'>
                      <div
                        className='card mb-3 w-full px-0'
                        style={{ width: '100%' }}>
                        <CardOrder bill={billState.billManager} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BillDetail
