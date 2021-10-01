import "./App.css";

import { React, useEffect } from "react";
import { useDispatch } from "react-redux";
import RoboList from "./components/robo-list";
import Cart from "./components/cart";
import { fetchRoboData } from "./store/robo-thunk";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRoboData())
  }, [dispatch]);

  return (
    <div className="App">
      <header className="header">Robot Market</header>
      <div className="robo-cart">
        <div className="robo-list">
           <RoboList /> 
        </div>
        <div className="cart">
           <Cart /> 
        </div>
      </div>
    </div>
  );
}

export default App;
