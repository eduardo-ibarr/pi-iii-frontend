import React, { createContext, useState } from 'react';
import { ParentPage } from '../interfaces/parentPage';

interface IAppContext {
	isLoggedIn: boolean;
	setLoggedIn: (isLoggedIn: boolean) => void;
	typeOfUser: string;
	setTypeOfUser: (typeOfUser: string) => void;
}

const AppContext = createContext<IAppContext>({} as IAppContext);

export default AppContext;

export const AppProvider = ({ children }: ParentPage) => {
	const [isLoggedIn, setLoggedIn] = useState(false);
	const [typeOfUser, setTypeOfUser] = useState('');

	return (
		<AppContext.Provider
			value={{ isLoggedIn, setLoggedIn, typeOfUser, setTypeOfUser }}
		>
			{children}
		</AppContext.Provider>
	);
};
