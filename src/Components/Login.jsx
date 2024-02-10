import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Background from "../assets/background.jfif";
import showEye from "../assets/hideIcon.png";
import hideEye from "../assets/showIcon.png";
import userIcon from "../assets/userIcon.png";

function Login() {
  const [clicked, setClicked] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const token = localStorage.getItem("login")
        console.log(token)
        const response = await axios.get(
          "http://localhost:4005/users/getPermissions",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        if (response.data.loggedIn) {
          navigate("/Dashboard");
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkLoggedIn();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4005/users/Login",
        formData
      );
      localStorage.setItem("login", response.data.token);
      setFormData({
        email: "",
        password: "",
      });
      navigate("/Dashboard");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div
        className="flex justify-center items-center min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${Background})` }}
      >
        <div className="bg-transparent border-2 border-white border-opacity-20 backdrop-filter backdrop-blur-lg shadow-lg text-white rounded-lg p-8 w-[420px]">
          <h1 className="text-3xl text-center mb-8">Login</h1>
          <div className="input_box w-full h-14 mb-8 relative">
            <input
              type="text"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full h-full bg-transparent outline-none border-2 border-[#ffffff33] rounded-full text-white px-6 focus:border-white duration-500 placeholder:text-white"
            />
            <img
              src={userIcon}
              alt=""
              className="absolute w-8 h-7 top-[13px] right-5"
            />
          </div>

          <div className="input_box w-full h-14 mb-8 relative">
            <input
              type={clicked ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className=" w-full h-full bg-transparent outline-none border-2 border-[#ffffff33] rounded-full text-white px-6 focus:border-white duration-500 placeholder:text-white"
            />
            <img
              src={clicked ? showEye : hideEye}
              alt=""
              onClick={() => {
                setClicked(!clicked);
              }}
              className="absolute w-7 h-7 top-[13px] right-5 cursor-pointer"
            />
          </div>

          <div className="remember_forgot flex justify-between text-sm mb-8">
            <label htmlFor="">
              <input
                type="checkbox"
                className="accent-color mr-1 cursor-pointer"
              />
              Remember me
            </label>
            <a href="#" className="text-white hover:underline">
              Forgot password ?
            </a>
          </div>

          <button
            type="submit"
            className=" w-full h-11 bg-white border-none outline-none rounded-full shadow-md cursor-pointer text-base font-semibold text-gray-800 hover:scale-105 duration-1000"
            onClick={handleSubmit}
          >
            Login
          </button>

          <div className="text-sm mt-8 flex flex-col gap-1 items-center justify-center">
            <p>Dont Have an Account</p>
            <Link
              to="/Register"
              className="underline hover:text-[#0000EE] duration-300"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
