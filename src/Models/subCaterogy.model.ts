export enum ESubCategoryStatus {
	InActive,
	Active
}

export interface SubCategoryModel {
	id: number;
	nameVn: string;
	nameEn: string;
	readonly slugVn: string;
	readonly slugEn: string;
	createdAt: string;
	updatedAt: string;
	status: number;
	categoryId: number;
}
