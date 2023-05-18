import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import useAppContext from '../../hooks/app/useAppContext';

import {
	CreateAgent,
	ListAgents,
	ShowAgent,
	UpdateAgent,
} from '../../pages/private/agents';

import {
	CreateCategory,
	ListCategories,
	ShowCategory,
	UpdateCategory,
} from '../../pages/private/categories';

import {
	CreateRequester,
	ListRequesters,
	ShowRequester,
	UpdateRequester,
} from '../../pages/private/requesters';

import { PrivateBase } from '../../pages/private/base';

export const PrivateRoutes = () => {
	const { isLoggedIn, typeOfUser } = useAppContext();

	if (!isLoggedIn) {
		return <Navigate to="/login" />;
	}

	if (!typeOfUser) {
		return null;
	}

	if (typeOfUser === 'agent') {
		return (
			<PrivateBase>
				<Routes>
					<Route path="/agentes" element={<ListAgents />} />
					<Route path="/agentes/novo" element={<CreateAgent />} />
					<Route path="/agentes/:id" element={<ShowAgent />} />
					<Route path="/agentes/:id/atualizar" element={<UpdateAgent />} />

					<Route path="/categorias" element={<ListCategories />} />
					<Route path="/categorias/nova" element={<CreateCategory />} />
					<Route path="/categorias/:id" element={<ShowCategory />} />
					<Route
						path="/categorias/:id/atualizar"
						element={<UpdateCategory />}
					/>
				</Routes>
			</PrivateBase>
		);
	}

	if (typeOfUser === 'requester') {
		return (
			<PrivateBase>
				<Routes>
					<Route path="/requisitantes" element={<ListRequesters />} />
					<Route path="/requisitantes/novo" element={<CreateRequester />} />
					<Route path="/requisitantes/:id" element={<ShowRequester />} />
					<Route
						path="/requisitantes/:id/atualizar"
						element={<UpdateRequester />}
					/>
				</Routes>
			</PrivateBase>
		);
	}

	return <Navigate to="/404" replace />;
};
