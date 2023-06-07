import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AppProvider } from './AppContext';
import { ParentPage } from '../interfaces/parentPage';
const queryClient = new QueryClient();

export const ContextsProvider = ({ children }: ParentPage) => {
	return (
		<QueryClientProvider client={queryClient}>
			<AppProvider>{children}</AppProvider>
		</QueryClientProvider>
	);
};
