import { useContext, useMemo } from 'react';
import AppContext from '../../contexts/AppContext';

const useAppContext = () => {
	const {
		isLoggedIn,
		setLoggedIn,
		typeOfUser,
		setUserEmail,
		userEmail,
		userId,
		clearUserData,
	} = useContext(AppContext);

	const handleLogin = () => {
		setLoggedIn(true);
	};

	const handleSetUserEmail = (email: string) => {
		setUserEmail(email);
	};

	const handleLogoff = () => {
		clearUserData();
		setLoggedIn(false);
	};

	const value = useMemo(
		() => ({
			isLoggedIn,
			handleLogin,
			handleLogoff,
			handleSetUserEmail,
			userId,
			userEmail,
			typeOfUser,
		}),
		[
			isLoggedIn,
			handleLogin,
			handleLogoff,
			handleSetUserEmail,
			userEmail,
			typeOfUser,
			userId,
		]
	);

	return value;
};

export default useAppContext;
