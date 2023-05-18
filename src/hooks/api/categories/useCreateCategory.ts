import { useMutation, useQueryClient } from 'react-query';
import { categoriesService } from '../../../services/api';
import { invalidateAgents } from '../agents/useListAgents';

export function useCreateCategory() {
	const queryClient = useQueryClient();

	return useMutation(categoriesService.addCategory, {
		onSuccess: () => {
			invalidateAgents(queryClient);
		},
	});
}
