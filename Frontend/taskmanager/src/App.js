import { BrowserRouter,Routes,Route } from "react-router-dom";
import LoginLayout from "./LoginComponent/LoginLayout";
import Login from "./LoginComponent/Login";
import Signup from "./LoginComponent/SignUp";
import ForgotPassword from "./LoginComponent/ForgotPassword";

function App() {
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginLayout children = {<Login/>}/>} />
      <Route path="/signup" element={<LoginLayout children={<Signup/>}/>}/>
      <Route path="/forgotpassword" element={<LoginLayout children = {<ForgotPassword/>}/>} />
      <Route path="/home" element={<h1>hiiii</h1>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
