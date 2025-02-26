import "./Daily_Log.css";
import { useState } from "react";

export default function App() {
  const [calories, setCalories] = useState(1800);
  
  return (
    <div className="dashboard">
      <h1 className="title">🌿 Daily Nutrition Dashboard</h1>
      <div className="card-container">
        <div className="card protein">
          <h2>Protein</h2>
          <p>75g</p>
        </div>
        <div className="card carbs">
          <h2>Carbs</h2>
          <p>250g</p>
        </div>
        <div className="card fats">
          <h2>Fats</h2>
          <p>70g</p>
        </div>
      </div>
      <button className="add-calories" onClick={() => setCalories(calories + 100)}>
        Add 100 Calories 🍏
      </button>
      <p className="calories">Total Calories: {calories} kcal</p>
    </div>
  );
}