import { React, useCallback, useEffect, useState } from "react";
import styles from "./App.module.css";

import RoboList from "./components/RoboList";

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
    <div className={styles.App}>
      <header className={styles.header}>Robot Market</header>
      <div>
        <RoboList className="RoboList" roboData={robos}></RoboList>
        <div className="cart"></div>
      </div>
    </div>
  );
}

export default App;
