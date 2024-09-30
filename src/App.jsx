import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import { Toaster } from "react-hot-toast";
// import PrivateRoute from "./components/privateRout/PrivateRout";
import CreatePost from "./components/CreatePost";
import UserDetailsPage from "./components/UserDetailsPage";

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/home" element={<PrivateRoute element={<Home />} />} /> */}
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/home" element={<Home />} />
        <Route path="/userdetails" element={<UserDetailsPage />} />
      </Routes>
    </>
  );
}

export default App;
