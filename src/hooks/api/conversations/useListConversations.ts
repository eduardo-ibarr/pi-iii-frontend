import { QueryClient, useQuery } from 'react-query';
import { conversationsService } from '../../../services/api';

export function useListConversations() {
	return useQuery('listConversations', conversationsService.listConversations);
}

export async function invalidateConversations(client: QueryClient) {
	await client.invalidateQueries('listConversations');
}
