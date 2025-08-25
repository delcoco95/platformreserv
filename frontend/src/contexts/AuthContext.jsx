// frontend/src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useMemo } from "react";
import { register as apiRegister, login as apiLogin } from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const register = async (formValues) => {
    setError("");
    setLoading(true);
    try {
      // Construit le payload au bon format dans api.js
      const data = await apiRegister(formValues);

      // L’API renvoie { success, message, token, user }
      if (data?.token) setToken(data.token);
      if (data?.user) setUser(data.user);

      return { ok: true, data };
    } catch (e) {
      setError(e.message);
      return { ok: false, error: e.message };
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    setError("");
    setLoading(true);
    try {
      const data = await apiLogin(credentials);
      if (data?.token) setToken(data.token);
      if (data?.user) setUser(data.user);
      return { ok: true, data };
    } catch (e) {
      setError(e.message);
      return { ok: false, error: e.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  const value = useMemo(
    () => ({ user, token, loading, error, register, login, logout }),
    [user, token, loading, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
