import { useMutation, useQueryClient } from 'react-query';
import { conversationsService } from '../../../services/api';
import { invalidateConversations } from './useListConversations';

export function useDeleteConversation() {
	const queryClient = useQueryClient();

	return useMutation(conversationsService.deleteConversation, {
		onSuccess: () => {
			invalidateConversations(queryClient);
		},
	});
}
