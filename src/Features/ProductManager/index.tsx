import React from 'react'
import TableProduct from './Components/TableProduct'
import { testApi } from '../../helper/testApi'
import { findAllProduct } from '../../Apis'
import { notify } from '../../helper/notify'
import { productCtx } from './Contexts/product.context'
import { findAllSubCategory } from '../../Apis/Categories/FAllCategory'
import { categoryCtx } from '../../Store/category.context'
interface Props {

}

const ProductManager = (props: Props) => {
  const [pState, pActions] = productCtx()
  const [cState, cActions] = categoryCtx()
  

  // const getCategoryAsync = async () => {
  //   const result = await findAllSubCategory()
  //   if (result.success)
  //     cActions.getCategorySuccess(result.data)
  //   else pActions.getProductError()
  // }




  // React.useEffect(() => {
  //   // testApi(findAllSubCategory)
  //   getCategoryAsync()
  // }, [])
  return (
    <div className="mt-5">
      <TableProduct />
    </div>
  )
}

export default ProductManager
