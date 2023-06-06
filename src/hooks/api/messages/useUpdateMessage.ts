import { useMutation, useQueryClient } from 'react-query';
import { messagesService } from '../../../services/api';
import { IUpdateMessage } from '../../../interfaces/update';
import { invalidateMessages } from './useListMessages';
import { invalidateMessagesByTicket } from './useListMessagesByTicket';
import { invalidateMessage } from './useShowMessage';

export function useUpdateMessage(id: string) {
	const queryClient = useQueryClient();

	return useMutation(
		(values: IUpdateMessage) => messagesService.updateMessage(values, id),
		{
			onSuccess: () => {
				invalidateMessages(queryClient);
				invalidateMessage(queryClient);
				invalidateMessagesByTicket(queryClient);
			},
		}
	);
}
