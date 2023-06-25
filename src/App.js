import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Informations from "./Components/Informations/Informations";
import PostInformation from "./Components/PostInformation/PostInformation";
import MyInformations from "./Components/MyInformations/MyInformations";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <Navbar />
                            <Informations />
                        </>
                    }
                />
                <Route
                    path="/post"
                    element={
                        <>
                            <Navbar />
                            <PostInformation />
                        </>
                    }
                />
                <Route
                    path="/my-informations"
                    element={
                        <>
                            <Navbar />
                            <MyInformations />
                        </>
                    }
                />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
