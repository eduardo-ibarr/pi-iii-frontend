import { useMutation, useQueryClient } from 'react-query';
import { sectorsService } from '../../../services/api';
import { IUpdateSector } from '../../../interfaces/update';
import { invalidateSectors } from '../sectors/useListSectors';
import { invalidateSector } from '../sectors/useShowSector';

export function useUpdateSector(id: string) {
	const queryClient = useQueryClient();

	return useMutation(
		(values: IUpdateSector) => sectorsService.updateSector(values, id),
		{
			onSuccess: () => {
				invalidateSector(queryClient, id);
				invalidateSectors(queryClient);
			},
		}
	);
}
