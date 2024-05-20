import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth0ProviderWrapper from "./Auth0ProviderWrapper"; // Import Auth0ProviderWrapper
import AdminLogin from "./components/AdminLogin";
import Inventory from "./components/Inventory";
import AddMedicine from "./components/AddMedicine";
import UpdateMedicine from "./components/UpdateMedicine";

function App() {
  return (
    <Auth0ProviderWrapper> {/* Wrap the entire application with Auth0ProviderWrapper */}
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<AdminLogin />} />
          <Route exact path="/" element={<Inventory />} />
          <Route exact path="/addstudent" element={<AddMedicine />} />
          <Route exact path="/updatestudent" element={<UpdateMedicine />} />
          <Route path="/updatestudent/:id" element={<UpdateMedicine />} />
        </Routes>
      </BrowserRouter>
    </Auth0ProviderWrapper>
  );
}

export default App;
