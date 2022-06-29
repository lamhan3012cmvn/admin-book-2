import React from 'react'
import { getPriceShipAsync } from '../../Apis/PriceShip/RPriceShip'
import Table from '../../Components/Table'
import { priceShipCtx } from '../../Store/priceShip.context'
import TablePriceShip from './Components/TablePriceShip'

interface Props {

}

const PriceShip = (props: Props) => {
  return (
    <div className="mt-5">
      <TablePriceShip/>
    </div>
  )
}

export default PriceShip
