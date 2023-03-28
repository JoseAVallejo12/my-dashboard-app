import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isValidEmail, isValidPassword } from "../utils/validators";
import { warningAlert } from "../utils/sweetAlert";
import { handlePasswordVisibility } from "../utils/showPassword";
import { isRegisteredUser } from "../api/auth/authService";
import { HashLoader } from "react-spinners";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    // Validar campos de email y contraseña
    if (!isValidEmail(email)) {
      warningAlert("invalid email", "Ingrese un email válido");
      setLoading(false);
      return;
    }

    if (!isValidPassword(password)) {
      warningAlert("invalid password", "Ingrese una contraseña");
      setLoading(false);
      return;
    }

    if (!isRegisteredUser(email, password)) {
      warningAlert("invalid credentials", "Usuario y/o contraseña incorrectos");
      setLoading(false);
      return;
    }

    setTimeout(() => {
      setLoading(false);
      navigate("/dashboard");
    }, 2000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      {!loading ? (
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
                onChange={(e) => setEmail(e.target.value)}
                required
                // value={username}
                // onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-6 password-input">
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
              {/* <i className="far fa-eye" onClick={handlePasswordVisibility}></i> */}
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                disabled={loading}
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
      ) : (
        <HashLoader loading={loading} color="#36d7b7" />
      )}
    </div>
  );
};
