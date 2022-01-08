import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";

//STYLES
import "./Login.css";
import loginImage from "../../assets/signup.svg";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isPending } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="grid-container">
      <div className="grid-child">
        <img src={loginImage} alt="image" />
      </div>

      <div className="grid-child">
        <form className="auth-form" onSubmit={handleSubmit}>
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
          {!isPending && <button className="btn">Sign up</button>}
          {isPending && (
            <button className="btn" disabled>
              loading...
            </button>
          )}
          {error && <div className="error">{error}</div>}
        </form>
      </div>
    </div>
  );
}
