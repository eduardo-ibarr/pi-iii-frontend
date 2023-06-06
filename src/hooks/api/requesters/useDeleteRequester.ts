import { useMutation, useQueryClient } from 'react-query';
import { requestersService } from '../../../services/api';
import { invalidateRequesters } from '../requesters/useListRequesters';

export function useDeleteRequester() {
	const queryClient = useQueryClient();

	return useMutation(requestersService.deleteRequester, {
		onSuccess: () => {
			invalidateRequesters(queryClient);
		},
	});
}
