import { useMutation } from 'react-query';
import { authService } from '../../../services/api';

export function useLogoff() {
	return useMutation(authService.logoff);
}
