import { useMutation, useQueryClient } from 'react-query';
import { categoriesService } from '../../../services/api';
import { IUpdateCategory } from '../../../interfaces/update';
import { invalidateAgents } from '../agents/useListAgents';
import { invalidateAgent } from '../agents/useShowAgent';

export function useUpdateCategory(id: string) {
	const queryClient = useQueryClient();

	return useMutation(
		(values: IUpdateCategory) => categoriesService.updateCategory(values, id),
		{
			onSuccess: () => {
				invalidateAgents(queryClient);
				invalidateAgent(queryClient, id);
			},
		}
	);
}
