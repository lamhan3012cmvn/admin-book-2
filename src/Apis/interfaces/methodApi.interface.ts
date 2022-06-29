export enum ApiMethods {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	PATCH = 'PATCH',
	DELETE = 'DELETE'
}

export interface ApiRoutes {
	method: ApiMethods;
	url: string;
}
