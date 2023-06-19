/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable indent */
import { Button, Input, Modal, Select, Table, Tag, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useMemo, useState } from 'react';
import {
	SearchOutlined,
	DeleteOutlined,
	CheckCircleOutlined,
	ClockCircleOutlined,
} from '@ant-design/icons';
import { useListAgents, useDeleteAgent } from '../../../../hooks/api/agents';
import { IAgent } from '../../../../interfaces/modules';
import { useNavigate } from 'react-router';
import { LoadingSpin } from '../../../../components/LoadingSpin';
import Typography from 'antd/es/typography/Typography';
import { handleError } from '../../../../helpers/handleError';
import { Link } from 'react-router-dom';
import { openSuccessNotification } from '../../../../components';
import { sortByName } from '../../../../helpers';

interface DataType {
	key: React.Key;
	name: string;
	email: string;
	createdAt: string;
	moreInfo: string;
}

const filterOptions = [
	{ value: 'name', label: 'Nome' },
	{ value: 'email', label: 'Email' },
];

type TFilterOptions = 'email' | 'name';

type TFilterData = {
	type: TFilterOptions;
	value: string;
};

export const ListAgents = () => {
	const history = useNavigate();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [idAgentToDelete, setIdAgentToDelete] = useState('');

	const { data: agents, isLoading: isLoadingList } = useListAgents();
	const { mutateAsync: deleteAgent } = useDeleteAgent();

	const [filterData, setFilterData] = useState<TFilterData>({
		type: 'name',
		value: '',
	});

	const handleShowMoreInfo = (id: string) => {
		history(`/app/admin/agentes/${id}`);
	};

	const showModal = (id: string) => {
		setIdAgentToDelete(id);
		setIsModalOpen(true);
	};

	const agentsFiltered = useMemo(() => {
		if (filterData.value.length > 0 && agents) {
			const filterFunctions = {
				name: () => {
					return agents.filter((agent) =>
						agent.name.toLowerCase().includes(filterData.value.toLowerCase())
					);
				},
				email: () => {
					return agents.filter((agent) =>
						agent.email.toLowerCase().includes(filterData.value.toLowerCase())
					);
				},
			};

			return filterFunctions[filterData.type]();
		}

		return [];
	}, [filterData]);

	const columns: ColumnsType<DataType> = [
		{
			title: 'Nome',
			dataIndex: 'name',
		},
		{
			title: 'Status',
			dataIndex: 'status',
			render: (available) =>
				available ? (
					<Tag icon={<CheckCircleOutlined />} color="success">
						Online
					</Tag>
				) : (
					<Tag icon={<ClockCircleOutlined />} color="default">
						Offline
					</Tag>
				),
		},
		{
			title: 'Email',
			dataIndex: 'email',
		},
		{
			title: 'Criado em',
			dataIndex: 'createdAt',
		},
		{
			title: 'Ações',
			align: 'center',
			dataIndex: 'moreInfo',
			render: (id) => ({
				children: (
					<>
						<Tooltip title="Mais informações">
							<Button
								type="primary"
								style={{ marginRight: '10px' }}
								shape="circle"
								onClick={() => handleShowMoreInfo(id)}
								icon={<SearchOutlined />}
							/>
						</Tooltip>
						<Tooltip title="Excluir">
							<Button
								type="primary"
								danger
								shape="circle"
								onClick={() => showModal(id)}
								icon={<DeleteOutlined />}
							/>
						</Tooltip>
					</>
				),
			}),
		},
	];

	if (isLoadingList) {
		return <LoadingSpin />;
	}

	if (!agents) {
		return (
			<div
				style={{
					height: '100%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Typography>Sem dados na base.</Typography>
			</div>
		);
	}

	const data: DataType[] =
		agentsFiltered.length > 0
			? agentsFiltered.map((agent, i) => ({
					key: i,
					name: agent.name,
					email: agent.email,
					status: agent.available,
					createdAt: new Date(agent.created_at).toLocaleString('pt-BR'),
					moreInfo: agent.id,
			  }))
			: filterData.value && agentsFiltered.length === 0
			? []
			: (agents as IAgent[]).map((agent, i) => ({
					key: i,
					name: agent.name,
					email: agent.email,
					status: agent.available,
					createdAt: new Date(agent.created_at).toLocaleString('pt-BR'),
					moreInfo: agent.id,
			  }));

	const dataSorted = sortByName(data);

	const handleOk = async () => {
		try {
			await deleteAgent(idAgentToDelete);

			openSuccessNotification('Agente excluído com sucesso.');
		} catch (error) {
			handleError(error);
		}

		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

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
						defaultValue="name"
						onChange={handleChangeFilterType}
						style={{ width: '100px' }}
						options={filterOptions}
					/>

					<Input
						onChange={handleChangeFilterValue}
						style={{ width: '300px', height: '32px' }}
						placeholder={`Digite aqui o ${
							filterData.type === 'email' ? 'email' : 'nome'
						} para a busca...`}
					/>
				</div>

				<Link to="/app/admin/agentes/novo">
					<Button type="primary">Criar novo agente</Button>
				</Link>
			</div>

			<Table
				columns={columns}
				dataSource={dataSorted}
				pagination={{
					pageSize: 5,
				}}
			/>

			<Modal
				title="Cuidado!"
				open={isModalOpen}
				centered
				onOk={handleOk}
				onCancel={handleCancel}
			>
				<Typography>
					Tem certeza que deseja excluir definitivamente esse agente?
				</Typography>
			</Modal>
		</>
	);
};
