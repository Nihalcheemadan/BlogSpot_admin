import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard, Blogs, Category, Users,Login } from "./pages";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* dashboard  */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* pages  */}
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/categories" element={<Category />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
