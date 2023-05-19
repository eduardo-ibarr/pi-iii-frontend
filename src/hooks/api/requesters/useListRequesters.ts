import { QueryClient, useQuery } from 'react-query';
import { requestersService } from '../../../services/api';

export function useListRequesters() {
	return useQuery('listRequesters', requestersService.listRequesters);
}

export async function invalidateRequesters(client: QueryClient) {
	await client.invalidateQueries(['listRequesters']);
}
