import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../lib/api";
import { ClientProfile, ProfessionalProfile } from "../types";

interface AuthUser {
  uid: string;
  email: string;
  userType: "client" | "professionnel";
}

interface AuthContextType {
  token: string | null;
  currentUser: AuthUser | null;
  userProfile: ClientProfile | ProfessionalProfile | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    userType: "client" | "professionnel"
  ) => Promise<void>;
  logout: () => void;
  updateUserProfile: (
    data: Partial<ClientProfile | ProfessionalProfile>
  ) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("auth_token"));
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [userProfile, setUserProfile] = useState<ClientProfile | ProfessionalProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const loadUserProfile = async (uid: string) => {
    try {
      const profile = await api.get<ClientProfile | ProfessionalProfile>(`/users/${uid}`);
      setUserProfile(profile);
    } catch (err) {
      console.error("Erreur chargement profil :", err);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const { token, user } = await api.post<{ token: string; user: AuthUser }>(
        "/auth/login",
        { email, password }
      );

      localStorage.setItem("auth_token", token);
      setToken(token);
      setCurrentUser(user);
      await loadUserProfile(user.uid);
    } catch (error) {
      console.error("Erreur de connexion :", error);
      throw error;
    }
  };

  const register = async (email: string, password: string, userType: "client" | "professionnel") => {
    try {
      const { token, user } = await api.post<{ token: string; user: AuthUser }>(
        "/auth/register",
        { email, password, role: userType }
      );

      localStorage.setItem("auth_token", token);
      setToken(token);
      setCurrentUser(user);
      await loadUserProfile(user.uid);
    } catch (error) {
      console.error("Erreur d'inscription :", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    setToken(null);
    setCurrentUser(null);
    setUserProfile(null);
  };

  const updateUserProfile = async (data: Partial<ClientProfile | ProfessionalProfile>) => {
    if (!currentUser) throw new Error("Non connecté");

    try {
      const updatedProfile = await api.put<ClientProfile | ProfessionalProfile>(
        `/users/${currentUser.uid}`,
        data
      );
      setUserProfile(updatedProfile);
    } catch (error) {
      console.error("Erreur mise à jour du profil :", error);
      throw error;
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const user = await api.get<AuthUser>("/auth/me");
        setCurrentUser(user);
        await loadUserProfile(user.uid);
      } catch (err) {
        console.error("Token invalide ou expiré :", err);
        logout();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [token]);

  const value: AuthContextType = {
    token,
    currentUser,
    userProfile,
    loading,
    login,
    register,
    logout,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
