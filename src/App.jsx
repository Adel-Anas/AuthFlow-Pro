import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashBoard from "./Components/DashBoard";
import Login from './Components/Login';
import Register from "./Components/Register";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route exact path='/Register' element={<Register />} />
        <Route exact path='/Dashboard' element={<DashBoard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
