import { useMutation, useQueryClient } from 'react-query';
import { conversationsService } from '../../../services/api';
import { IUpdateConversation } from '../../../interfaces/update';
import { invalidateConversations } from './useListConversations';
import { invalidateConversation } from './useShowConversation';

export function useUpdateConversation(id: string) {
	const queryClient = useQueryClient();

	return useMutation(
		(values: IUpdateConversation) =>
			conversationsService.updateConversation(values, id),
		{
			onSuccess: () => {
				invalidateConversations(queryClient);
				invalidateConversation(queryClient);
			},
		}
	);
}
