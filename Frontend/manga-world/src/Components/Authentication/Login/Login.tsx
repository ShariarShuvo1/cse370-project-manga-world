import React, { useContext, useEffect, useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { Auth } from "../../../Auth/Auth";
import AuthenticationController from "../../../Controller/AuthenticationController";
import AuthoritiesController from "../../../Controller/AuthoritiesController";
import User from "../../../Model/User";
import Authorities from "../../../Model/Authorities";

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>("");

  const {
    authorised,
    setAuthorised,
    userId,
    setUserId,
    userType,
    setUserType,
  } = useContext(Auth);
  let navigate = useNavigate();

  useEffect(() => {
    if (authorised === "true") {
      navigate("/home");
    }
  }, [authorised, navigate, userId, userType]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(inputEmail)) {
      setEmailError("Please enter a valid email address");
      setIsFormValid(false);
    } else {
      setEmailError("");
      setIsFormValid(!!passwordError);
    }
  };

  const handlePasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const inputPassword = e.target.value;
    setPassword(inputPassword);

    if (inputPassword.length < 4) {
      setPasswordError("Password must be at least 4 characters");
      setIsFormValid(!!emailError);
    } else {
      setPasswordError("");
      setIsFormValid(!!email && !!inputPassword);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    let credentials = {
      email: email,
      password: password,
    };

    setLoginError("");

    AuthenticationController.login(credentials)
      .then((response) => {
        const userData: User = response.data;
        AuthoritiesController.getAuthByUserId(userData.userId)
          .then((authResponse) => {
            let auth: Authorities = authResponse.data;
            setAuthorised("true");
            setUserId(userData.userId.toString());
            setUserType(auth.type);
            navigate("/home");
          })
          .catch((error) => {
            if (error.response) {
              setLoginError(error.response.data);
            } else if (error.request) {
              setLoginError("No response received");
            } else {
              setLoginError(`Request setup error: ${error.message}`);
            }
          });
      })
      .catch((error) => {
        if (error.response) {
          setLoginError(error.response.data);
        } else if (error.request) {
          setLoginError("No response received");
        } else {
          setLoginError(`Request setup error: ${error.message}`);
        }
      });
  };

  return (
    <div className="background_image_login">
      <div className="flex justify-center items-center h-screen">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-950 bg-opacity-90 text-white shadow-md rounded-xl px-8 py-8 mb-4"
        >
          <h2 className="text-2xl font-bold mb-6">Log In</h2>
          <div className="mb-6">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-64 py-3 px-4 text-black leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
            />
            {emailError && (
              <p className="text-red-500 text-xs italic">{emailError}</p>
            )}
          </div>
          <div className="mb-6">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-64 py-3 px-4 text-black leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
            />
            {passwordError && (
              <p className="text-red-500 text-xs italic">{passwordError}</p>
            )}
          </div>
          <div className="flex items-center justify-center">
            <button
              className={`${
                isFormValid
                  ? "bg-white hover:bg-gray-300 text-black"
                  : "bg-gray-500 cursor-not-allowed"
              } font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline mb-5`}
              type="submit"
              disabled={!isFormValid}
            >
              Log In
            </button>
          </div>
          {loginError && (
            <div className="text-red-500 text-xs italic mb-4">{loginError}</div>
          )}
          <div>
            <Link to="/signup" className="text-white text-sm font-bold mb-2">
              Or, Create New Account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
