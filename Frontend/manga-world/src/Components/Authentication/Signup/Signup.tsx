import React, { useContext, useEffect, useState } from "react";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { Auth } from "../../../Auth/Auth";
import AuthenticationController from "../../../Controller/AuthenticationController";
import AuthoritiesController from "../../../Controller/AuthoritiesController";
import User from "../../../Model/User";
import Authorities from "../../../Model/Authorities";

function Signup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [signupError, setSignupError] = useState("");

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

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(inputEmail)) {
      setEmailError("Please enter a valid email address");
      setIsFormValid(false);
    } else {
      setEmailError("");
      setIsFormValid(!passwordError && !nameError);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputName = e.target.value;
    setName(inputName);

    const namePattern = /^[A-Za-z\d ]{3,}$/;

    if (!namePattern.test(inputName)) {
      setNameError("Name must be at least 3 characters");
      setIsFormValid(false);
    } else {
      setNameError("");
      setIsFormValid(!emailError && !passwordError);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputPassword = e.target.value;
    setPassword(inputPassword);

    const passwordPattern = /^[A-Za-z\d]{4,}$/;

    if (!passwordPattern.test(inputPassword)) {
      setPasswordError("Password must be at least 4 characters");
      setIsFormValid(false);
    } else {
      setPasswordError("");
      setIsFormValid(!emailError && !nameError);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let credentials = {
      name: name,
      email: email,
      password: password,
    };

    setSignupError("");

    AuthenticationController.signup(credentials)
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
              setSignupError(error.response.data);
            } else if (error.request) {
              setSignupError("No response received");
            } else {
              setSignupError(`Request setup error: ${error.message}`);
            }
          });
      })
      .catch((error) => {
        if (error.response) {
          setSignupError(error.response.data);
        } else if (error.request) {
          setSignupError("No response received");
        } else {
          setSignupError(`Request setup error: ${error.message}`);
        }
      });
  };

  return (
    <div className="flex justify-center items-center h-screen background_image_signup">
      <div className="bg-gray-950 bg-opacity-90 text-white shadow-md rounded-xl px-8 py-8 mb-4">
        <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit}>
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
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-64 py-3 px-4 text-black leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={handleNameChange}
            />
            {nameError && (
              <p className="text-red-500 text-xs italic">{nameError}</p>
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
              Sign Up
            </button>
          </div>
          {signupError && (
            <div className="text-red-500 text-xs italic mb-4">
              {signupError}
            </div>
          )}
          <div>
            <Link to="/login" className="text-white text-sm font-bold mb-2">
              Already have an account?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
