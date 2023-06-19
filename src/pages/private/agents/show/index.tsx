import { Card, Descriptions, Tag } from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import React from 'react';
import { useShowAgent } from '../../../../hooks/api/agents';
import { useParams } from 'react-router';
import { LoadingSpin } from '../../../../components/LoadingSpin';
import Title from 'antd/es/typography/Title';

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
			['Função', 'Agente de Suporte'],
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
			['Criado em', new Date(agent.created_at).toLocaleString('pt-BR')],
			['Atualizado em', new Date(agent.updated_at).toLocaleString('pt-BR')],
		];
	}

	return (
		<Card>
			<Title level={4} style={{ marginBottom: '20px' }}>
				Dados da sua conta
			</Title>
			<Descriptions column={1}>
				{agentInfos.map(([label, data], i) => (
					<Descriptions.Item key={i} label={label}>
						{data}
					</Descriptions.Item>
				))}
			</Descriptions>
		</Card>
	);
};
