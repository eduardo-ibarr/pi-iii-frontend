import { Button, Card, Descriptions } from 'antd';
import React from 'react';
import { useParams } from 'react-router';
import { LoadingSpin } from '../../../../components/LoadingSpin';
import { Link } from 'react-router-dom';
import Title from 'antd/es/typography/Title';
import { useShowRequester } from '../../../../hooks/api/requesters';

export const ShowRequester = () => {
	const { id } = useParams();

	const { data: requester, isLoading } = useShowRequester(id as string);

	if (isLoading) {
		return <LoadingSpin />;
	}

	let requesterInfos: [string, string | JSX.Element][] = [];

	if (requester) {
		requesterInfos = [
			['Nome', requester.name],
			['Email', requester.email],
			['Função', 'Colaborador da Empresa / Requisitante de Suporte'],
			['Criado em', new Date(requester.created_at).toLocaleString('pt-BR')],
			['Atualizado em', new Date(requester.updated_at).toLocaleString('pt-BR')],
		];
	}

	return (
		<>
			<div style={{ textAlign: 'right', marginRight: '10px' }}>
				<Link to={`/app/admin/requisitantes/${requester?.id}/atualizar`}>
					<Button type="primary" style={{ marginBottom: '20px' }}>
						Atualizar dados
					</Button>
				</Link>
			</div>

			<Card>
				<Title level={4} style={{ marginBottom: '20px' }}>
					Dados da sua conta
				</Title>
				<Descriptions column={1}>
					{requesterInfos.map(([label, data], i) => (
						<Descriptions.Item key={i} label={label}>
							{data}
						</Descriptions.Item>
					))}
				</Descriptions>
			</Card>
		</>
	);
};
