import React from "react";
import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import SendMoney from "./pages/SendMoney.jsx";
import NotFound from "./pages/NotFound.jsx";

function App() {
  return (
    <Routes>
      <Route path="/sign-in" element={<SignIn />} />
      <Route path='/sign-up' element={<SignUp />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/send' element={<SendMoney />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
