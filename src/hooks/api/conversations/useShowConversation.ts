import { QueryClient, useQuery } from 'react-query';
import { conversationsService } from '../../../services/api';

export function useShowConversation(id: string) {
	return useQuery('showConversation', () =>
		conversationsService.showConversation(id)
	);
}

export async function invalidateConversation(client: QueryClient) {
	await client.invalidateQueries('showConversation');
}
