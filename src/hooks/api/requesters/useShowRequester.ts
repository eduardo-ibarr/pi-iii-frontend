import { QueryClient, useQuery } from 'react-query';
import { requestersService } from '../../../services/api';

export function useShowRequester(id: string) {
	return useQuery('showRequester', () => requestersService.showRequester(id));
}

export async function invalidateRequester(client: QueryClient, id: string) {
	await client.invalidateQueries(['showRequester', { id }]);
}
