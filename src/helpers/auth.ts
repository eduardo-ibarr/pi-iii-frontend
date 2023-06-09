import { IAuth } from '../interfaces/modules/IAuth';
import moment from 'moment';
import jwt from 'jwt-decode';
import { TUser } from '../types/TUser';

export const ACCESS_TOKEN = 'auth-token';

interface ITokenStoraged extends IAuth {
	expirationDate: moment.Moment;
}

export const clearAccessToken = (): void =>
	localStorage.removeItem(ACCESS_TOKEN);

export const getAccessToken = (): ITokenStoraged | null => {
	const data = localStorage.getItem(ACCESS_TOKEN);
	const now = moment().utc();

	if (data) {
		const result: ITokenStoraged = JSON.parse(data);

		if (result && moment(result.expirationDate).utc() > now) {
			return result;
		}

		clearAccessToken();

		return null;
	}

	return null;
};

export const setAccessToken = (data: IAuth): void => {
	const now = moment().utc();
	const expiresAt = moment(now).add(data.expiresIn, 'seconds');

	const decodedToken: { userId: string; typeOfUser: TUser } = jwt(data.token);

	const tokenData: ITokenStoraged = {
		...data,
		typeOfUser: decodedToken.typeOfUser,
		userId: decodedToken.userId,
		expirationDate: expiresAt,
	};

	localStorage.setItem(ACCESS_TOKEN, JSON.stringify(tokenData));
};
