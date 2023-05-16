import React from "react";
import Box from "@mui/material/Box";
import { useState } from "react";
import "./Registration.scss";
import { Typography } from "@mui/material";

const Registration = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const getUserInfo = async () => {
    try {
      const response = await fetch("http://localhost:4206/user/" + email, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching user info:", error);
      throw error;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsPending(true);

    fetch("http://localhost:4206/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      }),
    })
      .then(async (res) => {
        const token = await res.json();
        localStorage.setItem("token", token);
        setIsPending(false);
        if (res.status === 200) {
          const user = await getUserInfo();
          localStorage.setItem("user", JSON.stringify(user));
          setError(null);
          window.location.href = "/";
        } else {
          res.status === 401
            ? setError("Identifiants incorrects")
            : setError("Une erreur est survenue");
        }
      })
      .catch((err) => {
        setIsPending(false);
        setError(err.message);
      });
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
        <div className="container">
          <div className="form-container sign-in-container">
            <form action="#">
              <h1>Inscription</h1>
              <br />
              <label>
                <input
                  type="text"
                  placeholder="Prénom"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>
              <label>
                <input
                  type="text"
                  placeholder="Nom"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>
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
              <a href="/login">Déjà un compte ?</a>
              {!isPending && <button onClick={handleSubmit}>Valider</button>}
              {isPending && <button disabled>Création...</button>}
              {error && (
                <div>
                  <br />
                  <Typography color="error" variant="body3">
                    {error}
                  </Typography>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </Box>
  );
};

export default Registration;
