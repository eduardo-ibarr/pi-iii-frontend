import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { PrivateBase } from '../../pages/private/Base';
import { CreateAgent } from '../../pages/private/agents/create';
import useAppContext from '../../hooks/app/useAppContext';
import { CreateRequester } from '../../pages/private/requesters/create';

export const PrivateRoutes = () => {
	const { isLoggedIn } = useAppContext();

	return (
		<>
			{isLoggedIn ? (
				<PrivateBase>
					<Routes>
						<Route path="/agentes/novo" element={<CreateAgent />} />
						<Route path="/requisitantes/novo" element={<CreateRequester />} />
					</Routes>
				</PrivateBase>
			) : (
				<Navigate to="/login" />
			)}
		</>
	);
};
