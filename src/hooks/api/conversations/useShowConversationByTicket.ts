import { QueryClient, useQuery } from 'react-query';
import { conversationsService } from '../../../services/api';

export function useShowConversationByTicket(ticketId: string) {
	return useQuery('showConversationByTicket', async () => {
		const conversations = await conversationsService.listConversations();

		const conversationFound = conversations.find(
			(conversation) => conversation.ticket_id === ticketId
		);

		return conversationFound;
	});
}

export async function invalidateConversationByTicket(client: QueryClient) {
	await client.invalidateQueries('showConversationByTicket');
}
