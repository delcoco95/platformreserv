import React, { useState, useEffect } from "react";
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
  Star,
  Users,
  Settings,
  ExternalLink,
  Phone,
  Mail,
  Eye,
  Car,
  CheckCircle,
  MessageCircle,
  Plus,
  AlertCircle,
  Building,
  Award,
  Euro,
  BarChart3,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { appointmentService } from "../services/appointmentService";
import { EditProfileDialog } from "../components/EditProfileDialog";
import {
  ServicesManager,
  AvailabilityManager,
} from "../components/professional";
import { ConversationsList, ChatWindow } from "../components/messaging";
import { Appointment, ProfessionalProfile } from "../types";
import { parseDate, formatDate, formatTime } from "../lib/dateUtils";
import { Conversation } from "../services/messageService";

export default function ProfessionalDashboard() {
  const {
    currentUser,
    userProfile,
    loading: authLoading,
    updateUserProfile,
  } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);

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
        }
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
        return <Badge className="bg-blue-100 text-blue-800">Terminé</Badge>;
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

  // Vérifier que c'est bien un profil professionnel
  if (userProfile.userType !== "professionnel") {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto" />
          <div>
            <h3 className="text-lg font-semibold">Accès non autorisé</h3>
            <p className="text-muted-foreground">
              Cette page est réservée aux professionnels.
            </p>
          </div>
          <Button asChild>
            <Link to="/espace-client">Aller à l'espace client</Link>
          </Button>
        </div>
      </div>
    );
  }

  const professionalProfile = userProfile as ProfessionalProfile;
  const IconComponent = getCategoryIcon(professionalProfile?.profession || "");

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
                  {professionalProfile?.companyName?.[0] || "P"}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  {professionalProfile?.companyName || "Espace Professionnel"}
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <IconComponent className="h-4 w-4 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    {professionalProfile?.profession || "Professionnel"}
                  </p>
                  {professionalProfile?.isVerified && (
                    <Badge variant="secondary">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Vérifié
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowEditProfile(true)}
              >
                <Settings className="h-4 w-4 mr-2" />
                Modifier mes informations
              </Button>
              <Button variant="outline" asChild>
                <Link to={`/professionnel/${professionalProfile?.uid}`}>
                  <Eye className="h-4 w-4 mr-2" />
                  Ma fiche publique
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

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {todayAppointments.length}
                  </p>
                  <p className="text-sm text-muted-foreground">Aujourd'hui</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {completedAppointments.length}
                  </p>
                  <p className="text-sm text-muted-foreground">RDV réalisés</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Star className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {professionalProfile?.rating && professionalProfile.rating > 0
                      ? professionalProfile.rating.toFixed(1)
                      : "-"}
                  </p>
                  <p className="text-sm text-muted-foreground">Note moyenne</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Euro className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{totalEarnings}€</p>
                  <p className="text-sm text-muted-foreground">
                    Revenus totaux
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs principaux */}
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard">Tableau de bord</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="availability">Disponibilités</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="appointments">Rendez-vous</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Profil résumé */}
              <Card>
                <CardHeader>
                  <CardTitle>Mon profil</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {professionalProfile?.companyName || "Non renseigné"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{currentUser.email}</span>
                    </div>
                    {professionalProfile?.phone && (
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{professionalProfile.phone}</span>
                      </div>
                    )}
                  </div>

                  {professionalProfile?.rating && (
                    <div className="flex items-center gap-2 pt-2 border-t">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">
                        {professionalProfile.rating.toFixed(1)}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        ({professionalProfile.totalReviews || 0} avis)
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Actions rapides */}
              <Card>
                <CardHeader>
                  <CardTitle>Actions rapides</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => alert("Fonctionnalité des statistiques à venir")}
                  >
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Mes statistiques
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => alert("Fonctionnalité de gestion des avis à venir")}
                  >
                    <Star className="h-4 w-4 mr-2" />
                    Gérer mes avis
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => window.open("mailto:support@rendezvousmo.fr", "_blank")}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Support pro
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="services" className="space-y-6">
            <ServicesManager
              services={professionalProfile?.services || []}
              onUpdateServices={handleUpdateServices}
            />
          </TabsContent>

          <TabsContent value="availability" className="space-y-6">
            <AvailabilityManager
              availability={professionalProfile?.availability || {}}
              onUpdateAvailability={handleUpdateAvailability}
            />
          </TabsContent>

          <TabsContent value="messages" className="space-y-6">
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
                  <Card>
                    <CardContent className="flex items-center justify-center py-12">
                      <div className="text-center">
                        <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">
                          Sélectionnez une conversation
                        </h3>
                        <p className="text-muted-foreground">
                          Choisissez une conversation dans la liste pour
                          commencer à discuter
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Mes rendez-vous</CardTitle>
                <CardDescription>Gérez vos rendez-vous clients</CardDescription>
              </CardHeader>
              <CardContent>
                {appointments.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">
                      Aucun rendez-vous
                    </h3>
                    <p className="text-muted-foreground">
                      Vos rendez-vous apparaîtront ici une fois que les clients
                      commenceront à réserver
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {appointments.map((appointment) => (
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
                                  <Clock className="h-4 w-4" />
                                  <span>{formatTime(appointment.date)}</span>
                                </div>
                                {appointment.duration && (
                                  <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4" />
                                    <span>{appointment.duration} min</span>
                                  </div>
                                )}
                              </div>
                              {appointment.price && (
                                <div className="text-lg font-semibold text-primary">
                                  {appointment.price}€
                                </div>
                              )}
                            </div>
                            <div className="flex gap-2 ml-4">
                              <Button variant="outline" size="sm">
                                <MessageCircle className="h-4 w-4" />
                              </Button>
                              {appointment.status === "confirmed" && (
                                <Button
                                  size="sm"
                                  onClick={() =>
                                    handleValidateAppointment(appointment.id)
                                  }
                                >
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Valider
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Edit Profile Dialog */}
        <EditProfileDialog
          open={showEditProfile}
          onOpenChange={setShowEditProfile}
        />
      </div>
    </div>
  );
}
