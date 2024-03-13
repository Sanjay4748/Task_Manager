import { BrowserRouter,Routes,Route } from "react-router-dom";
import LoginLayout from "./LoginComponent/LoginLayout";
import Login from "./LoginComponent/Login";
import Signup from "./LoginComponent/SignUp";
import ForgotPassword from "./LoginComponent/ForgotPassword";
import Layout from "./LayoutComponent/Layout";
import HomePage from "./HomeComponent/HomePage";
import ProfilePage from "./HomeComponent/ProfilePage";

function App() {
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginLayout children = {<Login/>}/>} />
      <Route path="/" element={<LoginLayout children={<Signup/>}/>}/>
      <Route path="/forgotpassword" element={<LoginLayout children = {<ForgotPassword/>}/>} />
      <Route path="/home" element={<Layout child={<HomePage/>}/>}/>
      <Route path="/profile" element={<Layout child = {<ProfilePage/>} />}  />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
