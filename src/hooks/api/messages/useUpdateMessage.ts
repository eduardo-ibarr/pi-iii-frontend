import { useMutation } from 'react-query';
import { messagesService } from '../../../services/api';
import { IUpdateMessage } from '../../../interfaces/update';

export function useUpdateMessage(id: string) {
	return useMutation((values: IUpdateMessage) =>
		messagesService.updateMessage(values, id)
	);
}
