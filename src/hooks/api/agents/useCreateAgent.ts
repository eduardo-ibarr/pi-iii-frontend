import { useMutation } from 'react-query';
import { agentsService } from '../../../services/api';
import { invalidateAgents } from './useListAgents';

export function useCreateAgent() {
	return useMutation(agentsService.addAgent, {
		onSuccess: async () => {
			await invalidateAgents();
		},
	});
}
