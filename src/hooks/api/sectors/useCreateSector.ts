import { useMutation, useQueryClient } from 'react-query';
import { sectorsService } from '../../../services/api';
import { invalidateSectors } from './useListSectors';

export function useCreateSector() {
	const queryClient = useQueryClient();

	return useMutation(sectorsService.addSector, {
		onSuccess: () => {
			invalidateSectors(queryClient);
		},
	});
}
