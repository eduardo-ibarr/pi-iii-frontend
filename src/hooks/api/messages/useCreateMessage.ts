import { useMutation, useQueryClient } from 'react-query';
import { messagesService } from '../../../services/api';
import { invalidateMessages } from './useListMessages';
import { invalidateMessage } from './useShowMessage';
import { invalidateMessagesByTicket } from './useListMessagesByTicket';

export function useCreateMessage() {
	const queryClient = useQueryClient();

	return useMutation(messagesService.addMessage, {
		onSuccess: () => {
			invalidateMessages(queryClient);
			invalidateMessage(queryClient);
			invalidateMessagesByTicket(queryClient);
		},
	});
}
