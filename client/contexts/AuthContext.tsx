<<<<<<< HEAD
import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../lib/api";
import { User, ClientProfile, ProfessionalProfile } from "../types";
=======
import React, { createContext, useContext, useEffect, useState } from "react";
import { BaseUser, ClientProfile, ProfessionalProfile } from "../types";
>>>>>>> 0d881a0800230b4644cf4abc1a9f3314ee9e0aa0

interface AuthUser {
  uid: string;
  email: string;
  userType: "client" | "professionnel";
}

interface AuthContextType {
<<<<<<< HEAD
  currentUser: AuthUser | null;
=======
  token: string | null;
>>>>>>> 0d881a0800230b4644cf4abc1a9f3314ee9e0aa0
  userProfile: ClientProfile | ProfessionalProfile | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    userType: "client" | "professionnel",
<<<<<<< HEAD
=======
    additionalData?: any
>>>>>>> 0d881a0800230b4644cf4abc1a9f3314ee9e0aa0
  ) => Promise<void>;
  logout: () => void;
  updateUserProfile: (
    data: Partial<ClientProfile | ProfessionalProfile>
  ) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

<<<<<<< HEAD
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [userProfile, setUserProfile] = useState<
    ClientProfile | ProfessionalProfile | null
  >(null);
  const [loading, setLoading] = useState(true);

  const loadUserProfile = async (user: AuthUser) => {
    try {
      const profile = await api.get<ClientProfile | ProfessionalProfile>(
        `/users/${user.uid}`,
      );
      setUserProfile(profile);
    } catch (error) {
      console.error("Erreur lors du chargement du profil:", error);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post<{ user: AuthUser; token: string }>(
        "/auth/login",
        {
          email,
          password,
        },
      );

      localStorage.setItem("auth_token", response.token);
      setCurrentUser(response.user);
      await loadUserProfile(response.user);
    } catch (error) {
      console.error("Erreur de connexion:", error);
      throw error;
    }
  };
=======
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
>>>>>>> 0d881a0800230b4644cf4abc1a9f3314ee9e0aa0

  const register = async (
    email: string,
    password: string,
    userType: "client" | "professionnel",
<<<<<<< HEAD
  ) => {
    try {
      const response = await api.post<{ user: AuthUser; token: string }>(
        "/auth/register",
        {
          email,
          password,
          userType,
        },
      );

      localStorage.setItem("auth_token", response.token);
      setCurrentUser(response.user);
      await loadUserProfile(response.user);
    } catch (error) {
      console.error("Erreur d'inscription:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Erreur de déconnexion:", error);
    } finally {
      localStorage.removeItem("auth_token");
      setCurrentUser(null);
      setUserProfile(null);
    }
=======
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
>>>>>>> 0d881a0800230b4644cf4abc1a9f3314ee9e0aa0
  };

  const updateUserProfile = async (
    data: Partial<ClientProfile | ProfessionalProfile>
  ) => {
<<<<<<< HEAD
    if (!currentUser) throw new Error("Utilisateur non connecté");

    try {
      const updatedProfile = await api.put<ClientProfile | ProfessionalProfile>(
        `/users/${currentUser.uid}`,
        data,
      );
      setUserProfile(updatedProfile);
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
      throw error;
=======
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
>>>>>>> 0d881a0800230b4644cf4abc1a9f3314ee9e0aa0
    }

    await refreshUserProfile();
  };

  // Vérifier l'authentification au chargement
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("auth_token");
      if (token) {
        try {
          const user = await api.get<AuthUser>("/auth/me");
          setCurrentUser(user);
          await loadUserProfile(user);
        } catch (error) {
          console.error("Token invalide:", error);
          localStorage.removeItem("auth_token");
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const value = {
    token,
    userProfile,
    loading,
    login,
    register,
    logout,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
