import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../utils/validators";
import { generateToken } from "../utils/generateToken";
import { users } from "../data/users.json";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    // Validar campos de email y contraseña
    if (!validateEmail(email)) {
      alert("Ingrese un email válido");
      setLoading(false);
      return;
    }
    if (!password) {
      alert("Ingrese una contraseña");
      setLoading(false);
      return;
    }

    // Simular validación del servidor con un archivo JSON local
    // const response = await fetch("../data/users.json");
    // const users = await response.json();
    const user = users.find((u: { email: string; password: string }) => u.email === email && u.password === password);

    if (!user) {
      alert("Usuario y/o contraseña incorrectos");
      setLoading(false);
      return;
    }

    // Guardar token en localStorage y redirigir a la página del dashboard
    const token = user.token || "";
    localStorage.setItem("token", token);
    navigate("/dashboard");
  };

  const handlePasswordVisibility = () => {
    const passwordInput = document.getElementById("password") as HTMLInputElement;
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
    } else {
      passwordInput.type = "password";
    }
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Iniciar sesión</h1>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <div className="password-input">
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <i className="far fa-eye" onClick={handlePasswordVisibility}></i>
          </div>
        </div>
        <button type="submit" className="btn-login" disabled={loading}>
          {loading ? "Cargando..." : "Ingresar"}
        </button>
      </form>
    </div>
  );
};
