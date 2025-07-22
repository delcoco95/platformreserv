import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { appointmentService } from "../services/appointmentService";
import { professionalService } from "../services/professionalService";
import { Appointment, ClientProfile, ProfessionalProfile } from "../types";
import { formatDate, formatTime } from "../lib/dateUtils";

export const useClientDashboardLogic = () => {
  const { currentUser, userProfile, loading: authLoading } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [lastProfessional, setLastProfessional] = useState<ProfessionalProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showEditProfile, setShowEditProfile] = useState(false);

  const clientProfile: ClientProfile | null =
    userProfile?.userType === "client" ? (userProfile as ClientProfile) : null;

  const parseDate = (rawDate: any): Date => {
    if (!rawDate) return new Date(0);
    const parsed = new Date(rawDate);
    return isNaN(parsed.getTime()) ? new Date(0) : parsed;
  };

  useEffect(() => {
    if (authLoading) return;
    if (!currentUser) {
      setLoading(false);
      return;
    }

    const unsubscribe = appointmentService.onClientAppointmentsChange(
      currentUser.uid,
      async (appointmentsData) => {
        setAppointments(appointmentsData);

        if (appointmentsData.length > 0) {
          const lastAppointment = appointmentsData.sort((a, b) => {
            const dateA = parseDate(a.date);
            const dateB = parseDate(b.date);
            return dateB.getTime() - dateA.getTime();
          })[appointmentsData.length - 1];

          if (lastAppointment.professionalId) {
            try {
              const professionals = await professionalService.getAllProfessionals();
              const professional = professionals.find(
                (p) => p.uid === lastAppointment.professionalId,
              );
              if (professional) setLastProfessional(professional);
            } catch (error) {
              console.error("Erreur pro :", error);
            }
          }
        }

        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, [currentUser, authLoading]);

  const handleCancelAppointment = async (appointmentId: string) => {
    try {
      await appointmentService.cancelAppointment(appointmentId);
    } catch (error) {
      console.error("Erreur annulation:", error);
      setError("Impossible d'annuler le rendez-vous");
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      confirmed: { className: "bg-green-100 text-green-800", label: "Confirmé" },
      pending: { className: "bg-yellow-100 text-yellow-800", label: "En attente" },
      completed: { className: "bg-blue-100 text-blue-800", label: "Terminé" },
      cancelled: { className: "bg-red-100 text-red-800", label: "Annulé" },
    };

    return statusConfig[status as keyof typeof statusConfig] || { 
      className: "bg-gray-100 text-gray-800", 
      label: status 
    };
  };

  const upcomingAppointments = appointments.filter((apt) => {
    if (!apt.date) return false;
    const date = parseDate(apt.date);
    return date > new Date() && apt.status !== "cancelled";
  });

  const pastAppointments = appointments.filter((apt) => {
    if (!apt.date) return false;
    const date = parseDate(apt.date);
    return date <= new Date() || apt.status === "completed";
  });

  const completedAppointmentsCount = pastAppointments.filter(
    (apt) => apt.status === "completed"
  ).length;

  return {
    // État
    currentUser,
    userProfile,
    clientProfile,
    appointments,
    lastProfessional,
    loading: authLoading || loading,
    error,
    showEditProfile,
    upcomingAppointments,
    pastAppointments,
    completedAppointmentsCount,
    
    // Actions
    setError,
    setShowEditProfile,
    handleCancelAppointment,
    getStatusBadge,
    
    // Utilitaires
    parseDate,
    formatDate,
    formatTime,
  };
};
