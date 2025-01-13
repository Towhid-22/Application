import React from "react";
import { Button, Typography, Input } from "@material-tailwind/react";
import { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Link, useNavigate } from "react-router";
import { MdError } from "react-icons/md";
import { ToastContainer, toast, Bounce } from "react-toastify";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { useDispatch } from "react-redux";
import { userLoginInfo } from "../slices/userSlices";

const Login = () => {
  // const data = localStorage.getItem("userInfo");
  // console.log(JSON.parse(data));
  const dispatch = useDispatch();
  // all states
  const auth = getAuth();
  const db = getDatabase();
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);

  const [email, setEmail] = useState("");
  const [emailError, setemailError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setpasswordError] = useState("");

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

  const loginBtn = (e) => {
    e.preventDefault();
    if (!email) {
      setemailError("Email is required");
    }
    if (!password) {
      setpasswordError("Password is required");
    }
    if (email && password) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          toast.success("Login Successful", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          });
          setEmail("");
          setPassword("");
          const user = userCredential.user;
          console.log(user);
          dispatch(userLoginInfo(user));
          localStorage.setItem("userInfo", JSON.stringify(user));
          setTimeout(() => {
            navigate("/");
          }, 4000);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode.includes("auth/invalid-credential")) {
            toast.error("Input invalid credential", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
            });
          } else {
            toast.error(errorCode, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
            });
          }
        });
    }
  };
  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        toast.success("Login Successful", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
        const user = result.user;
        console.log(user);
        set(ref(db, "users/" + user.uid), {
          name: user.displayName,
          email: user.email,
          image: user.photoURL,
        });
        setEmail("");
        setPassword("");
        dispatch(userLoginInfo(user));
        localStorage.setItem("userInfo", JSON.stringify(user));
        setTimeout(() => {
          navigate("/");
        }, 4000);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorCode, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      });
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
          theme="light"
          transition={Bounce}
        />
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-[0px_0px_15px_0px_rgba(0,0,0,0.50)] sm:rounded-lg sm:px-10">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mb-3 text-center text-3xl leading-9 font-extrabold text-gray-900 font-Oswald">
              Login
            </h2>
            <p className="text-center text-gray-600">Login Your Account</p>
          </div>
          <form method="POST" action="#">
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
              {emailError && <p className="text-red-500 mt-1">{emailError}</p>}
            </div>
            <div className="mt-6">
              <label
                htmlFor="email"
                className={`text-sm font-bold leading-5 flex items-center ${
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
                className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
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
              <span className="block w-full rounded-md shadow-sm">
                <Button
                  onClick={loginBtn}
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                >
                  Login
                </Button>
              </span>
            </div>
          </form>
          <div>
            <Button
              onClick={handleGoogleLogin}
              variant="outlined"
              size="lg"
              className="mt-6 flex h-12 items-center justify-center gap-2"
              fullWidth
            >
              <img
                src={`https://www.material-tailwind.com/logos/logo-google.png`}
                alt="google"
                className="h-6 w-6"
              />{" "}
              Login in with google
            </Button>
          </div>
          <div className="mt-4">
            <p>
              Don't have an accout yet?{" "}
              <Link to="/signup" className="text-blue-700 font-bold">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
