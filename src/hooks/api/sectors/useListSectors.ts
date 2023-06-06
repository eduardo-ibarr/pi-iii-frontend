import { QueryClient, useQuery } from 'react-query';
import { sectorsService } from '../../../services/api';

export function useListSectors() {
	return useQuery('listSectors', sectorsService.listSectors);
}

export async function invalidateSectors(client: QueryClient) {
	await client.invalidateQueries('listSectors');
}
