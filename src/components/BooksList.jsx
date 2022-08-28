import BookItem from "./BookItem";

const BooksList = ({ books }) => {
	return (
		<>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 mt-20 justify-center place-items-center">
				{books.items?.map((book, index) => (
					<BookItem key={index} book={book} />
				))}
			</div>
		</>
	);
};

export default BooksList;
