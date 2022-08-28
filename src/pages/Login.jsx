import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const navigate = useNavigate();
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
				navigate("/");
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

	// console.log(localData);
	// console.log(loginData);

	return (
		<div>
			<h1>Login</h1>
			<form className="register-form" onSubmit={handleSubmit}>
				<label htmlFor="email">Email</label>
				<input
					onChange={handleChange}
					type="email"
					name="email"
					id="email"
					value={loginData.email}
				/>
				<p>{errorMsg.email}</p>
				<label htmlFor="">Buat Password</label>
				<input
					onChange={handleChange}
					type={showPassword ? "text" : "password"}
					name="password"
					id="password"
					value={loginData.password}
				/>
				<span onClick={() => setShowPassword((prev) => (prev ? false : true))}>
					<small>Lihat Password</small>
				</span>
				<p>{errorMsg.password}</p>
				<button>Masuk</button>
				<p>{errorMsg.isUser}</p>
			</form>
		</div>
	);
};

export default Login;
