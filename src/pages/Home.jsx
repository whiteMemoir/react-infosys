import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "../features/books/bookSlice";
import { useNavigate } from "react-router-dom";
import BookFilter from "../components/BookFilter";
import BooksList from "../components/BooksList";
import { logout } from "../features/users/userSlice";

const Home = () => {
	const navigate = useNavigate();
	const [localData, setLocalData] = useState(null);
	const [token, setToken] = useState(null);
	const dispatch = useDispatch();
	const books = useSelector((state) => state.book.entities);

	useEffect(() => {
		dispatch(getBooks());
	}, []);

	useEffect(() => {
		const data = JSON.parse(localStorage.getItem("persist:root"));
		if (data) {
			setLocalData(JSON.parse(data.user));
			setToken(JSON.parse(data.token));
		}
	}, []);
	const logoutButton = () => {
		dispatch(logout());
		navigate(0);
	};

	const userCheck = () => {
		let isLogin = true;
		const findUser = localData?.find((user) => user.id === token);
		if (!findUser) {
			isLogin = false;
		}
		return isLogin;
	};

	if (userCheck()) {
		return (
			<>
				<div className="bg-base-200 mt-32 px-5 py-24">
					<div className="text-center">
						<h1 className="text-5xl font-bold">Halo book lovers!</h1>
						<p className="py-6">
							Selamat datang di galeri buku! Silakan melihat katalog yang
							tersedia dan gunakan fitur pencarian untuk mencari lebih cepat
						</p>
						<div className="flex justify-center">
							<BookFilter />
							<button
								onClick={logoutButton}
								className="ml-10 bg-red-600 rounded-lg px-4"
							>
								Logout
							</button>
						</div>
					</div>
				</div>
				<BooksList books={books} />
			</>
		);
	} else {
		return navigate("/login");
	}
};

export default Home;
