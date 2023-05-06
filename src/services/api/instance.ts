import axios from 'axios';
import { getAccessToken } from '../../helpers/auth';

const { NODE_ENV, LOCAL_API_URL, PRD_API_URL } = process.env;

console.log({ NODE_ENV, LOCAL_API_URL, PRD_API_URL });

const instance = axios.create({
	baseURL: NODE_ENV === 'development' ? LOCAL_API_URL : PRD_API_URL,
});

instance.interceptors.request.use((config) => {
	const token = getAccessToken();

	config.headers['x-access-token'] = token;

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

		window.location.href = '/';
	}
);

export default instance;
