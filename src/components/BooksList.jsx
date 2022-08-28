import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "../features/books/bookSlice";
import BookItem from "./BookItem";

const BooksList = () => {
	const dispatch = useDispatch();
	const books = useSelector((state) => state.book.entities);
	useEffect(() => {
		dispatch(getBooks());
	}, []);
	return (
		<>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-28 justify-center place-items-center">
				{books.items.map((book, index) => (
					<BookItem key={index} book={book} />
				))}
			</div>
		</>
	);
};

export default BooksList;
