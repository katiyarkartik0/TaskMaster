import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AuthenticationPage from "./pages/auth/authenticationPage";
import HomePage from "pages/homepage/homepage";
import UnauthorizedPage from "pages/homepage/unauthorizedPage/UnauthorizedPage";
import { OnBoarding } from "pages/onBoarding/OnBoarding";
import React, { useEffect } from "react";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthenticationPage />}></Route>
        <Route path="/todo" element={<HomePage />}></Route>
        <Route path="/" element={<OnBoarding />} />
        <Route path="*" element={<UnauthorizedPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
