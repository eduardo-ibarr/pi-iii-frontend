import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PublicRoutes } from './routes/public';
import { PrivateRoutes } from './routes/private';
import { ContextsProvider } from './contexts/provider';

const App = () => {
	return (
		<ContextsProvider>
			<Router>
				<Routes>
					<Route path="*" element={<PublicRoutes />} />
					<Route path="/app/*" element={<PrivateRoutes />} />
				</Routes>
			</Router>
		</ContextsProvider>
	);
};

export default App;
