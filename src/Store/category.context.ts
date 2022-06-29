import { createStore, createHook, Action } from 'react-sweet-state';
import { CategoryModel } from '../Models/caterogy.model';
import { SubCategoryModel } from '../Models/subCaterogy.model';

type State = {
	category: Array<CategoryModel>;
	id: number;
	currentSubCategory: SubCategoryModel;
	currentCategory: CategoryModel;
};
type Actions = typeof actions;

const initialState: State = {
	category: [],
	id: -1,
	currentSubCategory: null,
	currentCategory: null
};

const getCategorySuccess =
	(payload: Array<CategoryModel>): Action<State> =>
	({ setState, getState }) => {
		setState({
			...getState(),
			category: payload
		});
	};

const getCategoryError =
	(): Action<State> =>
	({ setState, getState }) => {
		console.log("asdahs")
		setState({
			...getState(),
			category: []
		});
	};

const setIdCategory =
	(id: number): Action<State> =>
	({ setState, getState }) => {
		setState({ ...getState(), id: id });
	};

const setCurrentSubCategory =
	(subCategory: SubCategoryModel): Action<State> =>
	({ setState, getState }) => {
		setState({ ...getState(), currentSubCategory: subCategory });
	};

const setCurrentCategory =
	(category: CategoryModel): Action<State> =>
	({ setState, getState }) => {
		setState({ ...getState(), currentCategory: category });
	};
const actions = {
	getCategorySuccess,
	getCategoryError,
	setIdCategory,
	setCurrentSubCategory,
	setCurrentCategory
};

export const selector = (state: State) => {
	return {
		categories: state.category || [],
		listCategory: state.category.map(e => {
			return {
				id: e.id,
				value: e.nameVn + ' / ' + e.nameEn
			};
		}),
		currentSubCategory: state.currentSubCategory,
		currentCategory: state.currentCategory,
		listSubCategory: () => {
			const category = state.category.find(e => e.id === state.id);
			return (
				category?.subCategory.map(e => {
					return {
						id: e.id,
						value: e.nameVn + ' / ' + e.nameEn
					};
				}) || []
			);
		}
	};
};
const Store = createStore<State, Actions>({
	initialState,
	actions
});

export const categoryCtx = createHook(Store, {
	selector
});
