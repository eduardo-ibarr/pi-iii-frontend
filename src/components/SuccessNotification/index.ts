import { notification } from 'antd';

export const openSuccessNotification = (description: string) => {
	notification.success({
		message: 'Sucesso!',
		description,
		placement: 'bottomLeft',
	});
};
