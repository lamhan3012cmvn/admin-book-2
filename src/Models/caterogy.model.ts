import { SubCategoryModel } from './subCaterogy.model';

export enum ECategoryStatus {
	InActive,
	Active
}

export interface CategoryModel {
	id: number;
	nameVn: string;
	nameEn: string;
	readonly slugVn: string;
	readonly slugEn: string;
	createdAt: string;
	updatedAt: string;
	status: number;
	subCategory: Array<SubCategoryModel>;
}
