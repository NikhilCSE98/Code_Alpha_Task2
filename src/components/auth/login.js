import React from "react";
import { loginEndpoint } from "../../spotify";  // Import from the above file
import './login.css';

const Login = () => {
    return (
        <div className="login-page">
            <img src="logo_url" alt="VibeStream" className="logo" />  {/* Replace with your logo */}
            <a href={loginEndpoint}>
                <div className="login-btn">Log in with Spotify</div>
            </a>
        </div>
    );
}

export default Login;