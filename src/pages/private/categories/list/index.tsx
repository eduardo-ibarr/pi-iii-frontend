/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable indent */
import { Button, Input, Modal, Table, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useMemo, useState } from 'react';
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
import { sortByName } from '../../../../helpers';

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

	const [filterValue, setFilterValue] = useState('');

	const categoriesFiltered = useMemo(() => {
		if (filterValue.length > 0 && categories) {
			return categories.filter((category) =>
				category.name.toLowerCase().includes(filterValue.toLowerCase())
			);
		}

		return [];
	}, [filterValue]);

	const handleShowMoreInfo = (id: string) => {
		history(`/app/admin/categorias/${id}`);
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

	const data: DataType[] =
		categoriesFiltered.length > 0
			? categoriesFiltered.map((category, i) => ({
					key: i,
					name: category.name,
					createdAt: new Date(category.created_at).toLocaleString('pt-BR'),
					moreInfo: category.id,
			  }))
			: filterValue && categoriesFiltered.length === 0
			? []
			: (categories as ICategory[]).map((category, i) => ({
					key: i,
					name: category.name,
					createdAt: new Date(category.created_at).toLocaleString('pt-BR'),
					moreInfo: category.id,
			  }));

	const dataSorted = sortByName(data);

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

	const handleChangeFilterValue = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setFilterValue(event.target.value);
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
					<Input
						onChange={handleChangeFilterValue}
						style={{ width: '300px', height: '32px' }}
						placeholder="Buscar por nome..."
					/>
				</div>

				<Link to="/app/admin/categorias/nova">
					<Button type="primary">Criar nova categoria</Button>
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
					Tem certeza que deseja excluir definitivamente essa categoria?
				</Typography>
			</Modal>
		</>
	);
};
