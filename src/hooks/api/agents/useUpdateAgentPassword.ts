import { useMutation, useQueryClient } from 'react-query';
import { agentsService } from '../../../services/api';
import { IUpdateAgentPassword } from '../../../interfaces/update';
import { invalidateAgents } from './useListAgents';
import { invalidateAgent } from './useShowAgent';

export function useUpdateAgentPassword(id: string) {
	const queryClient = useQueryClient();

	return useMutation(
		(values: IUpdateAgentPassword) =>
			agentsService.updateAgentPassword(values, id),
		{
			onSuccess: () => {
				invalidateAgent(queryClient, id);
				invalidateAgents(queryClient);
			},
		}
	);
}
