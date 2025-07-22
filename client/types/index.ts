// Types sans dépendance Firebase

export interface User {
  uid: string;
  email: string;
  userType: "client" | "professionnel";
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface ClientProfile extends User {
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

export interface ProfessionalProfile extends User {
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
  availability?: {
    [key: string]: boolean; // jour de la semaine
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
