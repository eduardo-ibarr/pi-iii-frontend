import jwtDecode from 'jwt-decode';

export const ACCESS_TOKEN = '@sistemadevendas-token';

interface ITokenDecoded {
	userID: string;
	iat: number;
	exp: number;
}

export const getAccessToken = (): string | null => {
	const token = localStorage.getItem(ACCESS_TOKEN);

	if (token) {
		const decodedToken = jwtDecode<ITokenDecoded>(token);

		if (decodedToken.exp * 1000 < Date.now()) {
			clearAccessToken();
			return null;
		}

		return token;
	}

	return null;
};

export const clearAccessToken = (): void =>
	localStorage.removeItem(ACCESS_TOKEN);

export const setAccessToken = (token: string): void =>
	localStorage.setItem(ACCESS_TOKEN, token);
