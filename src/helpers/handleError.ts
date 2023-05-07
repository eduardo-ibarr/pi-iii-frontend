/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from 'axios';
import { openErrorNotification } from '../components';
import { IRequestError } from '../interfaces/requestError';
import { translateErrorMessage } from './translateErrorMessage';

export const handleError = (error: any) => {
	if (error instanceof AxiosError) {
		const errorObj: IRequestError = error?.response?.data;
		openErrorNotification(translateErrorMessage(errorObj.message));
		console.error(errorObj);
	}
};
