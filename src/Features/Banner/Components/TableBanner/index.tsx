import React from 'react'
import { AiFillCiCircle } from 'react-icons/ai'
import moment from 'moment'
import { PriceShipModel } from '../../../../Models/priceShip.model'
import ActionWrapper from '../../../../Components/ActionWrapper'
import ActionTable from '../../../../Components/ActionTable'
import { FaEdit, FaEye, FaPencilAlt, FaTrashAlt } from 'react-icons/fa'
import { priceShipCtx } from '../../../../Store/priceShip.context'
import { deletePriceShipAsync } from '../../../../Apis/PriceShip/DPriceShip'
import Modal from '../../../../Components/Modal'
import EditPriceShip from '../EditBanner'
import Button from '../../../../Components/Button'
import CreatePriceShip from '../CreateBanner'
import { formatMoney } from '../../../../Common'
import { bannerCtx } from '../../../../Store/banner.context'
import CreateBanner from '../CreateBanner'
import { deleteBannerAsync } from '../../../../Apis/Banners/DBanner'
import EditBanner from '../EditBanner'
import { notify } from '../../../../helper/notify'


const TableBanner = () => {

  const [bannerState, bannerActions] = bannerCtx()

  const [showEditBanner, setShowEditBanner] = React.useState(false)
  const handleShowEditBanner = (id: number) => {
    bannerActions.setIdBanner(id)
    setShowEditBanner(true)
  }

  const [showCreateBanner, setShowCreateBanner] = React.useState(false)
  const handleShowCreateBanner = () => {
    setShowCreateBanner(true)
  }

  const handleDeleteBanner = async (id) => {
    const result = await deleteBannerAsync({ id })
    if (result.success) {
      bannerActions.setBanners(result.data)
      notify('Xóa banner thành công');
    }else{
      notify('Xóa banner thất bại');
    }
  }

  return (
    <div>
			<div className='rounded bg-white border border-gray-300'>
				<div className='flex items-center justify-between px-5'>
					<div className='p-6'>Danh Sách Banner</div>
					<div>
						<Button onClick={() => handleShowCreateBanner()}>Tạo banner mới</Button>
					</div>
				</div>
				<table className='table-auto w-full text-left'>
          <thead>
            <tr>
              <th className="px-4 py-2 border-r text-center">Hình ảnh</th>
              <th className="px-4 py-2 border-r text-center">Tiêu đề banner</th>
              <th className="px-4 py-2 border-r text-center">Mô tả ngắn</th>
              <th className="px-4 py-2 border-r text-center w-[100px]">Ngôn ngữ</th>
              <th className="px-4 py-2 border-r text-center">Chức năng</th>
            </tr>
          </thead>
          <tbody className="text-gray-600">
            {
              bannerState.banners.map((e, i) => {
                return (
                  <tr key={i}>
                    <td className="border border-l-0 px-4 py-2 text-left text-black">
                      <div className="w-[100px] h-[100px] rounded-xl">
                        <img src={e.url} alt="" className="w-full h-full object-cover rounded-xl" />
                      </div>
                    </td>
                    <td className="border border-l-0 px-4 py-2 text-left text-black w-[200px]">{e.title}</td>
                    <td className="border border-l-0 px-4 py-2 text-left text-black">{e.desc}</td>
                    <td className="border border-l-0 px-4 py-2 text-black text-center">{e.lang===0? "🇻🇳":"🇺🇸"}</td>
                    <td className="border border-l-0 px-4 py-2 text-left text-black">
                      <ActionWrapper>
                        <ActionTable onClick={() => { handleShowEditBanner(e.id) }}>
                          <FaEdit />
                        </ActionTable>

                        <ActionTable onClick={() => { handleDeleteBanner(e.id) }}>
                          <FaTrashAlt />
                        </ActionTable>
                        {/* deleteBannerAsync */}
                      </ActionWrapper>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>

      {
        showEditBanner && <Modal showed={true} setShowed={() => setShowEditBanner(false)}>
          <EditBanner handleHideFrom={() => setShowEditBanner(false)} />
        </Modal>
      }
      {
        showCreateBanner && <Modal showed={true} setShowed={setShowCreateBanner}>
          <CreateBanner handleHideFrom={() => { setShowCreateBanner(false) }} />
        </Modal>
      }
    </div >
  )
}


export default TableBanner