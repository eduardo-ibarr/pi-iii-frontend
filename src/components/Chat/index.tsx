import React from 'react';
import { Input, Button, Card, Form, Spin } from 'antd';

import Title from 'antd/es/typography/Title';
import {
	ChatBubbleByAdminSide,
	ChatBubbleByAgentSide,
	ChatBubbleByRequesterSide,
} from './ChatBubble';
import { handleError } from '../../helpers';
import { useShowConversationByTicket } from '../../hooks/api/conversations/useShowConversationByTicket';
import { useCreateMessage } from '../../hooks/api/messages/useCreateMessage';
import { useListMessagesByTicket } from '../../hooks/api/messages/useListMessagesByTicket';
import { ICreateMessage } from '../../interfaces/create';
import { LoadingSpin } from '../LoadingSpin';
import useAppContext from '../../hooks/app/useAppContext';

interface IChatInterfaceProps {
	ticketId: string;
	disabled: boolean;
}

export const ChatInterface = ({ ticketId, disabled }: IChatInterfaceProps) => {
	const [form] = Form.useForm<ICreateMessage>();

	const { typeOfUser } = useAppContext();

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
				sender: typeOfUser,
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
			<Title level={4}>Bate papo</Title>
			<Card
				style={{
					height: '400px',
					overflow: 'auto',
					boxShadow: 'inset 0 0 2px rgba(0, 0, 0, 0.1)',
				}}
			>
				{typeOfUser === 'agent' &&
					messages.map((message) => (
						<ChatBubbleByAgentSide
							key={message.id}
							messageId={message.id}
							date={message.created_at}
							content={message.content}
							sender={message.sender}
							readStatus={message.read_status}
						/>
					))}

				{typeOfUser === 'requester' &&
					messages.map((message) => (
						<ChatBubbleByRequesterSide
							key={message.id}
							messageId={message.id}
							date={message.created_at}
							content={message.content}
							sender={message.sender}
							readStatus={message.read_status}
						/>
					))}

				{typeOfUser === 'admin' &&
					messages.map((message) => (
						<ChatBubbleByAdminSide
							key={message.id}
							date={message.created_at}
							content={message.content}
							sender={message.sender}
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
					<Input disabled={disabled} />
				</Form.Item>

				<Form.Item>
					<Button disabled={disabled} type="primary" htmlType="submit">
						{isLoadingCreation ? <Spin style={{ color: 'white' }} /> : 'Enviar'}
					</Button>
				</Form.Item>
			</Form>
		</Card>
	);
};
