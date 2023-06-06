import { QueryClient, useQuery } from 'react-query';
import { messagesService } from '../../../services/api';

export function useShowMessage(id: string) {
	return useQuery('showMessage', () => messagesService.showMessage(id));
}

export async function invalidateMessage(client: QueryClient) {
	await client.invalidateQueries('showMessage');
}
