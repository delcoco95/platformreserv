import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types pour l'authentification
interface User {
  uid: string;
  email: string;
  photoURL?: string;
}

interface UserProfile {
  userType: 'client' | 'professionnel';
  firstName?: string;
  lastName?: string;
  companyName?: string;
  [key: string]: any;
}

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (userData: any) => Promise<void>;
  updateUser: (userData: Partial<UserProfile>) => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Simulation d'authentification pour le développement
  useEffect(() => {
    // Vérifier s'il y a un token en localStorage
    const token = localStorage.getItem('token');
    if (token) {
      // Simuler un utilisateur connecté pour le développement
      setCurrentUser({
        uid: '1',
        email: 'user@example.com',
      });
      setUserProfile({
        userType: 'client',
        firstName: 'John',
        lastName: 'Doe',
      });
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulation d'appel API
      // Dans un vrai projet, on ferait un appel à l'API ici
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user: User = {
        uid: '1',
        email,
      };
      
      const profile: UserProfile = {
        userType: email.includes('pro') ? 'professionnel' : 'client',
        firstName: 'John',
        lastName: 'Doe',
        companyName: email.includes('pro') ? 'Ma Société' : undefined,
      };
      
      setCurrentUser(user);
      setUserProfile(profile);
      localStorage.setItem('token', 'fake-jwt-token');
      
    } catch (err) {
      setError('Erreur de connexion');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: any) => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulation d'appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user: User = {
        uid: '1',
        email: userData.email,
      };
      
      const profile: UserProfile = {
        userType: userData.userType || 'client',
        firstName: userData.firstName,
        lastName: userData.lastName,
        companyName: userData.companyName,
      };
      
      setCurrentUser(user);
      setUserProfile(profile);
      localStorage.setItem('token', 'fake-jwt-token');
      
    } catch (err) {
      setError('Erreur d\'inscription');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setCurrentUser(null);
      setUserProfile(null);
      localStorage.removeItem('token');
    } catch (err) {
      console.error('Erreur de déconnexion:', err);
    }
  };

  const updateUser = (userData: Partial<UserProfile>) => {
    if (userProfile) {
      setUserProfile({ ...userProfile, ...userData });
    }
  };

  const clearError = () => {
    setError(null);
  };

  const value: AuthContextType = {
    currentUser,
    userProfile,
    loading,
    error,
    login,
    logout,
    register,
    updateUser,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
