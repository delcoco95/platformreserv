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
import { db } from "../firebase";
import { Appointment } from "../types";

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
    const q = query(
      collection(db, "appointments"),
      where("clientId", "==", clientId),
      orderBy("date", "desc"),
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() }) as Appointment,
    );
  },

  // Récupérer les rendez-vous d'un professionnel
  async getProfessionalAppointments(professionalId: string) {
    const q = query(
      collection(db, "appointments"),
      where("professionalId", "==", professionalId),
      orderBy("date", "desc"),
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() }) as Appointment,
    );
  },

  // Écouter les changements en temps réel pour un client
  onClientAppointmentsChange(
    clientId: string,
    callback: (appointments: Appointment[]) => void,
  ) {
    const q = query(
      collection(db, "appointments"),
      where("clientId", "==", clientId),
      orderBy("date", "desc"),
    );

    return onSnapshot(q, (snapshot) => {
      const appointments = snapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          }) as Appointment,
      );
      callback(appointments);
    });
  },

  // Écouter les changements en temps réel pour un professionnel
  onProfessionalAppointmentsChange(
    professionalId: string,
    callback: (appointments: Appointment[]) => void,
  ) {
    const q = query(
      collection(db, "appointments"),
      where("professionalId", "==", professionalId),
      orderBy("date", "desc"),
    );

    return onSnapshot(q, (snapshot) => {
      const appointments = snapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          }) as Appointment,
      );
      callback(appointments);
    });
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

  // Supprimer un rendez-vous
  async deleteAppointment(appointmentId: string) {
    const appointmentRef = doc(db, "appointments", appointmentId);
    await deleteDoc(appointmentRef);
  },
};
