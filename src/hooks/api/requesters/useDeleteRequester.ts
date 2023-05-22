import { useMutation, useQueryClient } from 'react-query';
import { requestersService } from '../../../services/api';
import { invalidateAgents } from '../agents/useListAgents';

export function useDeleteRequester() {
	const queryClient = useQueryClient();

	return useMutation(requestersService.deleteRequester, {
		onSuccess: () => {
			invalidateAgents(queryClient);
		},
	});
}
