import { useMutation } from 'react-query';
import { messagesService } from '../../../services/api';

export function useCreateMessage() {
	return useMutation(messagesService.addMessage);
}
