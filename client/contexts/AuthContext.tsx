import React, { createContext, useContext, useState, useEffect } from "react";
import {
  User as FirebaseUser,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { User, ClientProfile, ProfessionalProfile } from "../types";

interface AuthContextType {
  currentUser: FirebaseUser | null;
  userProfile: ClientProfile | ProfessionalProfile | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    userType: "client" | "professionnel",
    additionalData?: any,
  ) => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (
    data: Partial<ClientProfile | ProfessionalProfile>,
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

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<
    ClientProfile | ProfessionalProfile | null
  >(null);
  const [loading, setLoading] = useState(true);

  const loadUserProfile = async (user: FirebaseUser) => {
    try {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const data = userDoc.data() as ClientProfile | ProfessionalProfile;
        setUserProfile(data);
      }
    } catch (error) {
      console.error("Error loading user profile:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        await loadUserProfile(user);
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const register = async (
    email: string,
    password: string,
    userType: "client" | "professionnel",
    additionalData: any = {},
  ) => {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    const baseUserData = {
      uid: user.uid,
      email: user.email!,
      userType,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...additionalData,
    };

    await setDoc(doc(db, "users", user.uid), baseUserData);
    await loadUserProfile(user);
  };

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    await signOut(auth);
  };

  const updateUserProfile = async (
    data: Partial<ClientProfile | ProfessionalProfile>,
  ) => {
    if (!currentUser) throw new Error("No user logged in");

    const updatedData = {
      ...data,
      updatedAt: new Date(),
    };

    await updateDoc(doc(db, "users", currentUser.uid), updatedData);
    await loadUserProfile(currentUser);
  };

  const refreshUserProfile = async () => {
    if (currentUser) {
      await loadUserProfile(currentUser);
    }
  };

  const value = {
    currentUser,
    userProfile,
    loading,
    login,
    register,
    logout,
    updateUserProfile,
    refreshUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
