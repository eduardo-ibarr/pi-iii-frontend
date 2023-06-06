/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from 'axios';
import { openErrorNotification } from '../components';
import { IRequestError } from '../interfaces/requestError';
import { translate } from './translate';

export const handleError = (error: any) => {
	if (error instanceof AxiosError) {
		const errorObj: IRequestError = error?.response?.data;
		openErrorNotification(
			translate({ message: errorObj.message, type: 'error' })
		);
		console.error(errorObj);
	} else {
		console.error(error);
	}
};
