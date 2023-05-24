import statusMessages from '../translate/statusMessages.json';

export const translateStatusMessage = (message: string) => {
	const statusMessagesToString = JSON.stringify(statusMessages);
	const statusMessagesParsed = JSON.parse(statusMessagesToString);

	return statusMessagesParsed[message] || message;
};
