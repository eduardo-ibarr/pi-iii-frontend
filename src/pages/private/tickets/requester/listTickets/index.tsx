import { List, Tag, Typography } from 'antd';
import React, { ReactNode } from 'react';
import useAppContext from '../../../../../hooks/app/useAppContext';
import { useListTicketsByRequester } from '../../../../../hooks/api/tickets/useListTicketsByRequester';
import { LoadingSpin } from '../../../../../components';
import { translateStatusMessage } from '../../../../../helpers/translateStatusMessage';
import { useNavigate } from 'react-router';

export default function ListTicketsByRequesterSide() {
	const { userId } = useAppContext();

	const history = useNavigate();

	const { data: tickets, isLoading } = useListTicketsByRequester(userId || '');

	if (isLoading) {
		return <LoadingSpin />;
	}

	const handleShowTicket = (id: string) => {
		history(`/app/requisitantes/tickets/${id}`);
	};

	const data = tickets?.map((ticket, i) => (
		<div key={i}>
			<Tag color="default">{translateStatusMessage(ticket.status)}</Tag>
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
