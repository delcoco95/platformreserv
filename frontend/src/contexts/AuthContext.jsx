import { createContext, useContext, useState, useEffect } from "react";
import api from "../utils/api.js";

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    console.error("useAuth must be used within an AuthProvider");
    return {
      currentUser: null,
      userProfile: null,
      loading: false,
      login: async () => {},
      register: async () => {},
      logout: async () => {},
      updateUserProfile: async () => {},
    };
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUserProfile = async (userId) => {
    try {
      const profile = await api.get(`/users/${userId}`);
      setUserProfile(profile);
    } catch (err) {
      console.error("Erreur chargement profil :", err);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      const { user, token } = response;
      localStorage.setItem("auth_token", token);
      setCurrentUser(user);
      await loadUserProfile(user.uid);
    } catch (error) {
      console.error("Erreur de connexion :", error);
      throw error;
    }
  };

  const register = async (email, password, userType, additionalData = {}) => {
    try {
      const response = await api.post("/auth/register", {
        email,
        password,
        userType,
        ...additionalData,
      });
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

  const updateUserProfile = async (data) => {
    if (!currentUser) throw new Error("Utilisateur non connecté");

    try {
      const updatedProfile = await api.put(`/users/${currentUser.uid}`, data);
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
        const user = await api.get("/auth/me");
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
