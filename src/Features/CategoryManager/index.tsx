import React from 'react'
import TableCategory from './components/TableCategogy'
import { CategoryModel } from '../../Models/caterogy.model'
import { findAllSubCategory } from '../../Apis/Categories/FAllCategory'
import { categoryCtx } from '../../Store/category.context'


interface Props {

}

const CategoryManager = (props: Props) => {

  const [cState, cActions] = categoryCtx()
  const getCategoryAsync = async () => {
    const result = await findAllSubCategory()
    // notify(result.message)
    if (result.success)
      cActions.getCategorySuccess(result.data)
    else cActions.getCategoryError()
  }

  React.useEffect(() => {
    getCategoryAsync()
  }, [])
  return (
    <div className="mt-5">
      <TableCategory data={cState.categories} />
    </div>
  )
}

export default CategoryManager
