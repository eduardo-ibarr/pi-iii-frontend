/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable indent */
import { Button, Input, Select, Tag, Tooltip, Typography } from 'antd';
import React, { useState } from 'react';
import { LoadingSpin } from '../../../../../components';
import { translate } from '../../../../../helpers/';
import { useNavigate } from 'react-router';
import { useQueryClient } from 'react-query';
import { tagColorsByStatus } from '../../../../../constants/tagsColorsByStatus';
import { useListTickets } from '../../../../../hooks/api/tickets/useListTickets';
import Table, { ColumnsType } from 'antd/es/table';
import { SearchOutlined } from '@ant-design/icons';
import { TTicketStatus } from '../../../../../types/TTicketStatus';

interface DataType {
	key: React.Key;
	status: string;
	subject: string;
}

const filterOptions = [
	{ value: 'subject', label: 'Assunto' },
	{ value: 'requester', label: 'Nome do Requisitante' },
];

type TFilterOptions = 'requester' | 'subject';

type TFilterData = {
	type: TFilterOptions;
	value: string;
};

export default function ListTicketsByAdminSide() {
	const queryClient = useQueryClient();

	const history = useNavigate();

	const [filterData, setFilterData] = useState<TFilterData>({
		type: 'subject',
		value: '',
	});

	const { data: tickets, isLoading } = useListTickets();

	const ticketsFiltered = () => {
		if (filterData.value.length > 0 && tickets) {
			const filterFunctions = {
				subject: () => {
					return tickets.filter((ticket) =>
						ticket.subject
							.toLowerCase()
							.includes(filterData.value.toLowerCase())
					);
				},
				requester: () => {
					return tickets.filter((ticket) =>
						ticket.requester_name
							.toLowerCase()
							.includes(filterData.value.toLowerCase())
					);
				},
			};

			return filterFunctions[filterData.type]();
		}

		return [];
	};

	if (isLoading) {
		return <LoadingSpin />;
	}

	const handleShowTicket = (id: string) => {
		queryClient.invalidateQueries();
		history(`/app/admin/tickets/${id}`);
	};

	if (!tickets) {
		return null;
	}

	const data: DataType[] =
		ticketsFiltered().length > 0
			? ticketsFiltered().map((ticket, i) => ({
					status: ticket.status,
					subject: ticket.subject,
					requester: ticket.requester_name,
					createdAt: new Date(ticket.created_at).toLocaleString('pt-BR'),
					moreInfo: ticket.id,
					key: i,
			  }))
			: filterData.value && ticketsFiltered().length === 0
			? []
			: tickets.map((ticket, i) => ({
					status: ticket.status,
					subject: ticket.subject,
					requester: ticket.requester_name,
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
			title: 'Requisitante',
			width: '300px',
			dataIndex: 'requester',
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

	const handleChangeFilterType = (type: TFilterOptions) => {
		setFilterData((previous) => ({ ...previous, value: '', type }));
	};

	const handleChangeFilterValue = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setFilterData((previous) => ({ ...previous, value: event.target.value }));
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
					<Typography>Buscar por</Typography>

					<Select
						defaultValue="subject"
						onChange={handleChangeFilterType}
						style={{ width: '190px' }}
						options={filterOptions}
					/>

					<Input
						onChange={handleChangeFilterValue}
						style={{ width: '350px', height: '32px' }}
						placeholder={`Digite aqui o ${
							filterData.type === 'subject' ? 'assunto' : 'nome do requisitante'
						} para a busca...`}
					/>
				</div>
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
