export interface BillManagerModel {
	id: number;
	name: string;
	address: string;
	phone: string;
	note: string;
	status: number;
	createdAt: string;
	province: string;
	priceShip: number;
	orderItem: BillDetailModel;
	totalPrice: number;
}

export interface BillDetailModel {
	orderId: number;
	createAt: string;
	totalPrice: number;
	orderProducts: Array<{
		productName: string;
		productImage: string;
		price: number;
		quantity: number;
		prodcutId: number;
	}>;
}
