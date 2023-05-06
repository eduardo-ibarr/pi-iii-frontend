import { useQuery } from 'react-query';
import { categoriesService } from '../../../services/api';

export function useListCategories() {
	return useQuery('listCategories', categoriesService.listCategories);
}
