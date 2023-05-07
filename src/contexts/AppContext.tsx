import React, { createContext, useState } from 'react';
import { ParentPage } from '../interfaces/parentPage';
import { getAccessToken } from '../helpers/auth';

interface IAppContext {
	isLoggedIn: boolean;
	userEmail: string;
	typeOfUser: string;
	setLoggedIn: (isLoggedIn: boolean) => void;
	setTypeOfUser: (typeOfUser: string) => void;
	setUserEmail: (typeOfUser: string) => void;
}

const AppContext = createContext<IAppContext>({} as IAppContext);

export default AppContext;

export const AppProvider = ({ children }: ParentPage) => {
	const [isLoggedIn, setLoggedIn] = useState(!!getAccessToken());
	const [typeOfUser, setTypeOfUser] = useState('');
	const [userEmail, setUserEmail] = useState('');

	return (
		<AppContext.Provider
			value={{
				isLoggedIn,
				setLoggedIn,
				typeOfUser,
				setTypeOfUser,
				setUserEmail,
				userEmail,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
