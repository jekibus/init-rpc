import { PUBLIC_BOSAPI_CLIENT_KEY, PUBLIC_BOSAPI_BASE_URL } from '$env/static/public';

import { authUser, modal } from './store';
import type { IResponse } from './types/Network';
import { get as getStore } from 'svelte/store';

type RequestOptions = {
	method: string;
	headers: {
		'Content-Type'?: string;
		'Bosapi-Client-Key': string;
		'Bosapi-Auth-Token': string;
	};
	body?: string;
};

const getServerinfo = () => ({
	bosapiHost: PUBLIC_BOSAPI_BASE_URL,
	bosapiClientKey: PUBLIC_BOSAPI_CLIENT_KEY
});

const getServerVars = () => {
	const server = getServerinfo();
	const BOSAPI_SERVER = server.bosapiHost;
	const BOSAPI_CLIENT_KEY = server.bosapiClientKey;

	if (!BOSAPI_SERVER) {
		modal.set({ body: 'BosAPI Server is not defined!' });
	}

	if (!BOSAPI_CLIENT_KEY) {
		modal.set({ body: 'BosAPI Token is not defined!' });
	}

	return { BOSAPI_SERVER, BOSAPI_CLIENT_KEY };
};

const getToken = () => {
	let token: any = getStore(authUser)?.token;
	if (!token) {
		token = localStorage.getItem('tkn');
	}
	return token;
};

const request = async (url: string, body?: Record<string, any>, method = 'GET') => {
	const { BOSAPI_SERVER, BOSAPI_CLIENT_KEY } = getServerVars();

	let options: RequestOptions = {
		method,
		headers: {
			'Content-Type': 'application/json',
			'Bosapi-Client-Key': BOSAPI_CLIENT_KEY,
			'Bosapi-Auth-Token': `Basic ${getToken()}`
		}
	};

	if (body) {
		options.body = JSON.stringify(body);
	}

	url = BOSAPI_SERVER + url;

	// return fetch(url, options).then((response) => response.json());
	const result: IResponse = await fetch(url, options).then((response) => response.json());
	if (!result?.success) {
		modal.set({
			body: 'Server: ' + result?.message
		});
	}
	return result;
};

const requestUpload = async (file: File) => {
	const { BOSAPI_SERVER, BOSAPI_CLIENT_KEY } = getServerVars();

	const formData: any = new FormData();
	formData.append('file', file);

	let options: RequestOptions = {
		method: 'POST',
		headers: {
			// 'Content-Type': `multipart/form-data; boundary=${formData}`,
			'Bosapi-Client-Key': BOSAPI_CLIENT_KEY,
			'Bosapi-Auth-Token': `Basic ${getStore(authUser)?.token}`
		},
		body: formData
	};

	const result: IResponse = await fetch(BOSAPI_SERVER + '/uploads', options).then((response) =>
		response.json()
	);
	if (result.error) {
		modal.set({
			body: 'Server: ' + result.message
		});
	}
	return result;
};

const requestDownload = async (path: string) => {
	const { BOSAPI_SERVER, BOSAPI_CLIENT_KEY } = getServerVars();

	let options: RequestOptions = {
		method: 'GET',
		headers: {
			'Bosapi-Client-Key': BOSAPI_CLIENT_KEY,
			'Bosapi-Auth-Token': `Basic ${getStore(authUser)?.token}`
		}
	};

	const result: any = await fetch(BOSAPI_SERVER + '/downloads?path=' + path, options).then(
		(response) => response.blob()
	);
	if (result?.error) {
		modal.set({
			body: 'Server: ' + result?.message
		});
	}
	return result;
};

export const get = (url: string, body?: object) => request(url, body, 'GET');
export const post = (url: string, body?: object) => request(url, body, 'POST');
export const patch = (url: string, body?: object) => request(url, body, 'PATCH');
export const remove = (url: string, body?: object) => request(url, body, 'DELETE');
export const fec = (method: string, url: string, body?: object) => request(url, body, method);
export const upload = (file: File) => requestUpload(file);
export const download = (path: string) => requestDownload(path);
