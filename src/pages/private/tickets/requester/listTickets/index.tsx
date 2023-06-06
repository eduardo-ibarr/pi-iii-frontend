import { Button, List, Tag } from 'antd';
import React, { ReactNode } from 'react';
import useAppContext from '../../../../../hooks/app/useAppContext';
import { useListTicketsByRequester } from '../../../../../hooks/api/tickets/useListTicketsByRequester';
import { LoadingSpin } from '../../../../../components';
import { translate } from '../../../../../helpers/';
import { useNavigate } from 'react-router';
import { useQueryClient } from 'react-query';
import { TagColorsByStatus } from '../../../../../constants/enums/TagsColorsByStatus';
import { Link } from 'react-router-dom';

export default function ListTicketsByRequesterSide() {
	const { userId } = useAppContext();
	const queryClient = useQueryClient();

	const history = useNavigate();

	const { data: tickets, isLoading } = useListTicketsByRequester(userId || '');

	if (isLoading) {
		return <LoadingSpin />;
	}

	const handleShowTicket = (id: string) => {
		queryClient.invalidateQueries();
		history(`/app/requisitantes/tickets/${id}`);
	};

	const data = tickets?.map((ticket, i) => (
		<div key={i}>
			<Tag color={TagColorsByStatus[ticket.status]}>
				{translate({ message: ticket.status, type: 'status' })}
			</Tag>
			<a onClick={() => handleShowTicket(ticket.id)}>{ticket.subject}</a>
		</div>
	));

	return (
		<>
			<div style={{ textAlign: 'right', marginRight: '10px' }}>
				<Link to="/app/requisitantes/tickets/novo">
					<Button type="primary" style={{ marginBottom: '20px' }}>
						Criar novo ticket
					</Button>
				</Link>
			</div>
			<List
				bordered
				dataSource={data}
				renderItem={(item: ReactNode) => <List.Item>{item}</List.Item>}
			/>
		</>
	);
}
