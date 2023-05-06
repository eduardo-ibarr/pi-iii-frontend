import errorMessages from '../translate/errorMessages.json';

export const translateErrorMessage = (message: string) => {
	const errorMessagesToString = JSON.stringify(errorMessages);
	const errorMessagesParsed = JSON.parse(errorMessagesToString);

	return errorMessagesParsed[message] || message;
};
