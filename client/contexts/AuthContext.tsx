import React, { createContext, useContext, useEffect, useState } from "react";
import { BaseUser, ClientProfile, ProfessionalProfile } from "../types";

interface AuthContextType {
  token: string | null;
  userProfile: ClientProfile | ProfessionalProfile | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    userType: "client" | "professionnel",
    additionalData?: any
  ) => Promise<void>;
  logout: () => void;
  updateUserProfile: (
    data: Partial<ClientProfile | ProfessionalProfile>
  ) => Promise<void>;
  refreshUserProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [userProfile, setUserProfile] = useState<ClientProfile | ProfessionalProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const API_URL = "http://localhost:5000/api"; // adapte à ton environnement

  const refreshUserProfile = async () => {
    if (!token) return;
    try {
      const res = await fetch(`${API_URL}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setUserProfile(data);
      } else {
        logout();
      }
    } catch (err) {
      console.error("Erreur lors du chargement du profil", err);
    }
  };

  useEffect(() => {
    if (token) {
      refreshUserProfile().finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [token]);

  const register = async (
    email: string,
    password: string,
    userType: "client" | "professionnel",
    additionalData: any = {}
  ) => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        role: userType,
        email,
        password,
        ...additionalData,
      }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Erreur d’inscription");
    }

    const data = await res.json();
    localStorage.setItem("token", data.token);
    setToken(data.token);
    await refreshUserProfile();
  };

  const login = async (email: string, password: string) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Erreur de connexion");
    }

    const data = await res.json();
    localStorage.setItem("token", data.token);
    setToken(data.token);
    await refreshUserProfile();
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUserProfile(null);
  };

  const updateUserProfile = async (
    data: Partial<ClientProfile | ProfessionalProfile>
  ) => {
    if (!token) throw new Error("Utilisateur non connecté");

    const res = await fetch(`${API_URL}/users/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Erreur lors de la mise à jour");
    }

    await refreshUserProfile();
  };

  const value = {
    token,
    userProfile,
    loading,
    login,
    register,
    logout,
    updateUserProfile,
    refreshUserProfile,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
