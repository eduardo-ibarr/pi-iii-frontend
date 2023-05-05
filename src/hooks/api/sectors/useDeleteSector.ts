import { useMutation } from 'react-query';
import { sectorsService } from '../../../services/api';

export function useDeleteSector() {
  return useMutation(sectorsService.deleteSector);
}
