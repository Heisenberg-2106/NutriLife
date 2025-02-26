import { useState } from "react";
import Navbar from "../components/Navbar";
import BMIBMRCalculator from "../components/BMIBMRCalculator";
import "../styles/Home.css";
import routinegif from "../assets/routine.gif";
import veggiesgif from "../assets/veggies.gif";

export default function Home() {
  const [bmiBmrData, setBmiBmrData] = useState(null);

  const saveBMIBMR = (data) => {
    setBmiBmrData(data);
    console.log("Saved BMI & BMR:", data); // You can replace this with API call or local storage
  };

  return (
    <div className="home-container">
      <Navbar />
      <div className="hero">
        <h1>🥑 Track Your Nutrition & Health 🏋️</h1>
        <p>Stay fit with NutriLife</p>
      </div>

      <div className="content">
        <p>Your body is unique, and so are your health needs. Understanding your 
            BMI (Body Mass Index) and BMR (Basal Metabolic Rate) can unlock the 
            key to better fitness, weight management, and an energized lifestyle.</p>

            <h3>✨ What You Get with NutriLife?</h3>
            <ul>
                <li>✅ Personalized Health Insights - Know if you're on the right track with BMI & BMR analysis.</li>
                <li>✅ Smarter Nutrition - Get tailored food recommendations based on your body's needs.</li>
                <li>✅ Track Your Progress - Watch your journey with beautiful graphs & analytics.</li>
                <li>✅ Effortless Logging - Log meals, water intake, and workouts seamlessly.</li>
                <li>✅ AI-Powered Chatbot - Get instant guidance on fitness & nutrition!</li>
            </ul>
      </div>

        <div className="images">
            {/*<img src = {routinegif} alt = "routine image" className = "images-img"/>*/}
            {/* Replacing old BMI Calculator with BMIBMRCalculator */}
            <BMIBMRCalculator saveBMIBMR={saveBMIBMR} />
            <img src = {veggiesgif} alt = "bowl of veggies" className="images-img"/>
        </div>
      

      {bmiBmrData && (
        <div className="saved-results">
          <h3>Saved Results</h3>
          <p>BMI: {bmiBmrData.bmi}</p>
          <p>BMR: {bmiBmrData.bmr} kcal/day</p>
        </div>
      )}
    </div>
  );
}
