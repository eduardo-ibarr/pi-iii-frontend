import { useMutation, useQueryClient } from 'react-query';
import { agentsService } from '../../../services/api';
import { invalidateAgents } from './useListAgents';

export function useDeleteAgent() {
	const queryClient = useQueryClient();

	return useMutation(agentsService.deleteAgent, {
		onSuccess: () => {
			invalidateAgents(queryClient);
		},
	});
}
