import React, { useState } from "react";
import "../styles/BMIBMRCalculator.css";

export default function BMIBMRCalculator({ saveBMIBMR }) {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [bmi, setBMI] = useState(null);
  const [bmr, setBMR] = useState(null);

  const calculateBMI = () => {
    const bmiValue = (weight / (height * height)) * 10000;
    setBMI(bmiValue.toFixed(2));
  };

  const calculateBMR = () => {
    const bmrValue = 10 * weight + 6.25 * height - 5 * age + 5; // Mifflin-St Jeor
    setBMR(bmrValue.toFixed(2));
  };

  const handleSave = () => {
    saveBMIBMR({ bmi, bmr });
  };

  return (
    <div className="bmi-calculator">
      <h2>BMI & BMR Calculator</h2>
      <input type="number" placeholder="Weight (kg)" onChange={(e) => setWeight(e.target.value)} />
      <input type="number" placeholder="Height (cm)" onChange={(e) => setHeight(e.target.value)} />
      <input type="number" placeholder="Age" onChange={(e) => setAge(e.target.value)} />
      <button onClick={calculateBMI}>Calculate BMI</button>
      <button onClick={calculateBMR}>Calculate BMR</button>
      {bmi && <p>Your BMI: {bmi}</p>}
      {bmr && <p>Your BMR: {bmr} kcal/day</p>}
      <button onClick={handleSave}>Save to Profile</button>
    </div>
  );
}
