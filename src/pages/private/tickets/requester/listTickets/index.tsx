/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable indent */
import { Button, Input, Tag, Tooltip } from 'antd';
import React, { useMemo, useState } from 'react';
import { LoadingSpin } from '../../../../../components';
import { translate } from '../../../../../helpers/';
import { useNavigate } from 'react-router';
import { useQueryClient } from 'react-query';
import { tagColorsByStatus } from '../../../../../constants/tagsColorsByStatus';
import Table, { ColumnsType } from 'antd/es/table';
import { SearchOutlined } from '@ant-design/icons';
import { TTicketStatus } from '../../../../../types/TTicketStatus';
import { Link } from 'react-router-dom';
import { useListTicketsByRequester } from '../../../../../hooks/api/tickets/useListTicketsByRequester';
import useAppContext from '../../../../../hooks/app/useAppContext';

interface DataType {
	key: React.Key;
	status: string;
	subject: string;
}

export default function ListTicketsByRequesterSide() {
	const queryClient = useQueryClient();
	const { userId } = useAppContext();

	const history = useNavigate();

	const [filterValue, setFilterValue] = useState('');

	const { data: tickets, isLoading } = useListTicketsByRequester(
		userId as string
	);

	const ticketsFiltered = useMemo(() => {
		if (filterValue.length > 0 && tickets) {
			return tickets.filter((ticket) =>
				ticket.subject.toLowerCase().includes(filterValue.toLowerCase())
			);
		}

		return [];
	}, [filterValue]);

	if (isLoading) {
		return <LoadingSpin />;
	}

	const handleShowTicket = (id: string) => {
		queryClient.invalidateQueries();
		history(`/app/requisitantes/tickets/${id}`);
	};

	if (!tickets) {
		return null;
	}

	const data: DataType[] =
		ticketsFiltered.length > 0
			? ticketsFiltered.map((ticket, i) => ({
					status: ticket.status,
					subject: ticket.subject,
					createdAt: new Date(ticket.created_at).toLocaleString('pt-BR'),
					moreInfo: ticket.id,
					key: i,
			  }))
			: filterValue && ticketsFiltered.length === 0
			? []
			: tickets.map((ticket, i) => ({
					status: ticket.status,
					subject: ticket.subject,
					createdAt: new Date(ticket.created_at).toLocaleString('pt-BR'),
					moreInfo: ticket.id,
					key: i,
			  }));

	const columns: ColumnsType<DataType> = [
		{
			title: 'Status',
			dataIndex: 'status',
			width: '150px',
			render: (status: TTicketStatus) => {
				return (
					<Tag color={tagColorsByStatus[status]}>
						{translate({ message: status, type: 'status' })}
					</Tag>
				);
			},
		},
		{
			title: 'Assunto',
			dataIndex: 'subject',
		},
		{
			title: 'Criado em',
			width: '180px',
			dataIndex: 'createdAt',
		},
		{
			title: 'Ações',
			align: 'center',
			dataIndex: 'moreInfo',
			render: (id) => ({
				children: (
					<Tooltip title="Mais informações">
						<Button
							type="primary"
							shape="circle"
							onClick={() => handleShowTicket(id)}
							icon={<SearchOutlined />}
						/>
					</Tooltip>
				),
			}),
		},
	];

	const handleChangeFilterValue = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setFilterValue(event.target.value);
	};

	return (
		<>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					marginRight: '10px',
					marginBottom: '20px',
				}}
			>
				<div
					style={{
						display: 'flex',
						gap: '15px',
						alignItems: 'center',
						marginLeft: '5px',
					}}
				>
					<Input
						onChange={handleChangeFilterValue}
						style={{ width: '350px', height: '32px' }}
						placeholder="Buscar por assunto..."
					/>
				</div>

				<Link to="/app/requisitantes/tickets/novo">
					<Button type="primary">Criar novo ticket</Button>
				</Link>
			</div>

			<Table
				columns={columns}
				dataSource={data}
				pagination={{
					pageSize: 5,
				}}
			/>
		</>
	);
}
