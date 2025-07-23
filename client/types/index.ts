// Types sans dépendance Firebase

export interface User {
  uid: string;
  email: string;
  userType: "client" | "professionnel";
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
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
  services?: (string | { name: string; price: number; duration?: number; description?: string })[];
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
  date: string; // ISO date string
  duration: number; // en minutes
  status: "pending" | "confirmed" | "completed" | "cancelled";
  price?: number;
  address?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  notes?: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface Review {
  id: string;
  appointmentId: string;
  clientId: string;
  professionalId: string;
  rating: number;
  comment?: string;
  createdAt: string; // ISO date string
}
