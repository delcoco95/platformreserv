import api from "../lib/api";
import { Appointment } from "../types";

interface CreateAppointmentData {
  clientId: string;
  professionalId: string;
  service: string;
  date: string; // ISO date string
  duration: number;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  price?: number;
  address?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  notes?: string;
}

class AppointmentService {
  // Créer un rendez-vous
  async createAppointment(data: CreateAppointmentData): Promise<Appointment> {
    try {
      return await api.post<Appointment>("/appointments", data);
    } catch (error) {
      console.error("Erreur lors de la création du rendez-vous:", error);
      throw error;
    }
  }

  // Récupérer tous les rendez-vous d'un utilisateur
  async getUserAppointments(userId: string): Promise<Appointment[]> {
    try {
      return await api.get<Appointment[]>(`/appointments/user/${userId}`);
    } catch (error) {
      console.error("Erreur lors de la récupération des rendez-vous:", error);
      throw error;
    }
  }

  // Récupérer tous les rendez-vous d'un professionnel
  async getProfessionalAppointments(professionalId: string): Promise<Appointment[]> {
    try {
      return await api.get<Appointment[]>(`/appointments/professional/${professionalId}`);
    } catch (error) {
      console.error("Erreur lors de la récupération des rendez-vous:", error);
      throw error;
    }
  }

  // Récupérer un rendez-vous par ID
  async getAppointmentById(id: string): Promise<Appointment | null> {
    try {
      return await api.get<Appointment>(`/appointments/${id}`);
    } catch (error) {
      console.error("Erreur lors de la récupération du rendez-vous:", error);
      return null;
    }
  }

  // Mettre à jour un rendez-vous
  async updateAppointment(
    id: string,
    data: Partial<Appointment>
  ): Promise<void> {
    try {
      await api.put(`/appointments/${id}`, data);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du rendez-vous:", error);
      throw error;
    }
  }

  // Supprimer un rendez-vous
  async deleteAppointment(id: string): Promise<void> {
    try {
      await api.delete(`/appointments/${id}`);
    } catch (error) {
      console.error("Erreur lors de la suppression du rendez-vous:", error);
      throw error;
    }
  }

  // Confirmer un rendez-vous
  async confirmAppointment(id: string): Promise<void> {
    try {
      await api.put(`/appointments/${id}/confirm`, {});
    } catch (error) {
      console.error("Erreur lors de la confirmation du rendez-vous:", error);
      throw error;
    }
  }

  // Annuler un rendez-vous
  async cancelAppointment(id: string, reason?: string): Promise<void> {
    try {
      await api.put(`/appointments/${id}/cancel`, { reason });
    } catch (error) {
      console.error("Erreur lors de l'annulation du rendez-vous:", error);
      throw error;
    }
  }

  // Marquer un rendez-vous comme terminé
  async completeAppointment(id: string): Promise<void> {
    try {
      await api.put(`/appointments/${id}/complete`, {});
    } catch (error) {
      console.error("Erreur lors de la finalisation du rendez-vous:", error);
      throw error;
    }
  }

  // Simuler un listener temps réel pour les rendez-vous d'un utilisateur
  onUserAppointmentsChange(
    userId: string,
    callback: (appointments: Appointment[]) => void
  ): () => void {
    let intervalId: NodeJS.Timeout;
    
    const fetchData = async () => {
      try {
        const appointments = await this.getUserAppointments(userId);
        callback(appointments);
      } catch (error) {
        console.error("Erreur lors de la mise à jour des rendez-vous:", error);
      }
    };

    // Récupération initiale
    fetchData();

    // Polling toutes les 30 secondes
    intervalId = setInterval(fetchData, 30000);

    // Fonction de nettoyage
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }

  // Simuler un listener temps réel pour les rendez-vous d'un professionnel
  onProfessionalAppointmentsChange(
    professionalId: string,
    callback: (appointments: Appointment[]) => void
  ): () => void {
    let intervalId: NodeJS.Timeout;
    
    const fetchData = async () => {
      try {
        const appointments = await this.getProfessionalAppointments(professionalId);
        callback(appointments);
      } catch (error) {
        console.error("Erreur lors de la mise à jour des rendez-vous:", error);
      }
    };

    // Récupération initiale
    fetchData();

    // Polling toutes les 30 secondes
    intervalId = setInterval(fetchData, 30000);

    // Fonction de nettoyage
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }
}

export const appointmentService = new AppointmentService();
