import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  userType: "client" | "professionnel";
}

export const useSignupRedirection = (
  currentUser: any,
  userProfile: User | null
) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser && userProfile) {
      const redirectPath =
        userProfile.userType === "client"
          ? "/espace-client"
          : "/espace-professionnel";
      navigate(redirectPath, { replace: true });
    }
  }, [currentUser, userProfile, navigate]);
};
