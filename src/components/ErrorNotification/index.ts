import { notification } from 'antd';

export const openErrorNotification = (description: string) => {
	notification.error({
		message: 'Oops... algo deu errado!',
		description,
		placement: 'bottomLeft',
	});
};
