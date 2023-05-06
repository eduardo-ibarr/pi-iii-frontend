import { useMutation } from 'react-query';
import { messagesService } from '../../../services/api';

export function useDeleteConversation() {
	return useMutation(messagesService.deleteMessage);
}
