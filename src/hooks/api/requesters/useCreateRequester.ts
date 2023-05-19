import { useMutation, useQueryClient } from 'react-query';
import { requestersService } from '../../../services/api';
import { invalidateRequesters } from './useListRequesters';

export function useCreateRequester() {
	const queryClient = useQueryClient();

	return useMutation(requestersService.addRequester, {
		onSuccess: () => {
			invalidateRequesters(queryClient);
		},
	});
}
