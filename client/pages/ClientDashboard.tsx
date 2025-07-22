import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Alert, AlertDescription } from "../components/ui/alert";
import { AlertCircle } from "lucide-react";
import { EditProfileDialog } from "../components/EditProfileDialog";
import {
  HeaderSection,
  StatsCards,
  AppointmentsTabs,
  Sidebar
} from "../components/dashboard";
import { useClientDashboardLogic } from "../hooks/useClientDashboardLogic";

export default function ClientDashboard() {
  const {
    currentUser,
    userProfile,
    clientProfile,
    lastProfessional,
    loading,
    error,
    showEditProfile,
    upcomingAppointments,
    pastAppointments,
    completedAppointmentsCount,
    setError,
    setShowEditProfile,
    handleCancelAppointment,
    getStatusBadge,
    formatDate,
    formatTime,
  } = useClientDashboardLogic();

  if (loading) {
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

  if (userProfile.userType !== "client") {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto" />
          <div>
            <h3 className="text-lg font-semibold">Accès non autorisé</h3>
            <p className="text-muted-foreground">
              Cette page est réservée aux clients.
            </p>
          </div>
          <Button asChild>
            <Link to="/espace-professionnel">
              Aller à l'espace professionnel
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 py-8">
      <div className="container max-w-7xl mx-auto px-4">
        <HeaderSection
          currentUser={currentUser}
          clientProfile={clientProfile}
          onEditProfile={() => setShowEditProfile(true)}
        />

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <StatsCards
              upcomingAppointmentsCount={upcomingAppointments.length}
              completedAppointmentsCount={completedAppointmentsCount}
            />

            <AppointmentsTabs
              upcomingAppointments={upcomingAppointments}
              pastAppointments={pastAppointments}
              getStatusBadge={getStatusBadge}
              formatDate={formatDate}
              formatTime={formatTime}
              onCancelAppointment={handleCancelAppointment}
            />
          </div>

          {/* Sidebar */}
          <Sidebar
            currentUser={currentUser}
            clientProfile={clientProfile}
            lastProfessional={lastProfessional}
            onEditProfile={() => setShowEditProfile(true)}
          />
        </div>

        <EditProfileDialog
          open={showEditProfile}
          onOpenChange={setShowEditProfile}
        />
      </div>
    </div>
  );
}
