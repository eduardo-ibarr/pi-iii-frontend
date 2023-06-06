import { List, Tag, Typography } from 'antd';
import React, { ReactNode } from 'react';
import { useListTickets } from '../../../../../hooks/api/tickets/useListTickets';
import { LoadingSpin } from '../../../../../components';
import { translate } from '../../../../../helpers/';
import { useNavigate } from 'react-router';
import { useQueryClient } from 'react-query';
import { TagColorsByStatus } from '../../../../../constants/enums/TagsColorsByStatus';

export default function ListTicketsByAgentSide() {
	const queryClient = useQueryClient();

	const history = useNavigate();

	const { data: tickets, isLoading } = useListTickets();

	if (isLoading) {
		return <LoadingSpin />;
	}

	const handleShowTicket = (id: string) => {
		queryClient.invalidateQueries();
		history(`/app/agentes/tickets/${id}`);
	};

	const data = tickets?.map((ticket, i) => (
		<>
			{ticket.status === 'not viewed' ? (
				<div style={{ display: 'flex' }}>
					<Typography
						style={{
							marginRight: '0.8rem',
							padding: '0 10px',
							paddingTop: '1px',
							borderRadius: '5px',
							color: '#fff',
							backgroundColor: '#e04f4f',
							fontSize: '12px',
						}}
					>
						Novo!
					</Typography>
					<Tag color={TagColorsByStatus[ticket.status]}>
						{translate({ message: ticket.status, type: 'status' })}
					</Tag>
					<a onClick={() => handleShowTicket(ticket.id)}>{ticket.subject}</a>
				</div>
			) : (
				<div key={i}>
					<Tag color={TagColorsByStatus[ticket.status]}>
						{translate({ message: ticket.status, type: 'status' })}
					</Tag>
					<a onClick={() => handleShowTicket(ticket.id)}>{ticket.subject}</a>
				</div>
			)}
		</>
	));

	return (
		<List
			bordered
			dataSource={data}
			renderItem={(item: ReactNode) => <List.Item>{item}</List.Item>}
		/>
	);
}
