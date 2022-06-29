export const listStatusOrder = [
	{ id: 0, value: 'Chờ xác nhận' },
	{ id: 1, value: 'Đang giao' },
	{ id: 2, value: 'Đã giao' },
	{ id: 3, value: 'Hủy đơn' }
];

export const listStatus = [
	{ id: 0, value: 'Không hoạt động' },
	{ id: 1, value: 'Đang hoạt động' }
];

export const listLanguage = [
	{ id: 0, value: 'Tiếng Việt' },
	{ id: 1, value: 'Tiếng Anh' }
];
export const formatMoney = (money: number) => {
	return money.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
};
