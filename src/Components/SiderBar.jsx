// import React from 'react';
import { useNavigate } from 'react-router-dom';
import Data from '../assets/data.png';
import Home from '../assets/home.png';
import Logout from '../assets/logout.png';
import Users from '../assets/users.png';
import ('./SideBar.css')

function SiderBar() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("login");
    navigate('/')
  }

  return (
    <>
      <div className="h-screen w-2/12 p-6 bg-[#13122b] flex flex-col font-[Poppins]">
        <div className="w-full flex justify-center text-white text-3xl font-bold mb-32">
          <h1>
            AuthFlow Pro
          </h1>
        </div>

        <div className="flex flex-col gap-12">
          <div className="sidebar-items">
            <img src={Home} alt="" className='w-[25px] h-[25px]' />
            <p>Home Page</p>
          </div>
          <div className='sidebar-items'>
            <img src={Users} alt="" className='w-[25px] h-[25px]' />
            <p>Users</p>
          </div>
          <div className="sidebar-items">
            <img src={Data} alt="" className='w-[25px] h-[25px]' />
            <p>Data</p>
          </div>
          <div className='sidebar-items' onClick={handleLogout}>
            <img src={Logout} alt="" className='w-[25px] h-[25px]' />
            <p>Logout</p>
          </div>
        </div>

      </div>
    </>
  );
}

export default SiderBar;