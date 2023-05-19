import { useMutation, useQueryClient } from 'react-query';
import { requestersService } from '../../../services/api';
import { IUpdateRequester } from '../../../interfaces/update';
import { invalidateAgent } from '../agents/useShowAgent';
import { invalidateAgents } from '../agents/useListAgents';

export function useUpdateRequester(id: string) {
	const queryClient = useQueryClient();

	return useMutation(
		(values: IUpdateRequester) => requestersService.updateRequester(values, id),
		{
			onSuccess: () => {
				invalidateAgent(queryClient, id);
				invalidateAgents(queryClient);
			},
		}
	);
}
