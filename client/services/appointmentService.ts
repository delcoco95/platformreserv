import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  orderBy,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { Appointment } from "../types";

// Données démo pour les rendez-vous
const demoAppointments: Appointment[] = [
  {
    id: "demo-apt-1",
    clientId: "demo-client-1",
    professionalId: "demo-1",
    service: "Révision complète",
    date: Timestamp.fromDate(new Date(Date.now() + 86400000)), // Demain
    duration: 120,
    status: "confirmed",
    price: 150,
    address: "123 Rue de la République, 75001 Paris",
    coordinates: { lat: 48.8566, lng: 2.3522 },
    notes: "Véhicule: Renault Clio 2018",
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  },
  {
    id: "demo-apt-2",
    clientId: "demo-client-1",
    professionalId: "demo-2",
    service: "Réparation fuite",
    date: Timestamp.fromDate(new Date(Date.now() - 86400000)), // Hier
    duration: 60,
    status: "completed",
    price: 85,
    address: "456 Avenue des Champs, 75008 Paris",
    coordinates: { lat: 48.8566, lng: 2.3522 },
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  },
];

export const appointmentService = {
  // Créer un nouveau rendez-vous
  async createAppointment(
    appointmentData: Omit<Appointment, "id" | "createdAt" | "updatedAt">,
  ) {
    const docRef = await addDoc(collection(db, "appointments"), {
      ...appointmentData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return docRef.id;
  },

  // Récupérer les rendez-vous d'un client
  async getClientAppointments(clientId: string) {
    try {
      if (!auth.currentUser) {
        return demoAppointments.filter((apt) => apt.clientId === clientId);
      }

      const q = query(
        collection(db, "appointments"),
        where("clientId", "==", clientId),
        orderBy("date", "desc"),
      );
      const snapshot = await getDocs(q);
      const appointments = snapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() }) as Appointment,
      );

      return appointments.length > 0
        ? appointments
        : demoAppointments.filter((apt) => apt.clientId === clientId);
    } catch (error) {
      console.warn(
        "Erreur Firebase pour les rendez-vous client, utilisation des données démo:",
        error,
      );
      return demoAppointments.filter((apt) => apt.clientId === clientId);
    }
  },

  // Récupérer les rendez-vous d'un professionnel
  async getProfessionalAppointments(professionalId: string) {
    try {
      if (!auth.currentUser) {
        return demoAppointments.filter(
          (apt) => apt.professionalId === professionalId,
        );
      }

      const q = query(
        collection(db, "appointments"),
        where("professionalId", "==", professionalId),
        orderBy("date", "desc"),
      );
      const snapshot = await getDocs(q);
      const appointments = snapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() }) as Appointment,
      );

      return appointments.length > 0
        ? appointments
        : demoAppointments.filter(
            (apt) => apt.professionalId === professionalId,
          );
    } catch (error) {
      console.warn(
        "Erreur Firebase pour les rendez-vous professionnel, utilisation des données démo:",
        error,
      );
      return demoAppointments.filter(
        (apt) => apt.professionalId === professionalId,
      );
    }
  },

  // Écouter les changements en temps réel pour un client
  onClientAppointmentsChange(
    clientId: string,
    callback: (appointments: Appointment[]) => void,
  ) {
    try {
      if (!auth.currentUser) {
        const filtered = demoAppointments.filter(
          (apt) => apt.clientId === clientId,
        );
        setTimeout(() => callback(filtered), 100);
        return () => {};
      }

      const q = query(
        collection(db, "appointments"),
        where("clientId", "==", clientId),
        orderBy("date", "desc"),
      );

      return onSnapshot(
        q,
        (snapshot) => {
          const appointments = snapshot.docs.map(
            (doc) =>
              ({
                id: doc.id,
                ...doc.data(),
              }) as Appointment,
          );
          const filtered = demoAppointments.filter(
            (apt) => apt.clientId === clientId,
          );
          callback(appointments.length > 0 ? appointments : filtered);
        },
        (error) => {
          console.warn(
            "Erreur dans l'écoute Firebase des rendez-vous client:",
            error,
          );
          const filtered = demoAppointments.filter(
            (apt) => apt.clientId === clientId,
          );
          callback(filtered);
        },
      );
    } catch (error) {
      console.warn("Erreur Firebase, utilisation des données démo:", error);
      const filtered = demoAppointments.filter(
        (apt) => apt.clientId === clientId,
      );
      setTimeout(() => callback(filtered), 100);
      return () => {};
    }
  },

  // Écouter les changements en temps réel pour un professionnel
  onProfessionalAppointmentsChange(
    professionalId: string,
    callback: (appointments: Appointment[]) => void,
  ) {
    try {
      if (!auth.currentUser) {
        const filtered = demoAppointments.filter(
          (apt) => apt.professionalId === professionalId,
        );
        setTimeout(() => callback(filtered), 100);
        return () => {};
      }

      const q = query(
        collection(db, "appointments"),
        where("professionalId", "==", professionalId),
        orderBy("date", "desc"),
      );

      return onSnapshot(
        q,
        (snapshot) => {
          const appointments = snapshot.docs.map(
            (doc) =>
              ({
                id: doc.id,
                ...doc.data(),
              }) as Appointment,
          );
          const filtered = demoAppointments.filter(
            (apt) => apt.professionalId === professionalId,
          );
          callback(appointments.length > 0 ? appointments : filtered);
        },
        (error) => {
          console.warn(
            "Erreur dans l'écoute Firebase des rendez-vous professionnel:",
            error,
          );
          const filtered = demoAppointments.filter(
            (apt) => apt.professionalId === professionalId,
          );
          callback(filtered);
        },
      );
    } catch (error) {
      console.warn("Erreur Firebase, utilisation des données démo:", error);
      const filtered = demoAppointments.filter(
        (apt) => apt.professionalId === professionalId,
      );
      setTimeout(() => callback(filtered), 100);
      return () => {};
    }
  },

  // Mettre à jour un rendez-vous
  async updateAppointment(
    appointmentId: string,
    updates: Partial<Appointment>,
  ) {
    const appointmentRef = doc(db, "appointments", appointmentId);
    await updateDoc(appointmentRef, {
      ...updates,
      updatedAt: Timestamp.now(),
    });
  },

  // Annuler un rendez-vous
  async cancelAppointment(appointmentId: string) {
    await this.updateAppointment(appointmentId, { status: "cancelled" });
  },

  // Confirmer un rendez-vous (pour les professionnels)
  async confirmAppointment(appointmentId: string) {
    await this.updateAppointment(appointmentId, { status: "confirmed" });
  },

  // Marquer un rendez-vous comme terminé
  async completeAppointment(appointmentId: string) {
    await this.updateAppointment(appointmentId, { status: "completed" });
  },

  // Changer le statut d'un rendez-vous
  async updateAppointmentStatus(appointmentId: string, status: "pending" | "confirmed" | "completed" | "cancelled") {
    await this.updateAppointment(appointmentId, { status });
  },

  // Supprimer un rendez-vous
  async deleteAppointment(appointmentId: string) {
    const appointmentRef = doc(db, "appointments", appointmentId);
    await deleteDoc(appointmentRef);
  },
};
