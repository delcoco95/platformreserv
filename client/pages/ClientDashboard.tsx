
import { useState, useEffect } from "react";
import { Timestamp } from "firebase/firestore";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Alert, AlertDescription } from "../components/ui/alert";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Settings,
  Phone,
  Mail,
  Star,
  CalendarCheck,
  X,
  MessageCircle,
  Plus,
  AlertCircle,
  Bell,
  Building,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { appointmentService } from "../services/appointmentService";
import { professionalService } from "../services/professionalService";
import { EditProfileDialog } from "../components/EditProfileDialog";
import { Appointment, ClientProfile, ProfessionalProfile } from "../types";

export default function ClientDashboard() {
  const { currentUser, userProfile, loading: authLoading } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [lastProfessional, setLastProfessional] =
    useState<ProfessionalProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showEditProfile, setShowEditProfile] = useState(false);

  const now = new Date();

  const clientProfile: ClientProfile | null =
    userProfile?.userType === "client" ? (userProfile as ClientProfile) : null;

  const parseDate = (rawDate: any): Date => {
    if (!rawDate) return new Date(0);
    if (rawDate instanceof Timestamp) return rawDate.toDate();
    if (rawDate.toDate) return rawDate.toDate();
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
              const professionals =
                await professionalService.getAllProfessionals();
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

  const formatDate = (timestamp: any) => {
    const date = parseDate(timestamp);
    return date.toLocaleDateString("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timestamp: any) => {
    const date = parseDate(timestamp);
    return date.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-100 text-green-800">Confirmé</Badge>;
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">En attente</Badge>
        );
      case "completed":
        return <Badge className="bg-blue-100 text-blue-800">Terminé</Badge>;
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800">Annulé</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const upcomingAppointments = appointments.filter((apt) => {
    const date = parseDate(apt.date);
    return date > now && apt.status !== "cancelled";
  });

  const pastAppointments = appointments.filter((apt) => {
    const date = parseDate(apt.date);
    return date <= now || apt.status === "completed";
  });

  if (authLoading || loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
          <p className="text-muted-foreground">Chargement de votre espace...</p>
        </div>
      </div>
    );
  }

  if (!currentUser || !userProfile) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto" />
          <div>
            <h3 className="text-lg font-semibold">Accès non autorisé</h3>
            <p className="text-muted-foreground">
              Veuillez vous connecter pour accéder à votre espace client.
            </p>
          </div>
          <Button asChild>
            <Link to="/connexion">Se connecter</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (!clientProfile) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto" />
          <div>
            <h3 className="text-lg font-semibold">Profil invalide</h3>
            <p className="text-muted-foreground">
              Le profil chargé n'est pas un client. Veuillez vous reconnecter.
            </p>
          </div>
          <Button asChild>
            <Link to="/connexion">Se connecter</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center p-10">
      <h1 className="text-2xl font-bold mb-4">
        Bienvenue {clientProfile?.firstName} !
      </h1>
      <p className="text-muted-foreground mb-8">
        Vous avez {upcomingAppointments.length} rendez-vous à venir.
      </p>
      <Button asChild>
        <Link to="/professionnels">Réserver un service</Link>
      </Button>
    </div>
  );
}
