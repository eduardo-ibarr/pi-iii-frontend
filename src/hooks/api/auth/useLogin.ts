import { useMutation } from 'react-query';
import { authService } from '../../../services/api';
import { IAuth } from '../../../interfaces/modules/IAuth';
import { setAccessToken } from '../../../helpers/auth';

export function useLogin() {
	return useMutation(authService.login, {
		onSuccess: ({ token }: IAuth) => {
			setAccessToken(token);
		},
	});
}
