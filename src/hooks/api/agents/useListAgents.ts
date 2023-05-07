import { useQuery, useQueryClient } from 'react-query';
import { agentsService } from '../../../services/api';

export function useListAgents() {
	return useQuery('listAgents', agentsService.listAgents);
}

export function invalidateAgents() {
	const queryClient = useQueryClient();
	return queryClient.invalidateQueries({ queryKey: ['listAgents'] });
}
