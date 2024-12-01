import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from "./components/Home.jsx";
import Saved from "./components/Saved.jsx";
import AnimeDetails from "./components/AnimeDetails.jsx";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/anime/:id" element={<AnimeDetails />}></Route>
        <Route path="/saved" element={<Saved />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
