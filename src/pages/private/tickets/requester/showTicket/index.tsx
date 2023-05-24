import { Button, Card, Descriptions, Tag } from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import React from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Title from 'antd/es/typography/Title';
import { useShowTicket } from '../../../../../hooks/api/tickets/useShowTicket';
import { LoadingSpin } from '../../../../../components';
import { translateStatusMessage } from '../../../../../helpers/translateStatusMessage';
import ChatInterface from './components/Chat';

export const ShowTicketsByRequesterSide = () => {
	const { id } = useParams();

	const { data: ticket, isLoading } = useShowTicket(id as string);

	if (isLoading) {
		return <LoadingSpin />;
	}

	let ticketInfos: [string, string | JSX.Element][] = [];

	if (ticket) {
		ticketInfos = [
			['Assunto', <b key={ticket.id}>{ticket.subject}</b>],
			['Conteudo', ticket.content],
			[
				'Status',
				<Tag key={ticket.id} color="default">
					{translateStatusMessage(ticket.status)}
				</Tag>,
			],
			['Criado em', new Date(ticket.created_at).toLocaleString('pt-BR')],
			['Atualizado em', new Date(ticket.updated_at).toLocaleString('pt-BR')],
		];
	}

	return (
		<>
			{/* <div style={{ textAlign: 'right', marginRight: '10px' }}>
				<Link to={`/app/agentes/${ticket?.id}/atualizar`}>
					<Button type="primary" style={{ marginBottom: '20px' }}>
						Atualizar dados
					</Button>
				</Link>
			</div> */}

			<Card>
				<Title level={3} style={{ marginBottom: '20px' }}>
					Informações do Agente
				</Title>
				<Descriptions column={1}>
					{ticketInfos.map(([label, data], i) => (
						<Descriptions.Item key={i} label={label}>
							{data}
						</Descriptions.Item>
					))}
				</Descriptions>

				<ChatInterface />
			</Card>
		</>
	);
};
