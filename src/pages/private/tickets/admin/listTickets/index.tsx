import { List, Tag } from 'antd';
import React, { ReactNode } from 'react';
import { LoadingSpin } from '../../../../../components';
import { translate } from '../../../../../helpers/';
import { useNavigate } from 'react-router';
import { useQueryClient } from 'react-query';
import { tagColorsByStatus } from '../../../../../constants/tagsColorsByStatus';
import { useListTickets } from '../../../../../hooks/api/tickets/useListTickets';

export default function ListTicketsByAdminSide() {
	const queryClient = useQueryClient();

	const history = useNavigate();

	const { data: tickets, isLoading } = useListTickets();

	if (isLoading) {
		return <LoadingSpin />;
	}

	const handleShowTicket = (id: string) => {
		queryClient.invalidateQueries();
		history(`/app/admin/tickets/${id}`);
	};

	const data = tickets?.map((ticket, i) => (
		<div key={i}>
			<Tag color={tagColorsByStatus[ticket.status]}>
				{translate({ message: ticket.status, type: 'status' })}
			</Tag>
			<a onClick={() => handleShowTicket(ticket.id)}>{ticket.subject}</a>
		</div>
	));

	return (
		<List
			bordered
			dataSource={data}
			renderItem={(item: ReactNode) => <List.Item>{item}</List.Item>}
		/>
	);
}
