import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { LoginPage } from '../../pages/public/login';
import { PublicBase } from '../../pages/public/base';

export const PublicRoutes = () => {
	return (
		<PublicBase>
			<Routes>
				<Route path="/login" element={<LoginPage />} />
			</Routes>
		</PublicBase>
	);
};
