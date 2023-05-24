import React, { useState } from 'react';
import ChatBubble from './ChatBubble';
import { Row, Col, Input, Button, Card } from 'antd';
import { TUser } from '../../../../../../../types/TUser';

const ChatInterface: React.FC = () => {
	const [messages, setMessages] = useState([
		{
			id: 1,
			content: 'Olá! Como posso ajudar?',
			typeOfUser: 'agent',
			readStatus: true,
		},
		{
			id: 2,
			content: 'quero pastel',
			typeOfUser: 'requester',
			readStatus: true,
		},
		{
			id: 3,
			content: 'Olá! Como posso ajudar?',
			typeOfUser: 'agent',
			readStatus: true,
		},
		{
			id: 2,
			content: 'quero pastel',
			typeOfUser: 'requester',
			readStatus: true,
		},
		{
			id: 3,
			content: 'Olá! Como posso ajudar?',
			typeOfUser: 'agent',
			readStatus: true,
		},
		{
			id: 2,
			content: 'quero pastel',
			typeOfUser: 'requester',
			readStatus: true,
		},
		{
			id: 3,
			content: 'Olá! Como posso ajudar?',
			typeOfUser: 'agent',
			readStatus: true,
		},
		{
			id: 2,
			content: 'quero pastel',
			typeOfUser: 'requester',
			readStatus: false,
		},
	]);

	const handleSendMessage = (message: string, typeOfUser: TUser) => {
		const newMessage = {
			id: messages.length + 1,
			content: message,
			typeOfUser,
			readStatus: false,
		};

		setMessages([...messages, newMessage]);
	};

	return (
		<Card
			style={{
				maxWidth: '500px',
			}}
		>
			<div
				style={{
					maxHeight: '300px',
					height: 'auto',
					overflow: 'auto',
				}}
			>
				{messages.map((message) => (
					<ChatBubble
						key={message.id}
						content={message.content}
						typeOfUser={message.typeOfUser as TUser}
						readStatus={message.readStatus}
					/>
				))}
			</div>
			<Row gutter={8}>
				<Col flex="auto">
					<Input type="text" />
				</Col>
				<Col>
					<Button type="primary">Enviar</Button>
				</Col>
			</Row>
		</Card>
	);
};

export default ChatInterface;
