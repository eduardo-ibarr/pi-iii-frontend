import errorMessages from '../translate/errorMessages.json';
import statusMessages from '../translate/statusMessages.json';

interface ITranslate {
	message: string;
	type: 'error' | 'status';
}

export const translate = ({ message, type }: ITranslate): string => {
	const translationsFor = {
		error: () => {
			const errorMessagesToString = JSON.stringify(errorMessages);
			const errorMessagesParsed = JSON.parse(errorMessagesToString);

			return errorMessagesParsed[message] || message;
		},
		status: () => {
			const statusMessagesToString = JSON.stringify(statusMessages);
			const statusMessagesParsed = JSON.parse(statusMessagesToString);

			return statusMessagesParsed[message] || message;
		},
	};

	return translationsFor[type]();
};
