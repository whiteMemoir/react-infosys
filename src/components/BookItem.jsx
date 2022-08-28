import React from "react";

const BookItem = ({ book }) => {
	return (
		<div class="card w-96 bg-base-100 shadow-2xl">
			<figure>
				<img src={book.volumeInfo.imageLinks.thumbnail} alt="Shoes" />
			</figure>
			<div class="card-body">
				<h2 class="card-title">
					<a href={book.volumeInfo.infoLink}>{book.volumeInfo.title}</a>
				</h2>
				<p>{book.volumeInfo.description?.substring(0, 200) + ". . ."}</p>
				<div class="card-actions justify-end">
					<button class="btn btn-primary">Detail</button>
					<button class="btn btn-primary">Link</button>
				</div>
			</div>
		</div>
	);
};

export default BookItem;
