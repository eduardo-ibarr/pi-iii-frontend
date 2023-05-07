import { useContext, useMemo } from 'react';
import AppContext from '../../contexts/AppContext';

const useAppContext = () => {
	const {
		isLoggedIn,
		setLoggedIn,
		setTypeOfUser,
		typeOfUser,
		setUserEmail,
		userEmail,
	} = useContext(AppContext);

	const handleLogin = () => {
		setLoggedIn(true);
	};

	const handleSetTypeOfUser = (type: string) => {
		setTypeOfUser(type);
	};

	const handleSetUserEmail = (email: string) => {
		setUserEmail(email);
	};

	const handleLogout = () => {
		setLoggedIn(false);
	};

	const value = useMemo(
		() => ({
			isLoggedIn,
			handleLogin,
			handleLogout,
			handleSetTypeOfUser,
			handleSetUserEmail,
			userEmail,
			typeOfUser,
		}),
		[
			isLoggedIn,
			handleLogin,
			handleLogout,
			handleSetTypeOfUser,
			handleSetUserEmail,
			userEmail,
			typeOfUser,
		]
	);

	return value;
};

export default useAppContext;
