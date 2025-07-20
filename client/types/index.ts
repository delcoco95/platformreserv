import { Timestamp } from "firebase/firestore";

export interface BaseUser {
  uid: string;
  email: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface ClientProfile extends BaseUser {
  userType: "client";
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  preferences?: {
    notifications: boolean;
    smsAlerts: boolean;
    emailAlerts: boolean;
  };
}

export interface ProfessionalProfile extends BaseUser {
  userType: "professionnel";
  companyName?: string;
  profession?: "automobile" | "plomberie" | "serrurerie";
  siret?: string;
  phone?: string;
  address?: string;
  description?: string;
  services?: string[];
  rating?: number;
  totalReviews?: number;
  isVerified?: boolean;
  coordinates?: {
    lat: number;
    lng: number;
  };
  availability?: {
    [key: string]: boolean;
  };
}

export interface Appointment {
  id: string;
  clientId: string;
  professionalId: string;
  service: string;
  date: Timestamp;
  duration: number; // en minutes
  status: "pending" | "confirmed" | "completed" | "cancelled";
  price?: number;
  address?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  notes?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Review {
  id: string;
  appointmentId: string;
  clientId: string;
  professionalId: string;
  rating: number;
  comment?: string;
  createdAt: Timestamp;
}
