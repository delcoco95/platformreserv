// client/services/appointmentService.ts
import api from "../lib/api";

export interface Appointment {
  clientId: string;
  professionalId: string;
  service: string;
  date: Date;
  duration: number;
  status: "pending" | "confirmed" | "completed";
  price: number;
  address: string;
  notes?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export const appointmentService = {
  async createAppointment(data: Appointment) {
    return await api.post<Appointment>("/appointments", data);
  },

  async getMyAppointments(): Promise<Appointment[]> {
    return await api.get<Appointment[]>("/appointments/me");
  },
};
