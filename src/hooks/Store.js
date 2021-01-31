import React, {createContext, useReducer} from "react";
import Reducer from './Reducer'
import { accents } from '../components/UIElements/Values';


let token = JSON.parse(localStorage.getItem('schoolManColorAccent'));

const initialState = {
	accent: token ? token.accent : accents.light,
	error: null
};

const Store = ({children}) => {
	const [state, dispatch] = useReducer(Reducer, initialState);
	return (
		<Context.Provider value={[state, dispatch]}>
			{children}
		</Context.Provider>
	)
};

export const Context = createContext(initialState);
export default Store;