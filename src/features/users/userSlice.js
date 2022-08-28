import { createSlice, current, nanoid } from "@reduxjs/toolkit";

const initialState = {
	user: [],
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		register: (state, action) => {
			state.user.push(action.payload);
		},
		login: (state, action) => {
			state.user.push({ ...action.payload, token: nanoid() });
		},
		logout: () => {
			return null;
		},
	},
});

export default userSlice.reducer;
export const { login, logout, register } = userSlice.actions;
