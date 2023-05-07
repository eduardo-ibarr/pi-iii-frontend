import { Button, Modal, Table, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react';
import { SearchOutlined, DeleteOutlined } from '@ant-design/icons';
import { useListAgents } from '../../../../hooks/api/agents/useListAgents';
import { IAgent } from '../../../../interfaces/modules';
import { useNavigate } from 'react-router';
import { LoadingSpin } from '../../../../components/LoadingSpin';
import Typography from 'antd/es/typography/Typography';

interface DataType {
	key: React.Key;
	name: string;
	email: string;
	createdAt: string;
	moreInfo: string;
}

export const ListAgents = () => {
	const { data: agents, isLoading } = useListAgents();
	const history = useNavigate();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [idAgentToDelete, setIdAgentToDelete] = useState('');

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

	if (isLoading) {
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

	const data: DataType[] = (agents as IAgent[]).map((agent, i) => ({
		key: i,
		name: agent.name,
		email: agent.email,
		createdAt: new Date(agent.created_at).toLocaleDateString('pt-BR'),
		moreInfo: agent.id,
	}));

	const handleOk = () => {
		console.log(idAgentToDelete);
		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	return (
		<>
			<Table
				columns={columns}
				dataSource={data}
				pagination={{
					pageSize: 10,
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
