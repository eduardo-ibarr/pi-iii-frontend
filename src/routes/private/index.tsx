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

	return (
		<>
			{typeOfUser === 'agent' ? (
				<PrivateBase>
					<Routes>
						<Route path="/agentes" element={<ListAgents />} />
						<Route path="/agentes/novo" element={<CreateAgent />} />
						<Route path="/agentes/:id" element={<ShowAgent />} />
						<Route path="/agentes/:id/atualizar" element={<UpdateAgent />} />
					</Routes>
				</PrivateBase>
			) : typeOfUser === 'requester' ? (
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
			) : (
				<Routes>
					<Route path="/*" element={<Navigate to="/404" replace />} />
				</Routes>
			)}
		</>
	);
};
