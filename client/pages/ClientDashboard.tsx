import { useState, useEffect } from "react";
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
    if (!apt.date) return false;
    const date = parseDate(apt.date);
    return date > new Date() && apt.status !== "cancelled";
  });

  const pastAppointments = appointments.filter((apt) => {
    if (!apt.date) return false;
    const date = parseDate(apt.date);
    return date <= new Date() || apt.status === "completed";
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

  // Vérifier que c'est bien un profil client
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
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={currentUser?.photoURL || ""} />
                <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                  {clientProfile?.firstName?.[0] || ""}
                  {clientProfile?.lastName?.[0] || "C"}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Bonjour {clientProfile?.firstName || "Client"} 👋
                </h1>
                <p className="text-muted-foreground mt-1">
                  Bienvenue dans votre espace personnel
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowEditProfile(true)}
              >
                <Settings className="h-4 w-4 mr-2" />
                Modifier mon profil
              </Button>
              <Button asChild>
                <Link to="/professionnels">
                  <Plus className="h-4 w-4 mr-2" />
                  Nouveau rendez-vous
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Stats */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">
                        {upcomingAppointments.length}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        RDV à venir
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <CalendarCheck className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">
                        {
                          pastAppointments.filter(
                            (apt) => apt.status === "completed",
                          ).length
                        }
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Services reçus
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <Star className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">4.8</p>
                      <p className="text-sm text-muted-foreground">
                        Note moyenne
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Appointments Tabs */}
            <Card>
              <CardHeader>
                <CardTitle>Mes rendez-vous</CardTitle>
                <CardDescription>
                  Consultez et gérez vos rendez-vous
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="upcoming" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="upcoming">À venir</TabsTrigger>
                    <TabsTrigger value="history">Historique</TabsTrigger>
                  </TabsList>

                  <TabsContent value="upcoming" className="space-y-4 mt-6">
                    {upcomingAppointments.length === 0 ? (
                      <div className="text-center py-8">
                        <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">
                          Aucun rendez-vous programmé
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          Réservez votre premier service dès maintenant
                        </p>
                        <Button asChild>
                          <Link to="/professionnels">
                            <Plus className="h-4 w-4 mr-2" />
                            Réserver un service
                          </Link>
                        </Button>
                      </div>
                    ) : (
                      upcomingAppointments.map((appointment) => (
                        <Card
                          key={appointment.id}
                          className="border-l-4 border-l-primary"
                        >
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between">
                              <div className="flex-1 space-y-3">
                                <div className="flex items-center gap-3">
                                  <h3 className="font-semibold text-lg">
                                    {appointment.service}
                                  </h3>
                                  {getStatusBadge(appointment.status)}
                                </div>

                                <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                                  <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    <span>{formatDate(appointment.date)}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4" />
                                    <span>{formatTime(appointment.date)}</span>
                                  </div>
                                  {appointment.address && (
                                    <div className="flex items-center gap-2 md:col-span-2">
                                      <MapPin className="h-4 w-4" />
                                      <span>{appointment.address}</span>
                                    </div>
                                  )}
                                </div>

                                {appointment.price && (
                                  <div className="text-lg font-semibold text-primary">
                                    {appointment.price}€
                                  </div>
                                )}

                                {appointment.notes && (
                                  <div className="text-sm text-muted-foreground">
                                    <strong>Notes :</strong> {appointment.notes}
                                  </div>
                                )}
                              </div>

                              <div className="flex gap-2 ml-4">
                                <Button variant="outline" size="sm">
                                  <MessageCircle className="h-4 w-4" />
                                </Button>
                                {appointment.status === "confirmed" && (
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() =>
                                      handleCancelAppointment(appointment.id)
                                    }
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </TabsContent>

                  <TabsContent value="history" className="space-y-4 mt-6">
                    {pastAppointments.length === 0 ? (
                      <div className="text-center py-8">
                        <CalendarCheck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">
                          Aucun historique
                        </h3>
                        <p className="text-muted-foreground">
                          Vos services passés apparaîtront ici
                        </p>
                      </div>
                    ) : (
                      pastAppointments.map((appointment) => (
                        <Card key={appointment.id} className="opacity-75">
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between">
                              <div className="flex-1 space-y-3">
                                <div className="flex items-center gap-3">
                                  <h3 className="font-semibold">
                                    {appointment.service}
                                  </h3>
                                  {getStatusBadge(appointment.status)}
                                </div>

                                <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                                  <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    <span>{formatDate(appointment.date)}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4" />
                                    <span>{formatTime(appointment.date)}</span>
                                  </div>
                                </div>

                                {appointment.price && (
                                  <div className="text-lg font-semibold">
                                    {appointment.price}€
                                  </div>
                                )}
                              </div>

                              {appointment.status === "completed" && (
                                <Button variant="outline" size="sm">
                                  <Star className="h-4 w-4 mr-2" />
                                  Noter
                                </Button>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card>
              <CardHeader>
                <CardTitle>Mon profil</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {clientProfile?.firstName || ""}{" "}
                      {clientProfile?.lastName || ""}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{currentUser.email}</span>
                  </div>
                  {clientProfile?.phone && (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{clientProfile.phone}</span>
                    </div>
                  )}
                  {clientProfile?.address && (
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{clientProfile.address}</span>
                    </div>
                  )}
                </div>

                <Button
                  variant="outline"
                  className="w-full mt-4"
                  onClick={() => setShowEditProfile(true)}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Modifier
                </Button>
              </CardContent>
            </Card>

            {/* Last Professional Used */}
            {lastProfessional && (
              <Card>
                <CardHeader>
                  <CardTitle>Dernier professionnel</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-secondary">
                        {lastProfessional.companyName?.[0] || "P"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold">
                        {lastProfessional.companyName}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {lastProfessional.profession}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {lastProfessional.phone && (
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <a
                          href={`tel:${lastProfessional.phone}`}
                          className="hover:text-primary"
                        >
                          {lastProfessional.phone}
                        </a>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{lastProfessional.email}</span>
                    </div>
                    {lastProfessional.address && (
                      <div className="flex items-center gap-2 text-sm">
                        <Building className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs">
                          {lastProfessional.address}
                        </span>
                      </div>
                    )}
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Reprendre RDV
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Messages/Notifications */}
            <Card>
              <CardHeader>
                <CardTitle>Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-6">
                  <MessageCircle className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Aucun nouveau message
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Preferences Card */}
            {clientProfile?.preferences && (
              <Card>
                <CardHeader>
                  <CardTitle>Mes préférences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Bell className="h-4 w-4 text-muted-foreground" />
                      <span>Notifications générales</span>
                    </div>
                    <Badge
                      variant={
                        clientProfile.preferences.notifications
                          ? "default"
                          : "secondary"
                      }
                    >
                      {clientProfile.preferences.notifications
                        ? "Activées"
                        : "Désactivées"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>Alertes email</span>
                    </div>
                    <Badge
                      variant={
                        clientProfile.preferences.emailAlerts
                          ? "default"
                          : "secondary"
                      }
                    >
                      {clientProfile.preferences.emailAlerts
                        ? "Activées"
                        : "Désactivées"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <MessageCircle className="h-4 w-4 text-muted-foreground" />
                      <span>Alertes SMS</span>
                    </div>
                    <Badge
                      variant={
                        clientProfile.preferences.smsAlerts
                          ? "default"
                          : "secondary"
                      }
                    >
                      {clientProfile.preferences.smsAlerts
                        ? "Activées"
                        : "Désactivées"}
                    </Badge>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-3"
                    onClick={() => setShowEditProfile(true)}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Modifier les préférences
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Edit Profile Dialog */}
        <EditProfileDialog
          open={showEditProfile}
          onOpenChange={setShowEditProfile}
        />
      </div>
    </div>
  );
}
