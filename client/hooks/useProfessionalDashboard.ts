import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { appointmentService } from "../services/appointmentService";
import { Appointment, ProfessionalProfile } from "../types";

export const useProfessionalDashboard = () => {
  const { currentUser, userProfile, loading: authLoading, updateUserProfile } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (authLoading || !currentUser || !userProfile) {
      setLoading(false);
      return;
    }

    // Charger les rendez-vous du professionnel
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

  const handleValidateAppointment = async (appointmentId: string) => {
    try {
      await appointmentService.updateAppointment(appointmentId, {
        status: "completed",
      });
    } catch (error) {
      console.error("Erreur lors de la validation:", error);
      setError("Impossible de valider le rendez-vous");
    }
  };

  const handleUpdateServices = async (services: any[]) => {
    try {
      await updateUserProfile({ services });
    } catch (error) {
      console.error("Erreur lors de la mise à jour des services:", error);
      setError("Impossible de mettre à jour les services");
    }
  };

  const handleUpdateAvailability = async (availability: any) => {
    try {
      await updateUserProfile({ availability });
    } catch (error) {
      console.error("Erreur lors de la mise à jour des disponibilités:", error);
      setError("Impossible de mettre à jour les disponibilités");
    }
  };

  const professionalProfile = userProfile as ProfessionalProfile;

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
