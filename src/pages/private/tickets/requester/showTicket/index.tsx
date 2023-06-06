import { Card, Descriptions, Tag } from 'antd';
import React from 'react';
import { useParams } from 'react-router';
import Title from 'antd/es/typography/Title';
import { useShowTicket } from '../../../../../hooks/api/tickets/useShowTicket';
import { LoadingSpin, ChatInterface } from '../../../../../components';
import { translate } from '../../../../../helpers/translate';
import { TagColorsByStatus } from '../../../../../constants/enums/TagsColorsByStatus';

export const ShowTicketsByRequesterSide = () => {
	const { id } = useParams();

	const { data: ticket, isLoading: isLoadingTicket } = useShowTicket(
		id as string
	);

	if (isLoadingTicket) {
		return <LoadingSpin />;
	}

	let ticketInfos: [string, string | JSX.Element][] = [];

	if (ticket) {
		ticketInfos = [
			['Assunto', <b key={ticket.id}>{ticket.subject}</b>],
			['Conteúdo', ticket.content],
			['Requisitante', ticket.requester_name],
			[
				'Status',
				<Tag key={ticket.id} color={TagColorsByStatus[ticket.status]}>
					{translate({ message: ticket.status, type: 'status' })}
				</Tag>,
			],
			['Criado em', new Date(ticket.created_at).toLocaleString('pt-BR')],
			['Atualizado em', new Date(ticket.updated_at).toLocaleString('pt-BR')],
		];
	}

	return (
		<div style={{ display: 'flex', width: '100%', gap: '1rem' }}>
			{/* <div style={{ textAlign: 'right', marginRight: '10px' }}>
				<Link to={`/app/agentes/${ticket?.id}/atualizar`}>
					<Button type="primary" style={{ marginBottom: '20px' }}>
						Atualizar dados
					</Button>
				</Link>
			</div> */}
			<Card>
				<Title level={3} style={{ marginBottom: '20px' }}>
					Informações do Ticket
				</Title>
				<Descriptions column={1}>
					{ticketInfos.map(([label, data], i) => (
						<Descriptions.Item key={i} label={label}>
							{data}
						</Descriptions.Item>
					))}
				</Descriptions>
			</Card>

			<ChatInterface
				disabled={ticket?.status === 'cancelled'}
				ticketId={ticket?.id || ''}
			/>
		</div>
	);
};
