import { React, useCallback, useEffect, useState } from "react";
import "./App.css";

import RoboList from "./components/RoboList";
import Cart from "./components/Cart";

function App() {
  let [robos, setRobos] = useState([]);

  const fetchRobos = useCallback(async () => {
    const fetchRoboPromise = await fetch("http://localhost:8000/api/robots");
    const roboJson = await fetchRoboPromise.json();

    roboJson.data.forEach((element) => {
      const date = new Date(element.createdAt).getDate();
      const month = new Date(element.createdAt).getMonth() + 1;
      const year = new Date(element.createdAt).getFullYear();
      element.formattedDate = date + "-" + month + "-" + year;
    });
    setRobos(roboJson.data);
  }, []);

  useEffect(() => {
    fetchRobos();
  }, [fetchRobos]);

  return (
    <div className="App">
      <header className="header">Robot Market</header>
      <div className="robo-cart">
        <div className="robo-list">
          <RoboList roboData={robos}></RoboList>
        </div>
        <div className="cart">
          <Cart/>
        </div>
      </div>
    </div>
  );
}

export default App;
