import { useMutation, useQueryClient } from 'react-query';
import { sectorsService } from '../../../services/api';
import { invalidateSectors } from './useListSectors';

export function useDeleteSector() {
	const queryClient = useQueryClient();

	return useMutation(sectorsService.deleteSector, {
		onSuccess: () => {
			invalidateSectors(queryClient);
		},
	});
}
