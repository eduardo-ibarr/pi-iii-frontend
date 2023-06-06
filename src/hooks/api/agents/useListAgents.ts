import { QueryClient, useQuery } from 'react-query';
import { agentsService } from '../../../services/api';

export function useListAgents() {
	return useQuery('listAgents', agentsService.listAgents);
}

export async function invalidateAgents(client: QueryClient) {
	await client.invalidateQueries('listAgents');
}
