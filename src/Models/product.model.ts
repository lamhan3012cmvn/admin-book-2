export interface ProductTextModel {
	id: number;
	lang: number;
	name: string;
	price: number;
	inventory: number;
	description: string;
	slug: string;
	status: number;
	videoUrl: string;
	productId: number;
	createdAt: string;
	updatedAt: string;
}

export interface ProductDetailModel extends ProductTextModel {
	categoryName: string;
	subCategoryName: string;
	productImages?: Array<string>
}
interface ProductImageModel {
	id: number;
	url: string;
	status: number;
}

export interface ProductModel {
	id: number;
	createdAt: string;
	productNameVn: string;
	productNameEn: string;
	category: {
		id: number;
		nameVn: string;
		nameEn: string;
	};
	subCategory: {
		id: number;
		nameVn: string;
		nameEn: string;
	};
	productTexts: Array<ProductTextModel>;
	productImages: Array<ProductImageModel>;
}
