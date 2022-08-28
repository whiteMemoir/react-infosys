import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";

export const getBooks = createAsyncThunk(
	"book/getBooks",
	async (args, { rejectWithValue }) => {
		try {
			const response = await axios
				.get(
					"https://www.googleapis.com/books/v1/volumes?q=coding&maxResults=10&key=AIzaSyCxG7X-PSgnVSx1M_FKpgbjEg8dLgs7WbA"
				)
				.then((res) => res.data);
			return response;
		} catch (error) {
			rejectWithValue();
		}
	}
);

const initialState = {
	entities: [],
	loading: false,
};

const bookSlice = createSlice({
	name: "book",
	initialState,
	reducers: {},
	extraReducers: {
		[getBooks.pending]: (state, { payload }) => {
			state.loading = true;
		},
		[getBooks.fulfilled]: (state, { payload }) => {
			state.loading = false;
			state.entities = payload;
			console.log(current(state));
		},
		[getBooks.rejected]: (state, { payload }) => {
			state.loading = false;
			state.entities = payload;
		},
	},
});

export default bookSlice.reducer;
