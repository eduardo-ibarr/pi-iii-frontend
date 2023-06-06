import React from 'react';
import { Input, Button, Card, Form, Spin } from 'antd';
import { useListMessagesByTicket } from '../../../../../../../hooks/api/messages/useListMessagesByTicket';
import { LoadingSpin } from '../../../../../../../components';
import { useCreateMessage } from '../../../../../../../hooks/api/messages/useCreateMessage';
import { ICreateMessage } from '../../../../../../../interfaces/create';
import { handleError } from '../../../../../../../helpers';
import { useShowConversationByTicket } from '../../../../../../../hooks/api/conversations/useShowConversationByTicket';
import Title from 'antd/es/typography/Title';
import { ChatBubble } from './ChatBubble';

interface IChatInterfaceProps {
	ticketId: string;
}

export const ChatInterface = ({ ticketId }: IChatInterfaceProps) => {
	const [form] = Form.useForm<ICreateMessage>();

	const { data: conversation, isLoading: isLoadingShow } =
		useShowConversationByTicket(ticketId);

	const { data: messages, isLoading: isLoadingList } =
		useListMessagesByTicket(ticketId);

	const { mutateAsync: createMessage, isLoading: isLoadingCreation } =
		useCreateMessage();

	if (isLoadingList || isLoadingShow) {
		return <LoadingSpin />;
	}

	if (!messages) {
		return <p>nao encontrado</p>;
	}

	const onFinish = async ({ content }: ICreateMessage) => {
		try {
			form.setFieldValue('content', '');

			await createMessage({
				content,
				conversation_id: conversation?.id || '',
				read_status: false,
				sender: 'requester',
				ticket_id: ticketId,
			});
		} catch (error) {
			handleError(error);
		}
	};

	return (
		<Card
			style={{
				maxWidth: '500px',
			}}
		>
			<Title level={3}>Bate papo</Title>
			<Card
				style={{
					height: '400px',
					overflow: 'auto',
				}}
			>
				{messages.map((message) => (
					<ChatBubble
						key={message.id}
						date={message.created_at}
						content={message.content}
						typeOfUser={message.sender}
						readStatus={message.read_status}
					/>
				))}
			</Card>

			<Form
				form={form}
				onFinish={onFinish}
				style={{ width: '400px', marginBottom: '-2rem' }}
			>
				<Form.Item style={{ marginTop: '20px' }} name="content">
					<Input />
				</Form.Item>

				<Form.Item>
					<Button type="primary" htmlType="submit">
						{isLoadingCreation ? <Spin style={{ color: 'white' }} /> : 'Enviar'}
					</Button>
				</Form.Item>
			</Form>
		</Card>
	);
};
