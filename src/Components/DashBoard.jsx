/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SiderBar from "./SiderBar";
import { getAllUsers } from "./store/authSlice";
import("./DashBoard.css");

function DashBoard() {
  const [users, setUsers] = useState([]);
  const [showUpdate, setShowUpdate] = useState(false)
  const navigate = useNavigate();
  const user=useSelector(state=>state.auth)
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(getAllUsers())
  },[dispatch])
  console.log(user);

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4005/users/checkLogin", {
            headers: {
              Authorization:`Bearer ${localStorage.getItem('login')}`,
            },
          });
        if (response.data.loggedIn && response.data.user.role.name === "Super Admin") {
          return 
        } 
        if(response.data.loggedIn){
          return navigate("/Home")
        }

      } catch (error) {
        console.log(error);
      }
    };
    checkLoggedIn();
  }, [navigate]);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        "http://localhost:4005/users/deleteUser", {
          headers: {
            Authorization:`Bearer ${localStorage.getItem('login')}`,
          },
        });
      if (response.data.message) {
        setUsers(users.filter((user) => user._id!== response.data._id));
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:4005/users/getUsers");
      setUsers(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const showUpdateCard = () => {
    setShowUpdate(true);
  }


  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <div className="flex gap-10 overflow-hidden">
        <SiderBar />
        <div className="w-9/12 flex flex-col">
          <div className="flex justify-between py-8 pr-8 mb-16">
            <div>
              <input
                type="text"
                placeholder="Search User"
                className="p-3 border border-black rounded w-72 outline-none"
              />
            </div>
            <div className="flex gap-12">
              <div className="p-4 cursor-pointer hover:bg-sky-500 rounded duration-500">
                Visitor
              </div>
              <div className="p-4 cursor-pointer hover:bg-sky-500 rounded duration-500">
                Moderator
              </div>
              <div className="p-4 cursor-pointer hover:bg-sky-500 rounded duration-500">
                Admin
              </div>
              <div className="p-4 cursor-pointer hover:bg-sky-500 rounded duration-500">
                Super Admin
              </div>
            </div>
            <div></div>
          </div>
          <div className="flex flex-wrap gap-10">
            {users.map((user) => {
              return (
                <>
                  <div className="card w-[600px] p-8 h-32 flex justify-between items-center">
                    <div className="flex flex-col gap-4 text-lg ">
                      <p>User : {user.username}</p>
                      <p>Role : {user.role.name}</p>
                    </div>
                    <div className="relative">
                      <div className="dropDown flex items-center gap-1">
                        <p>Actions</p>
                        <IoIosArrowDropdownCircle />
                        <div className="toShow hidden absolute flex-col py-2 gap-2 top-6 left-[-26px] w-32 bg-white border border-black rounded">
                          <div className="text-center cursor-pointer hover:bg-cyan-950 p-2 duration-300 hover:text-white" onClick={showUpdateCard}>
                            <p>Update</p>
                          </div>
                          <div className="text-center cursor-pointer hover:bg-cyan-950 p-2 duration-300 hover:text-white z-40">
                            <p className="text-red-600">Delete</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
        {
          showUpdate && (
            <>
              <div className="fixed top-0 bottom-0 right-0 left-0 bg-[#00000099] flex items-center justify-center">
                <div className="w-[500px] h-[500px] bg-white rounded flex flex-col items-center p-8">
                  <div>
                    <p>User Info : </p>
                  </div>
                  <button onClick={()=> setShowUpdate(false)}>close</button>
                </div>
              </div>
            </>
          )
        }


      </div>
    </>
  );
}

export default DashBoard;
