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
    // <div className="login-page">
    //   <form className="login-form" onSubmit={handleSubmit}>
    //     <h1>Iniciar sesión</h1>
    //     <div className="form-group">
    //       <label htmlFor="email">Email</label>
    //       <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
    //     </div>
    //     <div className="form-group">
    //       <label htmlFor="password">Contraseña</label>
    //       <div className="password-input">
    //         <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
    //         <i className="far fa-eye" onClick={handlePasswordVisibility}></i>
    //       </div>
    //     </div>
    //     <button type="submit" className="btn-login" disabled={loading}>
    //       {loading ? "Cargando..." : "Ingresar"}
    //     </button>
    //   </form>
    // </div>
    <div className="flex items-center justify-center min-h-screen">
    <div className="w-full max-w-md">
      <form
        onSubmit={handleSubmit}
        // onSubmit={handleLogin}
        className="bg-white shadow-lg rounded px-12 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="username"
          >
            email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Enter your username"
            value={email}
            onChange={(e) => setEmail(e.target.value)} required
            // value={username}
            // onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button type="submit" disabled={loading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {loading ? "Cargando..." : "Ingresar"}
          </button>
          <a
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="#"
          >
            Forgot Password?
          </a>
        </div>
      </form>
      <p className="text-center text-gray-500 text-xs">
        &copy;2023 Acme Corporation. All rights reserved.
      </p>
    </div>
  </div>
  );
};
