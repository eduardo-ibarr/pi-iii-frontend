import { useMutation, useQueryClient } from 'react-query';
import { requestersService } from '../../../services/api';
import { IUpdateRequesterPassword } from '../../../interfaces/update';
import { invalidateRequesters } from './useListRequesters';
import { invalidateRequester } from './useShowRequester';

export function useUpdateRequesterPassword(id: string) {
	const queryClient = useQueryClient();

	return useMutation(
		(values: IUpdateRequesterPassword) =>
			requestersService.updateRequesterPassword(values, id),
		{
			onSuccess: () => {
				invalidateRequester(queryClient, id);
				invalidateRequesters(queryClient);
			},
		}
	);
}
