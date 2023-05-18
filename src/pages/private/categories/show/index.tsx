import { Button, Card, Descriptions } from 'antd';
import React from 'react';
import { useParams } from 'react-router';
import { LoadingSpin } from '../../../../components/LoadingSpin';
import { Link } from 'react-router-dom';
import Title from 'antd/es/typography/Title';
import { useShowCategory } from '../../../../hooks/api/categories';

export const ShowCategory = () => {
	const { id } = useParams();

	const { data: category, isLoading } = useShowCategory(id as string);

	if (isLoading) {
		return <LoadingSpin />;
	}

	let categoryInfos: [string, string | JSX.Element][] = [];

	if (category) {
		categoryInfos = [
			['Nome', category.name],
			['Criado em', new Date(category.created_at).toLocaleString('pt-BR')],
			['Atualizado em', new Date(category.updated_at).toLocaleString('pt-BR')],
		];
	}

	return (
		<>
			<div style={{ textAlign: 'right', marginRight: '10px' }}>
				<Link to={`/app/categorias/${category?.id}/atualizar`}>
					<Button type="primary" style={{ marginBottom: '20px' }}>
						Atualizar dados
					</Button>
				</Link>
			</div>

			<Card>
				<Title level={3} style={{ marginBottom: '20px' }}>
					Informações da Categoria
				</Title>
				<Descriptions column={1}>
					{categoryInfos.map(([label, data], i) => (
						<Descriptions.Item key={i} label={label}>
							{data}
						</Descriptions.Item>
					))}
				</Descriptions>
			</Card>
		</>
	);
};
