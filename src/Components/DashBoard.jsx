/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";

function DashBoard() {
 const [users, setUsers] = useState([])
 const [data, setData] = useState([])

  const getUsers = async () => {
    try{
      const response = await axios.get('http://localhost:4005/users/getUsers')
      setUsers(response.data)
      console.log(response.data)
    }catch(err){
      console.log(err);
    }
  }

  const fecthData = async () => {
    try{
      const response = await axios.get('http://localhost:4005/api/getData')
      setData(response.data)
      console.log(response)
    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    getUsers()
  },[])

  return (
    <>
      <div className="flex flex-col gap-7">
        {users.map((user) =>{
          return(
            <>
            <div>
              <h1>{user.name}</h1>
              <h2>{user.email}</h2>
              <h3>{user.role}</h3>
            </div>
            </>
          )
        })}
      </div>

      <button onClick={fecthData}>CLICK ON ME TO FETCH DATA</button>

      {data.map((item)=>{
        return(
          <>
            <div>
              <p>{data.name}</p>
              <p>{data.email}</p>
              <p>{data.phone}</p>
              <p>{data.message}</p>
            </div>
          </>
        )
      })}
    </>
  );
}

export default DashBoard;