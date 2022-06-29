import React from 'react'
import { getBannerAsync } from '../../Apis/Banners/RBanner'
import { bannerCtx } from '../../Store/banner.context'
import { priceShipCtx } from '../../Store/priceShip.context'
import TableBanner from './Components/TableBanner'

interface Props {

}

const BannerHome = (props: Props) => {

  const [bannerState, bannerActions] = bannerCtx()

  const getBannerApi = async () => {
    const result = await getBannerAsync()
    if (result.success) {
      bannerActions.setBanners(result.data)
    }
    else {
      bannerActions.setBanners([])
    }
  }
  React.useEffect(() => {
    getBannerApi()
  }, [])
  return (
    <div className="mt-5">
      <TableBanner />
    </div>
  )
}

export default BannerHome
