import axios from 'axios';
import { getAccessToken } from '../../helpers/auth';

const { REACT_APP_API_URL } = process.env;

const instance = axios.create({
	baseURL: REACT_APP_API_URL,
});

instance.interceptors.request.use((config) => {
	const data = getAccessToken();

	config.headers['x-access-token'] = data?.token;

	return config;
});

instance.interceptors.request.use(
	(response) => response,
	(error) => {
		const publicRoutes = ['/'];

		const isAuthError = error?.response?.status === '401';

		const isPublicRoute = publicRoutes.includes(window.location.pathname);

		if (isAuthError || isPublicRoute) {
			return Promise.reject(error);
		}

		window.location.href = '/login';
	}
);

export default instance;
