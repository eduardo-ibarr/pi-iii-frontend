import { useContext, useMemo } from 'react';
import AppContext from '../../contexts/AppContext';

const useAppContext = () => {
	const { isLoggedIn, setLoggedIn, typeOfUser, setUserEmail, userEmail } =
		useContext(AppContext);

	const handleLogin = () => {
		setLoggedIn(true);
	};

	const handleSetUserEmail = (email: string) => {
		setUserEmail(email);
	};

	const handleLogoff = () => {
		setLoggedIn(false);
	};

	const value = useMemo(
		() => ({
			isLoggedIn,
			handleLogin,
			handleLogoff,
			handleSetUserEmail,
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
		]
	);

	return value;
};

export default useAppContext;
