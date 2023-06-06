import { QueryClient, useQuery } from 'react-query';
import { categoriesService } from '../../../services/api';

export function useShowCategory(id: string) {
	return useQuery('showCategory', () => categoriesService.showCategory(id));
}

export async function invalidateCategory(client: QueryClient, id: string) {
	await client.invalidateQueries(['showCategory', id]);
}
