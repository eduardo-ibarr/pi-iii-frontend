import { useMutation } from 'react-query';
import { requestersService } from '../../../services/api';

export function useDeleteRequester() {
	return useMutation(requestersService.deleteRequester);
}
