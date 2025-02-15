import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { useNavigate, Link } from "react-router-dom";

export function Login() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleChangeInput = (e) => {
    const key = e.target.name;
    const value = e.target.value;

    setUserData({
      ...userData,
      [key]: value,
    });
  };

  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      let { data } = await axios({
        method: "POST",
        url: "/login",
        data: userData,
      });
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("role", data.role);
      navigate("/");
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  async function handleCredentialResponse(response) {
    try {
      let res = await axios({
        method: "POST",
        url: "/login-google",
        headers: {
          google_token: response.credential,
        },
      });
      console.log(res.data.access_token);
      localStorage.setItem("access_token", res.data.access_token);
      console.log(res);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    window.onload = function () {
      google.accounts.id.initialize({
        client_id: import.meta.env.VITE_CLIENTID,
        callback: handleCredentialResponse,
      });
      google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large" } // customization attributes
      );
      google.accounts.id.prompt(); // also display the One Tap dialog
    };
  }, []);

  return (
    <>
      {/* component */}
      <style
        dangerouslySetInnerHTML={{
          __html: "\n  .login_img_section {\n  background: linear-gradient(rgba(2,2,2,.7),rgba(0,0,0,.7)),url(https://liburanyuk.co.id/wp-content/uploads/2021/07/omahucok-5-1024x768.jpg) center right;}",
        }}
      />
      <div className="h-screen flex">
        <div
          className="hidden lg:flex w-full lg:w-1/2 login_img_section
    justify-around items-center"
        >
          <div
            className=" 
            bg-black 
            opacity-20 
            inset-0 
            z-0"
          ></div>
          <div className="w-full mx-auto px-20 flex-col items-center space-y-6">
            <h1 className="text-white font-bold text-4xl font-sans">Omah Ucok</h1>
            <p className="text-white mt-1">The simplest app to use</p>
            <div className="flex justify-center lg:justify-start mt-6">
              <a href="#" className="hover:bg-indigo-700 hover:text-white hover:-translate-y-1 transition-all duration-500 bg-white text-indigo-800 mt-4 px-4 py-2 rounded-2xl font-bold mb-2">
                Get Started
              </a>
            </div>
          </div>
        </div>
        <div className="flex w-full lg:w-1/2 justify-center items-center bg-amber-100 space-y-8">
          <div className="w-full px-8 md:px-32 lg:px-24">
            <form onSubmit={handleLogin} className="bg-white rounded-md shadow-2xl p-5">
              <h1 className="text-gray-800 font-bold text-2xl mb-5">Login!</h1>
              <h1 className="text-gray-800 font-bold text-2xl mb-5">Welcome Back!</h1>
              <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokelinecap="round" strokelinejoin="round" strokewidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
                <input id="email" className=" pl-2 w-full outline-none border-none" type="email" name="email" value={userData.email} onChange={handleChangeInput} placeholder="Email Address" />
              </div>
              <div className="flex items-center border-2 mb-12 py-2 px-3 rounded-2xl ">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" />
                </svg>
                <input className="pl-2 w-full outline-none border-none" type="password" name="password" id="password" value={userData.password} onChange={handleChangeInput} placeholder="Password" />
              </div>
              <button type="submit" className="block w-full bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2">
                Login
              </button>

              <div className="flex justify-between mt-4">
                <Link to={"/register"} className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all">
                  Don't have an account yet? Register here
                </Link>
              </div>
              <div className="flex justify-between mt-4">
                <button id="buttonDiv" className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all">
                  Google Login
                </button>
              </div>
              {/* <div id="buttonDiv"></div> */}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
