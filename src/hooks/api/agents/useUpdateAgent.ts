import { useMutation, useQueryClient } from 'react-query';
import { agentsService } from '../../../services/api';
import { IUpdateAgent } from '../../../interfaces/update';
import { invalidateAgents } from './useListAgents';
import { invalidateAgent } from './useShowAgent';

export function useUpdateAgent(id: string) {
	const queryClient = useQueryClient();

	return useMutation(
		(values: IUpdateAgent) => agentsService.updateAgent(values, id),
		{
			onSuccess: () => {
				invalidateAgent(queryClient, id);
				invalidateAgents(queryClient);
			},
		}
	);
}
