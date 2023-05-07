import { useMutation } from 'react-query';
import { agentsService } from '../../../services/api';
import { invalidateAgents } from './useListAgents';

export function useDeleteAgent() {
	return useMutation(agentsService.deleteAgent, {
		onSuccess: async () => {
			await invalidateAgents();
		},
	});
}
