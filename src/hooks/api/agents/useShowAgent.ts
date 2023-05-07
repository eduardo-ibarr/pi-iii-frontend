import { useQuery, useQueryClient } from 'react-query';
import { agentsService } from '../../../services/api';

export function useShowAgent(id: string) {
	return useQuery('showAgent', () => agentsService.showAgent(id));
}

export function invalidateAgent() {
	const queryClient = useQueryClient();
	return queryClient.invalidateQueries({ queryKey: ['showAgent'] });
}
