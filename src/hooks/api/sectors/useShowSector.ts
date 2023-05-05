import { useQuery } from 'react-query';
import { sectorsService } from '../../../services/api';

export function useShowSector(id: string) {
  return useQuery('showSector', () => sectorsService.showSector(id));
}
