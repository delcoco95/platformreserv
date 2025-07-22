<<<<<<< HEAD
import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../lib/api";
import { User, ClientProfile, ProfessionalProfile } from "../types";
=======
import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../lib/api";
import { ClientProfile, ProfessionalProfile } from "../types";
>>>>>>> ca4d23a693dc66045048cf272f5860e467ffbf21

interface AuthUser {
  uid: string;
  email: string;
  userType: "client" | "professionnel";
  photoURL?: string;
}

interface AuthContextType {
<<<<<<< HEAD
=======
  token: string | null;
>>>>>>> ca4d23a693dc66045048cf272f5860e467ffbf21
  currentUser: AuthUser | null;
  userProfile: ClientProfile | ProfessionalProfile | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
<<<<<<< HEAD
    userType: "client" | "professionnel",
=======
    userType: "client" | "professionnel"
>>>>>>> ca4d23a693dc66045048cf272f5860e467ffbf21
  ) => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (
    data: Partial<ClientProfile | ProfessionalProfile>,
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
=======
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("auth_token"));
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [userProfile, setUserProfile] = useState<ClientProfile | ProfessionalProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const loadUserProfile = async (uid: string) => {
    try {
      const profile = await api.get<ClientProfile | ProfessionalProfile>(`/users/${uid}`);
>>>>>>> ca4d23a693dc66045048cf272f5860e467ffbf21
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

<<<<<<< HEAD
  const register = async (
    email: string,
    password: string,
    userType: "client" | "professionnel",
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
  };

  const updateUserProfile = async (
    data: Partial<ClientProfile | ProfessionalProfile>,
  ) => {
    if (!currentUser) throw new Error("Utilisateur non connecté");
=======
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
>>>>>>> ca4d23a693dc66045048cf272f5860e467ffbf21

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

<<<<<<< HEAD
  const value = {
=======
  const value: AuthContextType = {
    token,
>>>>>>> ca4d23a693dc66045048cf272f5860e467ffbf21
    currentUser,
    userProfile,
    loading,
    login,
    register,
    logout,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
