import { useMutation, useQueryClient } from 'react-query';
import { requestersService } from '../../../services/api';
import { IUpdateRequester } from '../../../interfaces/update';
import { invalidateRequester } from '../requesters/useShowRequester';
import { invalidateRequesters } from '../requesters/useListRequesters';

export function useUpdateRequester(id: string) {
	const queryClient = useQueryClient();

	return useMutation(
		(values: IUpdateRequester) => requestersService.updateRequester(values, id),
		{
			onSuccess: () => {
				invalidateRequester(queryClient, id);
				invalidateRequesters(queryClient);
			},
		}
	);
}
