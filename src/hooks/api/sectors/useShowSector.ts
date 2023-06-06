import { QueryClient, useQuery } from 'react-query';
import { sectorsService } from '../../../services/api';

export function useShowSector(id: string) {
	return useQuery('showSector', () => sectorsService.showSector(id));
}

export async function invalidateSector(client: QueryClient, id: string) {
	await client.invalidateQueries(['showSector', id]);
}
