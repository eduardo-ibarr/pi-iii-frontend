import { useMutation, useQueryClient } from 'react-query';
import { categoriesService } from '../../../services/api';
import { invalidateAgents } from '../agents/useListAgents';

export function useDeleteCategory() {
	const queryClient = useQueryClient();

	return useMutation(categoriesService.deleteCategory, {
		onSuccess: () => {
			invalidateAgents(queryClient);
		},
	});
}
