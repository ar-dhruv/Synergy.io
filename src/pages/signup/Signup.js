import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";

//STYLES
import "./Signup.css";
import signupImage from "../../assets/signup.svg";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);
  const { signup, isPending, error } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password, displayName, thumbnail);
  };

  const handleFileChange = (e) => {
    setThumbnail(null);
    let selected = e.target.files[0]; //.FILES RETURNS AN ARRAY OF ALL THE SELECTED FILES BUT WE ALLOW ONLY ONE PICTURE FOR THE DP SO FILES[0]
    console.log(selected);

    //ERROR IF YOU DONT SELECT A DISPLAY PICTURE
    if (!selected) {
      setThumbnailError("Please select your Avatar");
      return;
    }

    //ERROR IF THE SELECTED FILE IS NOT A IMAGE FILE
    if (!selected.type.includes("image")) {
      setThumbnailError("Selected file must be an image");
      return;
    }

    //ERROR FOR SIZE OF THE FILE THAT IS SELECTED
    if (selected.size > 250000) {
      setThumbnailError("Image file size must be less than 250kb");
      return;
    }

    //WE REACH HERE WHEN THERE IS NO ERROR i.e VALID IMAGE FILE
    setThumbnailError(null);
    setThumbnail(selected);
    console.log("thumbnail updated");
  };

  return (
    <div className="grid-container">
      <div className="grid-child">
        <img src={signupImage} alt="image" />
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
            <input required type="file" onChange={handleFileChange} />
            {thumbnailError && <div className="error">{thumbnailError}</div>}
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
