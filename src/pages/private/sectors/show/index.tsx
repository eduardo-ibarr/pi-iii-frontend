import { Button, Card, Descriptions } from 'antd';
import React from 'react';
import { useParams } from 'react-router';
import { LoadingSpin } from '../../../../components/LoadingSpin';
import { Link } from 'react-router-dom';
import Title from 'antd/es/typography/Title';
import { useShowSector } from '../../../../hooks/api/sectors';

export const ShowSector = () => {
	const { id } = useParams();

	const { data: sector, isLoading } = useShowSector(id as string);

	if (isLoading) {
		return <LoadingSpin />;
	}

	let sectorInfos: [string, string | JSX.Element][] = [];

	if (sector) {
		sectorInfos = [
			['Nome', sector.name],
			['Criado em', new Date(sector.created_at).toLocaleString('pt-BR')],
			['Atualizado em', new Date(sector.updated_at).toLocaleString('pt-BR')],
		];
	}

	return (
		<>
			<div style={{ textAlign: 'right', marginRight: '10px' }}>
				<Link to={`/app/admin/setores/${sector?.id}/atualizar`}>
					<Button type="primary" style={{ marginBottom: '20px' }}>
						Atualizar dados
					</Button>
				</Link>
			</div>

			<Card>
				<Title level={4} style={{ marginBottom: '20px' }}>
					Informações sobre o Setor
				</Title>
				<Descriptions column={1}>
					{sectorInfos.map(([label, data], i) => (
						<Descriptions.Item key={i} label={label}>
							{data}
						</Descriptions.Item>
					))}
				</Descriptions>
			</Card>
		</>
	);
};
