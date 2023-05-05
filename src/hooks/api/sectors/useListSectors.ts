import { useQuery } from 'react-query';
import { sectorsService } from '../../../services/api';

export function useListSectors() {
  return useQuery('listSectors', sectorsService.listSectors);
}
