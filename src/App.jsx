import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashBoard from "./Components/DashBoard";
import HomePage from "./Components/HomePage";
import Login from './Components/Login';
import Register from "./Components/Register";
import store from "./Components/store/store";

function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Login />} />
          <Route exact path='/Register' element={<Register />} />
          <Route exact path='/Dashboard' element={<DashBoard />} />
          <Route exact path='/Home' element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
