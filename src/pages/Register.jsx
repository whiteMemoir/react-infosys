import React, { useState } from "react";
import { useDispatch } from "react-redux/es/exports";
import { register } from "../features/users/userSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
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

	return (
		<div>
			<h1>Register</h1>
			<form className="register-form" onSubmit={handleSubmit}>
				<label htmlFor="nama">Nama Lengkap</label>
				<input
					onChange={handleChange}
					type="text"
					name="nama"
					id="nama"
					value={registerData.nama}
				/>
				<p>{errorMsg.nama}</p>
				<label htmlFor="email">Email</label>
				<input
					onChange={handleChange}
					type="email"
					name="email"
					id="email"
					value={registerData.email}
				/>
				<p>{errorMsg.email}</p>
				<label htmlFor="gender">Jenis Kelamin</label>
				<label htmlFor="laki">Laki-laki</label>
				<input
					onChange={handleChange}
					type="radio"
					name="gender"
					value="laki-laki"
					id="laki"
				/>
				<label htmlFor="perempuan">Perempuan</label>
				<input
					onChange={handleChange}
					type="radio"
					name="gender"
					value="perempuan"
					id="perempuan"
				/>
				<p>{errorMsg.gender}</p>
				<label htmlFor="">Buat Password</label>
				<input
					onChange={handleChange}
					type={showPassword ? "text" : "password"}
					name="password"
					id="password"
					value={registerData.password}
				/>
				<span onClick={() => setShowPassword((prev) => (prev ? false : true))}>
					<small>Lihat Password</small>
				</span>
				<p>{errorMsg.password}</p>
				<label htmlFor="confirm_password">Konfirmasi Password</label>
				<input
					onChange={handleChange}
					type="password"
					name="confirm_password"
					id="confirm_password"
					value={confirmPassword}
				/>
				<p>{errorMsg.confirm_password}</p>
				<button>Daftar</button>
			</form>
		</div>
	);
};

export default Register;
