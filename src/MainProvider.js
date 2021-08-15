import React, { useContext, createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

const MainContext = createContext();

const initialState = Object.freeze({
	isAuthenticated: false,
	userId: '',
	accessToken: '',
	exp: 0,
});

const actions = {
	SIGNIN: 'SIGNIN',
	SIGNOUT: 'SIGNOUT',
};

const mainReducer = (state, action) => {
	switch (action.type) {
		case actions.SIGNIN:
			return {
				...state,
				isAuthenticated: true,
				userId: action.payload.userId,
				accessToken: action.payload.accessToken,
				exp: action.payload.exp,
			};
		case actions.SIGNOUT:
			return {
				...state,
				isAuthenticated: false,
				userId: '',
				accessToken: '',
				exp: 0,
			};

		default:
			return state;
	}
};

const MainProvider = ({ children }) => {
	const [mainState, mainDispatch] = useReducer(mainReducer, initialState);

	const value = { mainState, mainDispatch };

	return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
};

const useMain = () => {
	const context = useContext(MainContext);
	if (context === undefined) {
		throw new Error('💥 Context should be used within Context Provider');
	}
	return context;
};

export { MainProvider, useMain, actions };

MainProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
