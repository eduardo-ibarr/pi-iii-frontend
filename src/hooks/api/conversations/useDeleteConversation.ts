import { useMutation } from 'react-query';
import { conversationsService } from '../../../services/api';

export function useDeleteConversation() {
	return useMutation(conversationsService.deleteConversation);
}
