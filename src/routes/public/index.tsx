import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import { LoginPage } from '../../pages/public/login';
import { PublicBase } from '../../pages/public/base';
import useAppContext from '../../hooks/app/useAppContext';

export const PublicRoutes = () => {
	const { isLoggedIn } = useAppContext();
	const navigate = useNavigate();

	useEffect(() => {
		if (isLoggedIn) {
			navigate(-1);
		}
	}, [isLoggedIn]);

	return (
		<PublicBase>
			<Routes>
				<Route path="/login" element={<LoginPage />} />
			</Routes>
		</PublicBase>
	);
};
