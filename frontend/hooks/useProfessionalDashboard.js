import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import { appointmentService } from "../services/appointmentService.js";

export const useProfessionalDashboard = () => {
  const { currentUser, userProfile, loading: authLoading, updateUserProfile } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (authLoading || !currentUser || !userProfile) {
      setLoading(false);
      return;
    }

    if (userProfile?.uid) {
      const unsubscribe = appointmentService.onProfessionalAppointmentsChange(
        userProfile.uid,
        (appointmentsData) => {
          setAppointments(appointmentsData);
          setLoading(false);
        },
      );

      return () => unsubscribe();
    } else {
      setLoading(false);
    }
  }, [currentUser, authLoading, userProfile]);

  const handleValidateAppointment = async (appointmentId) => {
    try {
      await appointmentService.updateAppointment(appointmentId, {
        status: "completed",
      });
    } catch (error) {
      console.error("Erreur lors de la validation:", error);
      setError("Impossible de valider le rendez-vous");
    }
  };

  const handleUpdateServices = async (services) => {
    try {
      await updateUserProfile({ services });
    } catch (error) {
      console.error("Erreur lors de la mise à jour des services:", error);
      setError("Impossible de mettre à jour les services");
    }
  };

  const handleUpdateAvailability = async (availability) => {
    try {
      await updateUserProfile({ availability });
    } catch (error) {
      console.error("Erreur lors de la mise à jour des disponibilités:", error);
      setError("Impossible de mettre à jour les disponibilités");
    }
  };

  const professionalProfile = userProfile;

  return {
    currentUser,
    userProfile,
    professionalProfile,
    appointments,
    loading,
    error,
    authLoading,
    setError,
    handleValidateAppointment,
    handleUpdateServices,
    handleUpdateAvailability,
  };
};
