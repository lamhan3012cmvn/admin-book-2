/* eslint-disable no-console */
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import queryString from 'query-string';
const axiosClient = axios.create({
	baseURL: 'https://book-store-online-be.herokuapp.com/rest',
	timeout: 20000,
	headers: {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*'
	},
	paramsSerializer: params => {
		return queryString.stringify(params);
	}
});

axiosClient.interceptors.request.use(
	(config: AxiosRequestConfig) => {
		const token = localStorage.getItem('token');
		// localStorage.getItem('token');

		if (token) config.headers.Authorization = `${token}`;
		return config;
	},
	err => {
		console.log(err.response);

		return Promise.reject(err);
	}
);
axiosClient.interceptors.response.use(
	(res: AxiosResponse) => {
		if (res && res.data) return res.data;
		return res;
	},
	err => {
		console.log(err);
		// if (err.response.status === 401) {
		// localStorage.removeItem('token');
		// window.location.href = '/login';
		// }
		if (err.response && err.response.data) return err.response.data;
		return Promise.reject(err);
	}
);

export default axiosClient;
