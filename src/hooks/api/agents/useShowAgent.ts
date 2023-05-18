import { QueryClient, useQuery } from 'react-query';
import { agentsService } from '../../../services/api';

export function useShowAgent(id: string) {
	return useQuery('showAgent', () => agentsService.showAgent(id));
}

export async function invalidateAgent(client: QueryClient, id: string) {
	await client.invalidateQueries(['showAgent', { id }]);
}
