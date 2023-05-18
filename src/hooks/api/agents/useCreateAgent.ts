import { useMutation, useQueryClient } from 'react-query';
import { agentsService } from '../../../services/api';
import { invalidateAgents } from './useListAgents';

export function useCreateAgent() {
	const queryClient = useQueryClient();

	return useMutation(agentsService.addAgent, {
		onSuccess: () => {
			invalidateAgents(queryClient);
		},
	});
}
