import { QueryClient, useQuery } from 'react-query';
import { messagesService } from '../../../services/api';

export function useListMessages() {
	return useQuery('listMessages', messagesService.listMessages);
}

export async function invalidateMessages(client: QueryClient) {
	await client.invalidateQueries('listMessages');
}
