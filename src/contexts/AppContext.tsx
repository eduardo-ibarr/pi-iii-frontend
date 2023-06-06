import React, { createContext, useState } from 'react';
import { ParentPage } from '../interfaces/parentPage';
import { getAccessToken } from '../helpers/auth';
import { TUser } from '../types/TUser';

interface IAppContext {
	isLoggedIn: boolean;
	userEmail: string | null;
	userId: string | null;
	typeOfUser: TUser | string;
	setLoggedIn: (isLoggedIn: boolean) => void;
	setUserEmail: (typeOfUser: string) => void;
}

const AppContext = createContext<IAppContext>({} as IAppContext);

export default AppContext;

export const AppProvider = ({ children }: ParentPage) => {
	const [isLoggedIn, setLoggedIn] = useState<boolean>(() => {
		const data = getAccessToken();
		return !!data;
	});

	const [typeOfUser] = useState<TUser | string>(() => {
		const data = getAccessToken();
		return data?.typeOfUser || '';
	});

	const [userId] = useState<TUser | string>(() => {
		const data = getAccessToken();
		return data?.userId || '';
	});

	const [userEmail, setUserEmail] = useState<string | null>(null);

	return (
		<AppContext.Provider
			value={{
				isLoggedIn,
				typeOfUser,
				userEmail,
				userId,
				setLoggedIn,
				setUserEmail,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
