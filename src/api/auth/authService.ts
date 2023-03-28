import { users } from "../../data/users.json";

export const isRegisteredUser = (email: string, password: string): boolean => {
  const user = users.find(
    (user) => user.email === email && user.password === password
  );
  if (user) {
    const token = user.token || "";
    localStorage.setItem("token", token);
    return true;
  }
  return false;
};
