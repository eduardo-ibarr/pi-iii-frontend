import { QueryClient, useQuery } from 'react-query';
import { messagesService } from '../../../services/api';
import { useShowConversationByTicket } from '../conversations/useShowConversationByTicket';

export function useListMessagesByTicket(ticketId: string) {
	const { data: conversation } = useShowConversationByTicket(ticketId);

	return useQuery('listMessagesByTicket', async () => {
		const messages = await messagesService.listMessages();

		const messagesFound = messages
			.filter((message) => message.conversation_id === conversation?.id)
			.sort(
				(a, b) =>
					new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
			);

		return messagesFound;
	});
}

export async function invalidateMessagesByTicket(client: QueryClient) {
	await client.invalidateQueries('listMessagesByTicket');
}
