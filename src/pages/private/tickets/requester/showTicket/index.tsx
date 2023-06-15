import { Card, Descriptions, Tag } from 'antd';
import React from 'react';
import { useParams } from 'react-router';
import Title from 'antd/es/typography/Title';
import { useShowTicket } from '../../../../../hooks/api/tickets/useShowTicket';
import { LoadingSpin, ChatInterface } from '../../../../../components';
import { translate } from '../../../../../helpers/translate';
import { tagColorsByStatus } from '../../../../../constants/tagsColorsByStatus';

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
			['Categoria de suporte', ticket.category_name],
			['Nome do requisitante', ticket.requester_name],
			['Email do requisitante', ticket.requester_email],
			['Setor da empresa', ticket.sector_name],
			[
				'Status',
				<Tag key={ticket.id} color={tagColorsByStatus[ticket.status]}>
					{translate({ message: ticket.status, type: 'status' })}
				</Tag>,
			],
			[
				'Nome do agente responsável',
				ticket.agent_name || <em>Não atribuído</em>,
			],
			[
				'Email do agente responsável',
				ticket.agent_email || <em>Não atribuído</em>,
			],
			['Criado em', new Date(ticket.created_at).toLocaleString('pt-BR')],
			['Atualizado em', new Date(ticket.updated_at).toLocaleString('pt-BR')],
		];
	}

	return (
		<div style={{ display: 'flex', width: '100%', gap: '1rem' }}>
			<Card>
				<Title level={4} style={{ marginBottom: '20px' }}>
					Informações do ticket de atendimento
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
				disabled={ticket?.status !== 'in progress'}
				ticketId={ticket?.id || ''}
			/>
		</div>
	);
};
