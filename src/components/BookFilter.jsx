import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filter, getBooks } from "../features/books/bookSlice";

const BookFilter = () => {
	const dispatch = useDispatch();
	const books = useSelector((state) => state.book.entities);
	const [q, setQ] = useState("");
	const searchQuery = () => {
		console.log(q);
		let findBook = books.items.map((book) => book.volumeInfo.title);
		console.log(findBook);
		dispatch(filter(searchQuery));
	};
	useEffect(() => {
		dispatch(getBooks());
	}, []);

	console.log(books);
	return (
		<div class="form-control ">
			<div class="input-group">
				<input
					type="search"
					name="search-form"
					id="search-form"
					placeholder="Search for..."
					value={q}
					class="input input-bordered"
					onChange={(e) => setQ(e.target.value)}
				/>
				<button class="btn btn-square" onClick={searchQuery}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/>
					</svg>
				</button>
			</div>
		</div>
	);
};

export default BookFilter;
