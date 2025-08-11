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

  const [showEditProfile, setShowEditProfile] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);

  if (loading || authLoading) {
    return <LoadingSpinner message="Chargement de votre espace..." />;
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

  if (!professionalProfile) {
    return <LoadingSpinner message="Chargement de votre profil..." />;
  }

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
            {/* Contenu à implémenter */}
          </TabsContent>

          <TabsContent value="services">
            <ServicesManager
              services={professionalProfile?.services || []}
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
