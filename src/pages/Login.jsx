import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../features/users/userSlice";

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [token, setToken] = useState(null);
	const [localData, setLocalData] = useState(null);
	const [loginData, setloginData] = useState({
		email: "",
		password: "",
	});
	const [showPassword, setShowPassword] = useState(false);
	const [errorMsg, setErrorMsg] = useState({
		email: "",
		password: "",
		isUser: "",
	});

	useEffect(() => {
		const data = JSON.parse(localStorage.getItem("persist:root"));
		if (data) {
			setLocalData(JSON.parse(data.user));
			setToken(JSON.parse(data.token));
		}
	}, []);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setloginData((prevState) => ({ ...prevState, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (validate()) {
			const isPassword = localData.filter(
				(user) => user.password === loginData.password
			);
			const isEmail = localData.filter(
				(user) => user.email === loginData.email
			);
			if (isPassword.length !== 0 && isEmail.length !== 0) {
				let [getToken] = isEmail;
				dispatch(login(getToken.id));
				navigate("/");
				navigate(0);
			} else {
				setErrorMsg((prevState) => ({
					...prevState,
					isUser: "Email atau Password salah!",
				}));
			}
		}
	};
	const validate = () => {
		let isValid = true;

		//Validasi Email
		if (loginData.email.length < 1) {
			isValid = false;
			setErrorMsg((prevState) => ({
				...prevState,
				email: "Masukkan email Anda.",
			}));
		} else if (loginData.email.length > 1) {
			let pattern = new RegExp(
				/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
			);
			if (!pattern.test(loginData.email)) {
				isValid = false;
				setErrorMsg((prevState) => ({
					...prevState,
					email: "Masukkan email yang valid!.",
				}));
			} else {
				setErrorMsg((prevState) => ({
					...prevState,
					email: "",
				}));
			}
		} else {
			setErrorMsg((prevState) => ({
				...prevState,
				email: "",
			}));
		}

		//Validasi password
		if (loginData.password.length < 1) {
			isValid = false;
			setErrorMsg((prevState) => ({
				...prevState,
				password: "Masukkan password.",
			}));
		} else {
			setErrorMsg((prevState) => ({
				...prevState,
				password: "",
			}));
		}

		return isValid;
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
		navigate("/");
	} else {
		return (
			<div className="mx-auto my-8">
				<div className="text-center mb-6">
					<h1 className="text-xl font-bold">Login</h1>
				</div>
				<form
					class="register-form mx-auto w-full max-w-sm bg-gray-800 rounded-lg border border-gray-200 shadow-md p-5"
					onSubmit={handleSubmit}
				>
					<div className="form-input mb-6">
						<label
							className="block mb-2 text-sm font-medium text-gray-200 "
							htmlFor="email"
						>
							Email
						</label>
						<input
							onChange={handleChange}
							type="email"
							name="email"
							id="email"
							value={loginData.email}
							class="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
						/>
						<p>{errorMsg.email}</p>
					</div>
					<div className="form-input mb-6">
						<label
							className="block mb-2 text-sm font-medium text-gray-200 "
							htmlFor=""
						>
							Password
						</label>
						<input
							onChange={handleChange}
							type={showPassword ? "text" : "password"}
							name="password"
							id="password"
							value={loginData.password}
							class="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
						/>
						<span
							className="text-blue-500"
							onClick={() => setShowPassword((prev) => (prev ? false : true))}
						>
							<small>Lihat Password</small>
						</span>
						<p>{errorMsg.password}</p>
					</div>

					<p>{errorMsg.isUser}</p>
					<div className="flex justify-between items-end">
						<button
							type="submit"
							class="bg-blue-600 text-gray-200 hover:bg-blue-400 px-4 py-2 rounded-lg"
						>
							Masuk
						</button>
						<span className="text-right text-blue-500 underline">
							<Link to="/register">Belum mendaftar?</Link>
						</span>
					</div>
				</form>
			</div>
		);
	}
};

export default Login;
