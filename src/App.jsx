import React from "react";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import RootLayout from "./Components/RootLayout";
import Messege from "./Components/Messege";
import Friends from "./Components/Friends";
import Group from "./Components/Group";
import UserList from "./Components/UserList";
import PracticeOne from "./Components/PracticeOne";
import PracticeTwo from "./Components/PracticeTwo";
import PracticeThree from "./Components/PracticeThree";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Nested Routing */}
        <Route path="/" element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/messege" element={<Messege />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/groups" element={<Group />} />
          <Route path="/userlist" element={<UserList />} />
          <Route path="/practiceone" element={<PracticeOne />} />
          <Route path="/practicetwo" element={<PracticeTwo />} />
          <Route path="/practicethree" element={<PracticeThree />} />
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
