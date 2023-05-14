import { Button, Card, Descriptions, Tag } from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import React from 'react';
import { useShowAgent } from '../../../../hooks/api/agents/useShowAgent';
import { useParams } from 'react-router';
import { LoadingSpin } from '../../../../components/LoadingSpin';
import { Link } from 'react-router-dom';

export const ShowAgent = () => {
	const { id } = useParams();

	const { data: agent, isLoading } = useShowAgent(id as string);

	if (isLoading) {
		return <LoadingSpin />;
	}

	let agentInfos: [string, string | JSX.Element][] = [];

	if (agent) {
		agentInfos = [
			['Nome', agent.name],
			['Email', agent.email],
			['Criado em', new Date(agent.created_at).toLocaleDateString('pt-BR')],
			[
				'Atualizado em',
				new Date(agent?.created_at).toLocaleDateString('pt-BR'),
			],
			[
				'Status',
				agent.available ? (
					<Tag icon={<CheckCircleOutlined />} color="success">
						Online
					</Tag>
				) : (
					<Tag icon={<ClockCircleOutlined />} color="default">
						Offline
					</Tag>
				),
			],
		];
	}

	return (
		<>
			<div style={{ textAlign: 'right', marginRight: '10px' }}>
				<Link to={`/app/agentes/${agent?.id}/atualizar`}>
					<Button type="primary" style={{ marginBottom: '20px' }}>
						Atualizar dados
					</Button>
				</Link>
			</div>

			<Card>
				<Descriptions title="Informações do Agente">
					{agentInfos.map(([label, data], i) => (
						<Descriptions.Item key={i} label={label}>
							{data}
						</Descriptions.Item>
					))}
				</Descriptions>
			</Card>
		</>
	);
};
