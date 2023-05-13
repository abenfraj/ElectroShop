import * as React from "react";
import Box from "@mui/material/Box";
import { useState } from "react";
import "./Login.scss";
import { Typography } from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsPending(true);

    fetch("http://localhost:4206/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => {
        res.json()
        setIsPending(false);
        if (res.status === 200) {
          setError(null);
          window.location.replace("/");
        } else {
          res.status === 401 ? setError("Identifiants incorrects") : setError("Une erreur est survenue");
        }
      })
      .catch((err) => {
        setIsPending(false);
        setError(err.message);
      }
      );
  };

  return (
    <Box
      className="main-container"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
      }}
    >
      <section>
        <div className="container" id="container">
          <div className="form-container login-sign-in-container">
            <form action="#">
              <h1>Connectez-vous !</h1>
              <br />
              <span>Indiquez vos identifiants</span>
              <label>
                <input
                  type="email"
                  placeholder="Adresse mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <label>
                <input
                  type="password"
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              <a href="#">Mot de passe oublié ?</a>
              {!isPending && (
                <button onClick={handleSubmit}>Valider</button>
              )}
              {isPending && <button disabled>Connexion...</button>}
              {error && (
                <div>
                  <br />
                  <Typography color="error" variant="body3"
                  >{error}</Typography>
                </div>
              )}
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-right">
                <h1>Créez un compte !</h1>
                <p>Inscrivez-vous si vous n'avez pas encore de compte</p>
                <button
                  className="ghost"
                  onClick={() => window.location.replace("/register")}
                >
                  S'inscrire
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Box>
  );
};

export default Login;
