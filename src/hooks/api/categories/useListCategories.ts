import { QueryClient, useQuery } from 'react-query';
import { categoriesService } from '../../../services/api';

export function useListCategories() {
	return useQuery('listCategories', categoriesService.listCategories);
}

export async function invalidateCategories(client: QueryClient) {
	await client.invalidateQueries('listCategories');
}
