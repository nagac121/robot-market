import "./App.css";

import { React, useEffect } from "react";
import { useDispatch } from "react-redux";
import RoboList from "./components/RoboList";
import Cart from "./components/Cart";
import { fetchRoboData } from "./store/robo-thunk";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("useEffect");
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
