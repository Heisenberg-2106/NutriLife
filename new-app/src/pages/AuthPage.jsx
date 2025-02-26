import { useState } from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";
import "../styles/Auth.css"; // ✅ Import the CSS file
import weightliftingGif from "../assets/new-logo.gif";

export default function AuthPage({ setIsAuthenticated }) { // ✅ Accept setIsAuthenticated as a prop
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="auth-container">
            <div className="heading">
                <h1>Smart Eating, Healthier Living.</h1>
            </div>
            <div className="container">
                <div className="auth-wrapper">
                    {/* Left Side: Form */}
                    {isLogin ? (
                        <Login toggle={() => setIsLogin(false)} setIsAuthenticated={setIsAuthenticated} /> 
                    ) : (
                        <Signup toggle={() => setIsLogin(true)} />
                    )}

                    {/* Right Side: GIF & Text */}
                    <div className="auth-info">
                        <img
                            src={weightliftingGif}
                            alt="Welcome Animation"
                            className="auth-gif"
                        />
                        <p className="auth-text">
                            Welcome to our health tracking platform! Join us to stay fit and
                            monitor your progress effortlessly.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
