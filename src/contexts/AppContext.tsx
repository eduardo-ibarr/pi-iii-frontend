import React, { createContext, useEffect, useState } from 'react';
import { ParentPage } from '../interfaces/parentPage';
import { clearAccessToken, getAccessToken } from '../helpers/auth';
import { TUser } from '../types/TUser';

interface IAppContext {
	isLoggedIn: boolean;
	userEmail: string | null;
	userId: string | null;
	typeOfUser: TUser;
	setLoggedIn: (isLoggedIn: boolean) => void;
	setUserEmail: (email: string) => void;
	clearUserData: () => void;
}

const AppContext = createContext<IAppContext>({} as IAppContext);

export default AppContext;

export const AppProvider = ({ children }: ParentPage) => {
	const [isLoggedIn, setLoggedIn] = useState<boolean>(() => {
		const data = getAccessToken();
		return !!data;
	});

	const [typeOfUser, setTypeOfUser] = useState<TUser>(() => {
		const data = getAccessToken();
		return data?.typeOfUser as TUser;
	});

	const [userId, setUserId] = useState<TUser | string>(() => {
		const data = getAccessToken();
		return data?.userId || '';
	});

	const [userEmail, setUserEmail] = useState<string | null>(null);

	const clearUserData = () => {
		clearAccessToken();
		setTypeOfUser('' as TUser);
		setUserId('');
		setUserEmail(null);
	};

	useEffect(() => {
		if (isLoggedIn) {
			setTypeOfUser(() => {
				const data = getAccessToken();
				return data?.typeOfUser as TUser;
			});

			setUserId(() => {
				const data = getAccessToken();
				return data?.userId || '';
			});
		}
	}, [isLoggedIn]);

	return (
		<AppContext.Provider
			value={{
				isLoggedIn,
				typeOfUser,
				userEmail,
				userId,
				setLoggedIn,
				setUserEmail,
				clearUserData,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
