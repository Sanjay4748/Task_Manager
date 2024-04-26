import { BrowserRouter,Routes,Route } from "react-router-dom";
import LoginLayout from "./LoginComponent/LoginLayout";
import Login from "./LoginComponent/Login";
import Signup from "./LoginComponent/SignUp";
import ForgotPassword from "./LoginComponent/ForgotPassword";
import Layout from "./LayoutComponent/Layout";
import HomePage from "./HomeComponent/HomePage";
import ProfilePage from "./HomeComponent/ProfilePage";
import ChangePassword from "./HomeComponent/ChangePassword";
import Viewtasks from "./TasksComponent/ViewTasks";
import Updatetask from "./TasksComponent/UpdateTasks";
import Deletetask from "./TasksComponent/DeleteTasks";
import Addtask from "./TasksComponent/AddTasks";

function App() {
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginLayout children = {<Login/>}/>} />
      <Route path="/" element={<LoginLayout children={<Signup/>}/>}/>
      <Route path="/forgotpassword" element={<LoginLayout children = {<ForgotPassword/>}/>} />
      <Route path="/home" element={<Layout child={<HomePage/>}/>}/>
      <Route path="/profile" element={<Layout child = {<ProfilePage/>} />}  />
      <Route path="/changepassword" element={<Layout child={<ChangePassword/>} />} />
      <Route path="/alltasks" element={<Layout child={<Viewtasks/>}/>}/>
      <Route path="/addtask" element={<Layout child={<Addtask/>}/>}/>
      <Route path="/updatetask" element={<Layout child={<Updatetask/>}/>}/>
      <Route path="/deletetask" element={<Layout child={<Deletetask/>}/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
