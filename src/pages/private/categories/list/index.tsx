import { Button, Modal, Table, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react';
import { SearchOutlined, DeleteOutlined } from '@ant-design/icons';
import { ICategory } from '../../../../interfaces/modules';
import { useNavigate } from 'react-router';
import { LoadingSpin } from '../../../../components/LoadingSpin';
import Typography from 'antd/es/typography/Typography';
import { handleError } from '../../../../helpers/handleError';
import { Link } from 'react-router-dom';
import { openSuccessNotification } from '../../../../components';
import {
	useListCategories,
	useDeleteCategory,
} from '../../../../hooks/api/categories';

interface DataType {
	key: React.Key;
	name: string;
	createdAt: string;
	moreInfo: string;
}

export const ListCategories = () => {
	const history = useNavigate();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [idCategoryToDelete, setIdCategoryToDelete] = useState('');

	const { data: categories, isLoading: isLoadingList } = useListCategories();
	const { mutateAsync: deleteCategory } = useDeleteCategory();

	const handleShowMoreInfo = (id: string) => {
		history(`/app/categorias/${id}`);
	};

	const showModal = (id: string) => {
		setIdCategoryToDelete(id);
		setIsModalOpen(true);
	};

	const columns: ColumnsType<DataType> = [
		{
			title: 'Nome',
			dataIndex: 'name',
		},
		{
			title: 'Criada em',
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

	const data: DataType[] = (categories as ICategory[]).map((agent, i) => ({
		key: i,
		name: agent.name,
		createdAt: new Date(agent.created_at).toLocaleString('pt-BR'),
		moreInfo: agent.id,
	}));

	const dataSorted = sortAgentsByName(data);

	const handleOk = async () => {
		try {
			await deleteCategory(idCategoryToDelete);

			openSuccessNotification('Categoria excluída com sucesso.');
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
				<Link to="/app/categorias/nova">
					<Button type="primary" style={{ marginBottom: '20px' }}>
						Criar nova categoria
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
				<Typography>Tem certeza que deseja excluir essa categoria?</Typography>
			</Modal>
		</>
	);
};
