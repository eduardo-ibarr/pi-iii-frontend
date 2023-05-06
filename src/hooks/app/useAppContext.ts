import { useContext, useMemo } from 'react';
import AppContext from '../../contexts/AppContext';

const useAppContext = () => {
	const { isLoggedIn, setLoggedIn, setTypeOfUser, typeOfUser } =
		useContext(AppContext);

	const handleLogin = () => {
		setLoggedIn(true);
	};

	const handleSetTypeOfUser = (type: string) => {
		setTypeOfUser(type);
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
			typeOfUser,
		}),
		[isLoggedIn, handleLogin, handleLogout, handleSetTypeOfUser, typeOfUser]
	);

	return value;
};

export default useAppContext;
