export interface UserModel {
	id: string;
	email: string;
	name: string;
	address: string;
	phone: string;
	createdAt: string;
	updatedAt: string;
	status: number;
	lastAccess: string;
	role: string;
	signUpCode: string;
	forgotPasswordCode: string;
}

export interface UserLoginModel{
	id: string;
	email: string;
	name: string;
	address: string;
	phone: string;
	createdAt: string;
	updatedAt: string;
	lastAccess: string;
}