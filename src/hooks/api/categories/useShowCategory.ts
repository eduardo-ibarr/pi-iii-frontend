import { useQuery } from 'react-query';
import { categoriesService } from '../../../services/api';

export function useShowCategory(id: string) {
	return useQuery('showCategory', () => categoriesService.showCategory(id));
}
