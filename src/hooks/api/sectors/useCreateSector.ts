import { useMutation } from 'react-query';
import { sectorsService } from '../../../services/api';

export function useCreateSector() {
	return useMutation(sectorsService.addSector);
}
