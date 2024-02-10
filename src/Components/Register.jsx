import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Background from '../assets/background.jfif';
import showEye from '../assets/hideIcon.png';
import hideEye from '../assets/showIcon.png';

function Register() {
  const navigate = useNavigate()
  const [clicked, setClicked] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.post('http://Localhost:3000', formData)
        setFormData({
            username: '',
            email: '',
            password: '',
        })
        alert('Account Created Successfully')
        navigate('/')
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-cover bg-center" style={{backgroundImage : `url(${Background})`}}>
            <div className="wrapper bg-transparent border-2 border-white border-opacity-20 backdrop-filter backdrop-blur-lg shadow-lg text-white rounded-lg p-8 w-[420px]">
                <h1 className="text-3xl text-center mb-8">Sign Up</h1>

                <div className="input_box w-full h-14 mb-8 relative">
                    <input type="text" placeholder="Username" value={formData.username} onChange={(e) => setFormData({...formData, username: e.target.value})}  className="w-full h-full bg-transparent outline-none border-2 border-[#ffffff33] rounded-full text-white px-6 focus:border-white duration-500 placeholder:text-white" />
                </div>

                <div className="input_box w-full h-14 mb-8 relative">
                    <input type="text" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}  className="w-full h-full bg-transparent outline-none border-2 border-[#ffffff33] rounded-full text-white px-6 focus:border-white duration-500 placeholder:text-white" />
                </div>

                <div className="input_box w-full h-14 mb-8 relative">
                    <input type={clicked ? 'text' : 'password'} placeholder="Password" className=" w-full h-full bg-transparent outline-none border-2 border-[#ffffff33] rounded-full text-white px-6 focus:border-white duration-500 placeholder:text-white" />
                    <img src={clicked ? showEye : hideEye} alt="" onClick={()=>{setClicked(!clicked)}} className='absolute w-7 h-7 top-[13px] right-5 cursor-pointer'/>
                </div>

                <div className="input_box w-full h-14 mb-8 relative">
                    <input type={confirm ? 'text' : 'password'} value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} placeholder="Confirm Password" className=" w-full h-full bg-transparent outline-none border-2 border-[#ffffff33] rounded-full text-white px-6 focus:border-white duration-500 placeholder:text-white" />
                    <img src={confirm ? showEye : hideEye} alt="" onClick={()=>{setConfirm(!confirm)}} className='absolute w-7 h-7 top-[13px] right-5 cursor-pointer'/>
                </div>

                <button type="submit" className=" w-full h-11 bg-white border-none outline-none rounded-full shadow-md cursor-pointer text-base font-semibold text-gray-800 hover:scale-105 duration-1000" onClick={handleSubmit}>Sign Up</button>

                <div className="register_link text-sm items-center justify-center mt-8 flex flex-col gap-1">
                    <p>Already Have an Account?</p>
                    <Link to='/' className='underline hover:text-[#0000EE] duration-300'>Login</Link>
                </div>
            </div>
        </div>
    </>
  );
}

export default Register;