import { useQuery } from 'react-query';
import { messagesService } from '../../../services/api';

export function useShowMessage(id: string) {
	return useQuery('showMessage', () => messagesService.showMessage(id));
}
