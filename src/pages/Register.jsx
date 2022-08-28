import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux/es/exports";
import { register } from "../features/users/userSlice";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [localData, setLocalData] = useState(null);
	const [token, setToken] = useState(null);
	const [registerData, setRegisterData] = useState({
		nama: "",
		email: "",
		gender: "",
		password: "",
	});
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [errorMsg, setErrorMsg] = useState({
		nama: "",
		email: "",
		gender: "",
		password: "",
		confirm_password: "",
	});

	useEffect(() => {
		const data = JSON.parse(localStorage.getItem("persist:root"));
		if (data) {
			setLocalData(JSON.parse(data.user));
			setToken(JSON.parse(data.token));
		}
	}, []);

	const handleChange = (e) => {
		const { name, value, checked, type } = e.target;
		if (name === "confirm_password") {
			setConfirmPassword(value);
		}
		if (type === "text" || type === "email" || type === "password") {
			setRegisterData((prevState) => ({ ...prevState, [name]: value }));
		} else if (type === "radio") {
			setRegisterData((prevState) => ({
				...prevState,
				gender: checked ? value : "",
			}));
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (validate()) {
			delete registerData.confirm_password;
			dispatch(register(registerData));
			navigate("/login");
			navigate(0);
		}
	};

	const validate = () => {
		let isValid = true;

		//Validasi nama
		if (registerData.nama.length < 1) {
			isValid = false;
			setErrorMsg((prevState) => ({
				...prevState,
				nama: "Masukkan nama Anda.",
			}));
		} else if (registerData.nama.length > 1 && registerData.nama < 3) {
			isValid = false;
			setErrorMsg((prevState) => ({
				...prevState,
				nama: "Nama minimal 3 karakter",
			}));
		} else {
			setErrorMsg((prevState) => ({
				...prevState,
				nama: "",
			}));
		}

		//Validasi Email
		if (registerData.email.length < 1) {
			isValid = false;
			setErrorMsg((prevState) => ({
				...prevState,
				email: "Masukkan email Anda.",
			}));
		} else if (registerData.email.length > 1) {
			let pattern = new RegExp(
				/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
			);
			if (!pattern.test(registerData.email)) {
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

		//Validasi radio gender
		if (registerData.gender === "") {
			isValid = false;
			setErrorMsg((prevState) => ({
				...prevState,
				gender: "Jenis kelamin belum dipilih!",
			}));
		} else if (
			registerData.gender === "laki-laki" ||
			registerData.gender === "perempuan"
		) {
			setErrorMsg((prevState) => ({
				...prevState,
				gender: "",
			}));
		}

		//Validasi password
		if (registerData.password.length < 1) {
			isValid = false;
			setErrorMsg((prevState) => ({
				...prevState,
				password: "Masukkan password.",
			}));
		} else if (registerData.password.length > 1) {
			let pattern = new RegExp(
				/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{8,15}$/
			);
			if (!pattern.test(registerData.password)) {
				isValid = false;
				setErrorMsg((prevState) => ({
					...prevState,
					password:
						"Password harus terdiri dari kombinasi huruf besar, huruf kecil, dan angka",
				}));
			} else {
				setErrorMsg((prevState) => ({
					...prevState,
					password: "",
				}));
			}
		} else {
			setErrorMsg((prevState) => ({
				...prevState,
				password: "",
			}));
		}

		//Validasi konfirmasi password
		if (confirmPassword.length < 1) {
			isValid = false;
			setErrorMsg((prevState) => ({
				...prevState,
				confirm_password: "Masukkan konfirmasi password.",
			}));
		} else {
			setErrorMsg((prevState) => ({
				...prevState,
				confirm_password: "",
			}));
		}

		//Validasi kecocokan password dan konfirmasi
		if (
			typeof registerData.password !== "undefined" &&
			typeof confirmPassword !== "undefined"
		) {
			if (registerData.password !== confirmPassword) {
				isValid = false;
				setErrorMsg((prevState) => ({
					...prevState,
					password: "Password tidak sesuai.",
				}));
			}
		} else {
			isValid = false;
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
					<h1 className="text-xl font-bold">Register</h1>
				</div>
				<form
					class="register-form mx-auto w-full max-w-sm bg-gray-800 rounded-lg border border-gray-200 shadow-md p-5"
					onSubmit={handleSubmit}
				>
					<div className="form-input mb-6">
						<label
							className="block mb-2 text-sm font-medium text-gray-200"
							htmlFor="nama"
						>
							Nama Lengkap
						</label>
						<input
							onChange={handleChange}
							type="text"
							name="nama"
							id="nama"
							value={registerData.nama}
							class="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
						/>
						<p>{errorMsg.nama}</p>
					</div>

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
							value={registerData.email}
							class="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
						/>
						<p>{errorMsg.email}</p>
					</div>

					<div className="form-input flex items-start">
						<label
							className="block mb-2 text-sm font-medium text-gray-200 "
							htmlFor="gender"
						>
							Jenis Kelamin
						</label>
						<input
							onChange={handleChange}
							type="radio"
							name="gender"
							value="laki-laki"
							id="laki"
							className="ml-4 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500  "
						/>
						<label
							className="ml-2 text-sm font-medium text-gray-200 "
							htmlFor="laki"
						>
							Laki-laki
						</label>
						<input
							onChange={handleChange}
							type="radio"
							name="gender"
							value="perempuan"
							id="perempuan"
							className="ml-10 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500  "
						/>
						<label
							className="ml-2 text-sm font-medium text-gray-200 "
							htmlFor="perempuan"
						>
							Perempuan
						</label>
					</div>
					<p className="mb-6">{errorMsg.gender}</p>

					<div className="form-input mb-6">
						<label
							className="block mb-2 text-sm font-medium text-gray-200 "
							htmlFor=""
						>
							Buat Password
						</label>
						<input
							onChange={handleChange}
							type={showPassword ? "text" : "password"}
							name="password"
							id="password"
							value={registerData.password}
							class="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
						/>
						<span
							className="text-blue-500"
							onClick={() => setShowPassword((prev) => (prev ? false : true))}
						>
							<small>Lihat Password</small>
						</span>
						<p>{errorMsg.password}</p>
					</div>

					<div className="form-input mb-6">
						<label
							className="block mb-2 text-sm font-medium text-gray-200 "
							htmlFor="confirm_password"
						>
							Konfirmasi Password
						</label>
						<input
							onChange={handleChange}
							type="password"
							name="confirm_password"
							id="confirm_password"
							value={confirmPassword}
							class="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
						/>
						<p>{errorMsg.confirm_password}</p>
					</div>

					<div className="flex justify-between items-end">
						<button
							type="submit"
							class="bg-blue-600 text-gray-200 hover:bg-blue-400 px-4 py-2 rounded-lg"
						>
							Daftar
						</button>
						<span className="text-right text-blue-500 underline">
							<Link to="/login">Sudah punya akun?</Link>
						</span>
					</div>
				</form>
			</div>
		);
	}
};

export default Register;
