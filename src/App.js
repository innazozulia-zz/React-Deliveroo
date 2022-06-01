import "./scss/app.scss";

import React from "react";

import Header from "./Components/Header";
import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";

import { Routes, Route } from "react-router-dom";

// import items from "./assets/items.json";

function App() {
  const [searchValue, setSearchValue] = React.useState("");
  return (
    <>
      <div className="wrapper">
        <Header searchValue={searchValue} setSearchValue={setSearchValue} />
        <div className="content">
          <div className="container">
            <Routes>
              <Route path="/" element={<Home searchValue={searchValue} />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
