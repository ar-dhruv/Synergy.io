import { useState } from "react";

//STYLES
import "./Signup.css";
import signupImage from "../../assets/signup.svg";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [thumbnail, setThumbnail] = useState(null);

  return (
    <div class="grid-container">
      <div class="grid-child">
        <img src={signupImage} alt="image" />
      </div>

      <div class="grid-child">
        <form className="auth-form">
          <h2>Create an account.</h2>
          <label>
            <input
              placeholder="Email"
              required
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </label>
          <label>
            <input
              placeholder="Password"
              required
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </label>
          <label>
            <input
              placeholder="Display Name"
              required
              type="text"
              onChange={(e) => setDisplayName(e.target.value)}
              value={displayName}
            />
          </label>
          <label>
            <span>Display Picture:</span>
            <input required type="file" />
          </label>
          <button className="btn">Sign up</button>
        </form>
      </div>
    </div>
  );
}
