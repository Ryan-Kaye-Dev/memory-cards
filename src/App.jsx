import { useState } from "react";
import "./App.css";
import Card from "./components/Card";

function App() {
  return (
    <div className="cardWrapper">
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  );
}

export default App;
