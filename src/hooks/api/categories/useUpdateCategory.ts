import { useMutation } from 'react-query';
import { categoriesService } from '../../../services/api';
import { IUpdateCategory } from '../../../interfaces/update';

export function useUpdateCategory(id: string) {
	return useMutation((values: IUpdateCategory) =>
		categoriesService.updateCategory(values, id)
	);
}
