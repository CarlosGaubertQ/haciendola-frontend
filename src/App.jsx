import { useState } from "react";
import Login from "./components/Login";
import Product from './components/Product'
import ProtectedRoute from './components/ProtectedRoute'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  const [userLogin, setUserLogin] = useState(false)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login userLogin={userLogin} setUserLogin={setUserLogin} />} />
        <Route path="/product" element={
          <ProtectedRoute userLogin={userLogin}>
            <Product userLogin={userLogin} setUserLogin={setUserLogin} />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
