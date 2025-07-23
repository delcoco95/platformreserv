import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../lib/api";
import { User, ClientProfile, ProfessionalProfile } from "../types";

interface AuthUser {
  uid: string;
  email: string;
  userType: "client" | "professionnel";
  photoURL?: string;
}

interface AuthContextType {
  currentUser: AuthUser | null;
  userProfile: ClientProfile | ProfessionalProfile | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    userType: "client" | "professionnel",
    additionalData?: Partial<ClientProfile | ProfessionalProfile>
  ) => Promise<void>;
  logout: () => Promise<void>;
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

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [userProfile, setUserProfile] = useState<
    ClientProfile | ProfessionalProfile | null
  >(null);
  const [loading, setLoading] = useState(true);

  const loadUserProfile = async (userId: string) => {
    try {
      const profile = await api.get<ClientProfile | ProfessionalProfile>(
        `/users/${userId}`
      );
      setUserProfile(profile);
    } catch (err) {
      console.error("Erreur chargement profil :", err);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post<{ user: AuthUser; token: string }>(
        "/auth/login",
        { email, password }
      );
      const { user, token } = response;
      localStorage.setItem("auth_token", token);
      setCurrentUser(user);
      await loadUserProfile(user.uid);
    } catch (error) {
      console.error("Erreur de connexion :", error);
      throw error;
    }
  };

  const register = async (
    email: string,
    password: string,
    userType: "client" | "professionnel",
    additionalData?: Partial<ClientProfile | ProfessionalProfile>
  ) => {
    try {
      const response = await api.post<{ user: AuthUser; token: string }>(
        "/auth/register",
        {
          email,
          password,
          userType, // ✅ correction ici
          ...additionalData,
        }
      );
      const { user, token } = response;
      localStorage.setItem("auth_token", token);
      setCurrentUser(user);
      await loadUserProfile(user.uid);
    } catch (error) {
      console.error("Erreur d'inscription :", error);
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
    data: Partial<ClientProfile | ProfessionalProfile>
  ) => {
    if (!currentUser) throw new Error("Utilisateur non connecté");

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
      const token = localStorage.getItem("auth_token");
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
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userProfile,
        loading,
        login,
        register,
        logout,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
