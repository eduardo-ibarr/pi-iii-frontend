import { Button, Modal, Table, Tag, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react';
import {
	SearchOutlined,
	DeleteOutlined,
	CheckCircleOutlined,
	ClockCircleOutlined,
} from '@ant-design/icons';
import { useListAgents } from '../../../../hooks/api/agents/useListAgents';
import { IAgent } from '../../../../interfaces/modules';
import { useNavigate } from 'react-router';
import { LoadingSpin } from '../../../../components/LoadingSpin';
import Typography from 'antd/es/typography/Typography';
import { useDeleteAgent } from '../../../../hooks/api/agents/useDeleteAgent';
import { handleError } from '../../../../helpers/handleError';
import { Link } from 'react-router-dom';

interface DataType {
	key: React.Key;
	name: string;
	email: string;
	createdAt: string;
	moreInfo: string;
}

export const ListAgents = () => {
	const history = useNavigate();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [idAgentToDelete, setIdAgentToDelete] = useState('');

	const { data: agents, isLoading: isLoadingList } = useListAgents();
	const { mutateAsync: deleteAgent } = useDeleteAgent();

	const handleShowMoreInfo = (id: string) => {
		history(`/app/agentes/${id}`);
	};

	const showModal = (id: string) => {
		setIdAgentToDelete(id);
		setIsModalOpen(true);
	};

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

	const sortAgentsByName = (data: DataType[]): DataType[] => {
		return data.sort((a, b) => {
			const nameA = a.name.toLowerCase();
			const nameB = b.name.toLowerCase();

			if (nameA < nameB) {
				return -1;
			}
			if (nameA > nameB) {
				return 1;
			}
			return 0;
		});
	};

	const data: DataType[] = (agents as IAgent[]).map((agent, i) => ({
		key: i,
		name: agent.name,
		email: agent.email,
		status: agent.available,
		createdAt: new Date(agent.created_at).toLocaleDateString('pt-BR'),
		moreInfo: agent.id,
	}));

	const dataSorted = sortAgentsByName(data);

	const handleOk = async () => {
		try {
			await deleteAgent(idAgentToDelete);
		} catch (error) {
			handleError(error);
		}

		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	return (
		<>
			<div style={{ textAlign: 'right', marginRight: '10px' }}>
				<Link to="/app/agentes/novo">
					<Button type="primary" style={{ marginBottom: '20px' }}>
						Criar novo agente
					</Button>
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
				<Typography>Tem certeza de que deseja excluir esse agente?</Typography>
			</Modal>
		</>
	);
};
