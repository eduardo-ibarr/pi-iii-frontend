import { useMutation, useQueryClient } from 'react-query';
import { conversationsService } from '../../../services/api';
import { invalidateConversations } from './useListConversations';

export function useCreateConversation() {
	const queryClient = useQueryClient();

	return useMutation(conversationsService.addConversation, {
		onSuccess: () => {
			invalidateConversations(queryClient);
		},
	});
}
