import { useQuery } from 'react-query';
import { requestersService } from '../../../services/api';

export function useShowRequester(id: string) {
	return useQuery('showRequester', () => requestersService.showRequester(id));
}
