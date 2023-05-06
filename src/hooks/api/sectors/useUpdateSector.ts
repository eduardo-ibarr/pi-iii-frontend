import { useMutation } from 'react-query';
import { sectorsService } from '../../../services/api';
import { IUpdateSector } from '../../../interfaces/update';

export function useUpdateSector(id: string) {
	return useMutation((values: IUpdateSector) =>
		sectorsService.updateSector(values, id)
	);
}
