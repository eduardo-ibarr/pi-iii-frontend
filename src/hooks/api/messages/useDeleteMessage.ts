import { useMutation, useQueryClient } from 'react-query';
import { messagesService } from '../../../services/api';
import { invalidateMessages } from './useListMessages';
import { invalidateMessagesByTicket } from './useListMessagesByTicket';
import { invalidateMessage } from './useShowMessage';

export function useDeleteMessage() {
	const queryClient = useQueryClient();

	return useMutation(messagesService.deleteMessage, {
		onSuccess: () => {
			invalidateMessages(queryClient);
			invalidateMessage(queryClient);
			invalidateMessagesByTicket(queryClient);
		},
	});
}
