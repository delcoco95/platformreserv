import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulation d'une vérification d'authentification
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        // Décoder le token JWT pour obtenir les infos utilisateur
        const payload = JSON.parse(atob(token.split('.')[1]));
        setCurrentUser({ id: payload.id, email: payload.email });
        
        // Simuler un profil utilisateur
        setUserProfile({
          id: payload.id,
          email: payload.email,
          firstName: payload.firstName || "Utilisateur",
          lastName: payload.lastName || "Test",
          userType: payload.userType || "client",
          companyName: payload.companyName,
          profession: payload.profession
        });
      } catch (error) {
        console.error("Erreur lors du décodage du token:", error);
        localStorage.removeItem("token");
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("token", data.token);
        setCurrentUser(data.user);
        setUserProfile(data.user);
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error("Erreur de connexion:", error);
      return { success: false, message: "Erreur de connexion au serveur" };
    }
  };

  const register = async (userData) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("token", data.token);
        setCurrentUser(data.user);
        setUserProfile(data.user);
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error("Erreur d'inscription:", error);
      return { success: false, message: "Erreur de connexion au serveur" };
    }
  };

  const logout = async () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
    setUserProfile(null);
  };

  const value = {
    currentUser,
    userProfile,
    loading,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
