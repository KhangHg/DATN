import { createContext, useEffect, useState } from "react";
import { verifyToken, verifyTokenAdmin } from "../services/auth/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState({});
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token && role && role.toLowerCase() === "user") {
      verifyToken(token)
        .then((res) => {
          if (res.errCodeCheckLogin === 1) {
            setToken(null);
            setUser(null);
            localStorage.removeItem("token");
            localStorage.removeItem("role");
          } else {
            setUser(res.data);
            setToken(token);
          }
        })
        .catch((err) => {
          setToken(null);
        });
    } else if (token && role && role.toLowerCase() === "admin") {
      verifyTokenAdmin(token)
        .then((res) => {
          if (res.errCodeCheckLogin === 1) {
            setToken(null);
            setUser(null);
            localStorage.removeItem("token");
            localStorage.removeItem("role");
          } else {
            setUser(res.data);
            setToken(token);
          }
        })
        .catch((err) => {
          setToken(null);
        });
    }
  }, []);

  const handleLoggedin = (token, user) => {
    console.log(user);
    localStorage.setItem("token", token);
    localStorage.setItem("role", user.role);
    setUser(user);
    setToken(token);
  };

  const handleLoggedOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    handleLoggedin,
    handleLoggedOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
