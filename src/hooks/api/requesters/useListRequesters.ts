import { useQuery } from 'react-query';
import { requestersService } from '../../../services/api';

export function useListRequesters() {
  return useQuery('listRequesters', requestersService.listRequesters);
}
