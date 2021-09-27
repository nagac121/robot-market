import * as React from "react";
import styles from "App.module.css";

function App() {
  return (
    <div className="App">
      <header className={styles.header}>Robot Market</header>
      <div>
        <div className="grid"></div>
        <div className="cart"></div>
      </div>
    </div>
  );
}

export default App;
