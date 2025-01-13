import React from "react";
import { Button, Typography, Input } from "@material-tailwind/react";
import { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Link, useNavigate } from "react-router";
import { MdError } from "react-icons/md";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { getDatabase, ref, set } from "firebase/database";

const SignUp = () => {
  const auth = getAuth();
  const db = getDatabase();
  const navigate = useNavigate();
  // all states
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  const [email, setEmail] = useState("");
  const [emailError, setemailError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setpasswordError] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setconfirmPasswordError] = useState("");

  // handle name
  const handleName = (e) => {
    setName(e.target.value);
    setNameError("");
  };
  // handle email
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setemailError("");
  };
  // handle password
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setpasswordError("");
  };
  // handle confirm password
  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    setconfirmPasswordError("");
  };

  // create account button
  const createAcountBtn = (e) => {
    e.preventDefault();
    if (!name) {
      setNameError("Name is required");
    }
    if (!email) {
      setemailError("Email is required");
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setemailError("Invalid Email");
    }
    if (!password) {
      setpasswordError("Password is required");
    } else if (
      !/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/.test(
        password
      )
    ) {
      setpasswordError(
        "Please, contain Number, Uppercase, Lowercase, Special Character and minimum length 8 character"
      );
    }
    if (!confirmPassword) {
      setconfirmPasswordError("Confirm password is required");
    } else if (password !== confirmPassword) {
      setconfirmPasswordError("Don't match with password");
    }
    if (name && email && password && confirmPassword) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          sendEmailVerification(auth.currentUser).then(() => {
            updateProfile(auth.currentUser, {
              displayName: name,
              photoURL: "https://picsum.photos/200/300",
            })
              .then(() => {
                toast.success("Account Created Successful", {
                  position: "top-center",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: false,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                  transition: Bounce,
                });
                const user = userCredential.user;
                set(ref(db, "users/" + user.uid), {
                  name: name,
                  email: email,
                  image: "https://picsum.photos/200/300",
                }).then = () => {
                  setName("");
                  setEmail("");
                  setPassword("");
                  setConfirmPassword("");

                  setTimeout(() => {
                    navigate("/login");
                  }, 3000);

                  console.log(user);
                };
              })
              .catch((error) => {
                console.log(error);
              });
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // setemailError(errorCode);
          toast.error(errorCode, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          });
          // ..
        });
    }
  };
  return (
    <div className="min-h-screen bg-gray-500 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-Ubuntu">
      <div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Bounce}
        />
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-[0px_0px_15px_0px_rgba(0,0,0,0.50)] sm:rounded-lg sm:px-10">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mb-3 text-center text-3xl leading-9 font-extrabold text-gray-900 font-Oswald">
              SignUp
            </h2>
            <p className="text-center text-gray-600">Create Your Account</p>
          </div>
          <form method="POST" action="#">
            <div>
              <label
                htmlFor="email"
                className={`text-sm font-bold leading-5 flex items-center ${
                  nameError ? "text-red-500" : "text-gray-700"
                }`}
              >
                Name
                {nameError && <MdError className="ml-1" />}
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  onChange={handleName}
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  type="text"
                  required=""
                  value={name}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
            </div>
            {nameError && <p className="text-red-500 mt-1">{nameError}</p>}
            <div className="mt-6">
              <label
                htmlFor="email"
                className={`text-sm font-bold leading-5 flex items-center ${
                  emailError ? "text-red-500" : "text-gray-700"
                }`}
              >
                Email Address
                {emailError && <MdError className="ml-1" />}
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  onChange={handleEmail}
                  id="email"
                  name="email"
                  placeholder="user@example.com"
                  type="email"
                  required=""
                  value={email}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
            </div>
            {emailError && <p className="text-red-500 mt-1">{emailError}</p>}
            <div className="mt-6">
              <label
                htmlFor="email"
                className={`text-sm font-bold leading-5 flex items-center mb-1 ${
                  passwordError ? "text-red-500" : "text-gray-700"
                }`}
              >
                Password
                {passwordError && <MdError className="ml-1" />}
              </label>
              <Input
                onChange={handlePassword}
                size="lg"
                placeholder="********"
                labelProps={{
                  className: "hidden",
                }}
                value={password}
                className="w-full placeholder:opacity-100 focus:border-t-primary border-gray-300"
                type={passwordShown ? "text" : "password"}
                icon={
                  <i onClick={togglePasswordVisiblity}>
                    {passwordShown ? (
                      <IoEye className="h-5 w-5 text-gray-600" />
                    ) : (
                      <IoEyeOff className="h-5 w-5 text-gray-600" />
                    )}
                  </i>
                }
              />
            </div>
            {passwordError && (
              <p className="text-red-500 mt-1">{passwordError}</p>
            )}
            <div className="mt-6">
              <label
                htmlFor="email"
                className={`text-sm font-bold leading-5 flex items-center ${
                  confirmPasswordError ? "text-red-500" : "text-gray-700"
                }`}
              >
                Confirm Password
                {confirmPasswordError && <MdError className="ml-1" />}
              </label>
              <div className="mt-1 rounded-md shadow-sm">
                <input
                  onChange={handleConfirmPassword}
                  id="password_confirmation"
                  name="password_confirmation"
                  type="password"
                  required=""
                  value={confirmPassword}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
              </div>
            </div>
            {confirmPasswordError && (
              <p className="text-red-500 mt-1">{confirmPasswordError}</p>
            )}
            <div className="mt-6">
              <span className="block w-full rounded-md shadow-sm">
                <Button
                  onClick={createAcountBtn}
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                >
                  Create account
                </Button>
              </span>
            </div>
          </form>
          <div className="mt-4">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="text-blue-700 font-bold">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
