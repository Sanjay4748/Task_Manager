import { BrowserRouter,Routes,Route } from "react-router-dom";
import LoginLayout from "./LoginComponent/LoginLayout";
import Login from "./LoginComponent/Login";
import Signup from "./LoginComponent/SignUp";
import ForgotPassword from "./LoginComponent/ForgotPassword";
import Layout from "./LayoutComponent/Layout";
function App() {
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginLayout children = {<Login/>}/>} />
      <Route path="/" element={<LoginLayout children={<Signup/>}/>}/>
      <Route path="/forgotpassword" element={<LoginLayout children = {<ForgotPassword/>}/>} />
      <Route path="/home" element={<Layout/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
