import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { AlertCircle } from "lucide-react";
import { EditProfileDialog } from "../components/EditProfileDialog";
import { ServicesManager, AvailabilityManager } from "../components/professional";
import { ConversationsList, ChatWindow } from "../components/messaging";
import { LoadingSpinner } from "../components/common";
import { ProfessionalStats, ProfessionalProfileSection, ProfessionalOverview } from "../components/dashboard";
import { useProfessionalDashboard } from "../hooks/useProfessionalDashboard";
import { Conversation } from "../services/messageService";

export default function ProfessionalDashboard() {
  const {
    currentUser,
    userProfile,
<<<<<<< HEAD:client/pages/ProfessionalDashboard.tsx
    professionalProfile,
    appointments,
    loading,
    error,
    authLoading,
    setError,
    handleValidateAppointment,
    handleUpdateServices,
    handleUpdateAvailability,
  } = useProfessionalDashboard();

=======
    loading: authLoading,
    updateUserProfile,
  } = useAuth();

  // (Suppression de la redéclaration de professionalProfile ici)
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
>>>>>>> d01419f8abec017db4f3a11fa6a4e19bdcc973fd:frontend/pages/ProfessionalDashboard.tsx
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);

<<<<<<< HEAD:client/pages/ProfessionalDashboard.tsx
  if (loading || authLoading) {
    return <LoadingSpinner message="Chargement de votre espace..." />;
=======
  const professionalProfile = userProfile as ProfessionalProfile;

  useEffect(() => {
    if (authLoading) return;

    if (!currentUser) {
      setLoading(false);
      return;
    }

    // Charger les rendez-vous du professionnel
    if (professionalProfile?.uid) {
      const unsubscribe = appointmentService.onProfessionalAppointmentsChange(
        professionalProfile.uid,
        (appointmentsData) => {
          setAppointments(appointmentsData);
          setLoading(false);
        },
      );

      return () => unsubscribe();
    } else {
      setLoading(false);
    }
  }, [currentUser, authLoading]);

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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-100 text-green-800">Confirmé</Badge>;
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">En attente</Badge>
        );
      case "completed":
        return <Badge className="bg-blue-100 text-blue-800">Termin��</Badge>;
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800">Annulé</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getCategoryIcon = (profession: string) => {
    switch (profession) {
      case "automobile":
        return Car;
      case "plomberie":
        return Settings;
      case "serrurerie":
        return Settings;
      default:
        return Building;
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
          <p className="text-muted-foreground">Chargement de votre espace...</p>
        </div>
      </div>
    );
>>>>>>> d01419f8abec017db4f3a11fa6a4e19bdcc973fd:frontend/pages/ProfessionalDashboard.tsx
  }

  if (!currentUser || !userProfile) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto" />
          <div>
            <h3 className="text-lg font-semibold">Accès non autorisé</h3>
            <p className="text-muted-foreground">
              Veuillez vous connecter pour accéder à votre espace professionnel.
            </p>
          </div>
          <Button asChild>
            <Link to="/connexion">Se connecter</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (userProfile.userType !== "professionnel") {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto" />
          <div>
            <h3 className="text-lg font-semibold">Accès non autorisé</h3>
            <p className="text-muted-foreground">Cette page est réservée aux professionnels.</p>
          </div>
          <Button asChild>
            <Link to="/espace-client">Aller à l'espace client</Link>
          </Button>
        </div>
      </div>
    );
  }

<<<<<<< HEAD:client/pages/ProfessionalDashboard.tsx
=======

  // Définir l'icône de la catégorie selon la profession
  const IconComponent = getCategoryIcon(professionalProfile?.profession);

  // Vérification de sécurité pour éviter les pages blanches
>>>>>>> d01419f8abec017db4f3a11fa6a4e19bdcc973fd:frontend/pages/ProfessionalDashboard.tsx
  if (!professionalProfile) {
    return <LoadingSpinner message="Chargement de votre profil..." />;
  }
<<<<<<< HEAD:client/pages/ProfessionalDashboard.tsx
=======
  // Calculer les statistiques
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const todayAppointments = appointments.filter((apt) => {
    if (!apt.date) return false;
    const date = parseDate(apt.date);
    return date >= today && date < tomorrow && apt.status !== "cancelled";
  });

  const completedAppointments = appointments.filter(
    (apt) => apt.status === "completed",
  );
  const totalEarnings = completedAppointments.reduce(
    (sum, apt) => sum + (apt.price || 0),
    0,
  );
>>>>>>> d01419f8abec017db4f3a11fa6a4e19bdcc973fd:frontend/pages/ProfessionalDashboard.tsx

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 py-8">
      <div className="container max-w-7xl mx-auto px-4">
        <ProfessionalProfileSection
          professional={professionalProfile}
          currentUser={currentUser}
          onEditProfile={() => setShowEditProfile(true)}
        />

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <ProfessionalStats
          appointments={appointments}
          totalReviews={professionalProfile.totalReviews}
          rating={professionalProfile.rating}
        />

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="availability">Disponibilités</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <ProfessionalOverview
              appointments={appointments}
              onValidateAppointment={handleValidateAppointment}
            />
          </TabsContent>

          <TabsContent value="services">
            <ServicesManager
              services={
                (professionalProfile?.services || []).map((s) =>
                  typeof s === "string"
                    ? { name: s, price: 0, duration: 0, description: "" }
                    : {
                        ...s,
                        duration: s.duration ?? 0,
                        description: s.description ?? "",
                      }
                )
              }
              onUpdateServices={handleUpdateServices}
            />
          </TabsContent>

          <TabsContent value="availability">
            <AvailabilityManager
              availability={professionalProfile?.availability || {}}
              onUpdateAvailability={handleUpdateAvailability}
            />
          </TabsContent>

          <TabsContent value="messages">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <ConversationsList
                  onSelectConversation={setSelectedConversation}
                  selectedConversationId={selectedConversation?.conversationId}
                />
              </div>
              <div className="lg:col-span-2">
                {selectedConversation ? (
                  <ChatWindow conversation={selectedConversation} />
                ) : (
                  <div className="flex items-center justify-center h-96 text-center">
                    <p className="text-muted-foreground">
                      Choisissez une conversation dans la liste pour commencer à discuter
                    </p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <EditProfileDialog open={showEditProfile} onOpenChange={setShowEditProfile} />
      </div>
    </div>
  );
}
