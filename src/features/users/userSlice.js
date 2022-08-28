import { createSlice, current, nanoid } from "@reduxjs/toolkit";

const initialState = {
	user: [],
	token: null,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		register: (state, action) => {
			state.user.push({ id: nanoid(), ...action.payload });
		},
		login: (state, action) => {
			state.token = action.payload;
		},
		logout: () => {
			return initialState;
		},
	},
});

export default userSlice.reducer;
export const { login, logout, register } = userSlice.actions;
