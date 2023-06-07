import { Button, Card, Descriptions, Modal, Spin, Tag, Typography } from 'antd';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import Title from 'antd/es/typography/Title';
import { useShowTicket } from '../../../../../hooks/api/tickets/useShowTicket';
import {
	LoadingSpin,
	openSuccessNotification,
	ChatInterface,
} from '../../../../../components';
import { translate } from '../../../../../helpers/translate';
import { tagColorsByStatus } from '../../../../../constants/tagsColorsByStatus';
import { useUpdateTicket } from '../../../../../hooks/api/tickets/useUpdateTicket';
import { handleError } from '../../../../../helpers';
import useAppContext from '../../../../../hooks/app/useAppContext';

export const ShowTicketsByAgentSide = () => {
	const { id } = useParams();
	const { userId } = useAppContext();

	const [isModalCancelOpen, setIsModalCancelOpen] = useState(false);
	const [isModalFinishOpen, setIsModalFinishOpen] = useState(false);

	const showModalCancel = () => {
		setIsModalCancelOpen(true);
	};

	const showModalFinish = () => {
		setIsModalFinishOpen(true);
	};

	const { data: ticket, isLoading: isLoadingTicket } = useShowTicket(
		id as string
	);

	const { mutateAsync: updateTicket, isLoading: isLoadingUpdate } =
		useUpdateTicket(id as string);

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
				'Email do agente  responsável',
				ticket.agent_email || <em>Não atribuído</em>,
			],
			['Criado em', new Date(ticket.created_at).toLocaleString('pt-BR')],
			['Atualizado em', new Date(ticket.updated_at).toLocaleString('pt-BR')],
		];
	}

	const handleAttendTicket = async () => {
		try {
			await updateTicket({
				status: 'in progress',
				agent_id: userId || '',
			});

			openSuccessNotification(
				`Agora você está atendendo o ticket id ${ticket?.id}.`
			);
		} catch (error) {
			handleError(error);
		}
	};

	const handleOkCancel = async () => {
		try {
			await updateTicket({
				status: 'cancelled',
			});
			openSuccessNotification('Ticket cancelado com sucesso.');
		} catch (error) {
			handleError(error);
		}

		setIsModalCancelOpen(false);
	};

	const handleOkFinish = async () => {
		try {
			await updateTicket({
				status: 'finished',
			});
			openSuccessNotification('Ticket solucionado com sucesso.');
		} catch (error) {
			handleError(error);
		}

		setIsModalCancelOpen(false);
	};

	const handleCancelModalFinish = () => {
		setIsModalFinishOpen(false);
	};

	const handleCancelModalCancel = () => {
		setIsModalCancelOpen(false);
	};

	return (
		<div style={{ display: 'flex', width: '100%', gap: '1rem' }}>
			<Card style={{ position: 'relative' }}>
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

				{ticket?.status === 'not viewed' ? (
					<Button
						onClick={handleAttendTicket}
						style={{ position: 'absolute', bottom: '1rem', left: '1rem' }}
						type="default"
					>
						{isLoadingUpdate ? <Spin /> : 'Atender este ticket'}
					</Button>
				) : ticket?.status === 'in progress' ? (
					<Button
						style={{
							position: 'absolute',
							bottom: '1rem',
							left: '1rem',
							backgroundColor: '#29ad55',
							color: '#fff',
						}}
						onClick={showModalFinish}
					>
						{isLoadingUpdate ? <Spin /> : 'Solucionar este ticket'}
					</Button>
				) : (
					<></>
				)}

				{ticket?.status === 'in progress' && (
					<Button
						style={{
							position: 'absolute',
							bottom: '1rem',
							right: '1rem',
						}}
						onClick={showModalCancel}
						danger
					>
						{isLoadingUpdate ? <Spin /> : 'Cancelar este ticket'}
					</Button>
				)}
			</Card>

			<ChatInterface
				disabled={ticket?.status !== 'in progress'}
				ticketId={ticket?.id || ''}
			/>

			<Modal
				title="Cuidado!"
				open={isModalCancelOpen}
				centered
				onOk={handleOkCancel}
				onCancel={handleCancelModalCancel}
			>
				<Typography>
					Tem certeza que deseja cancelar o atendimento deste ticket?
				</Typography>
			</Modal>

			<Modal
				title="Confirmação"
				open={isModalFinishOpen}
				centered
				onOk={handleOkFinish}
				onCancel={handleCancelModalFinish}
			>
				<Typography>
					Tem certeza que deseja finalizar o atendimento deste ticket?
				</Typography>
			</Modal>
		</div>
	);
};
