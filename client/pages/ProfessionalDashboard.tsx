import React, { useState, useEffect, Suspense } from "react";
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
import { Switch } from "../components/ui/switch";
import { Label } from "../components/ui/label";
import {
  Calendar,
  Clock,
  MapPin,
  Star,
  TrendingUp,
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
import { StatsChart } from "../components/StatsChart";
import { ProfessionalTabs } from "../components/ProfessionalTabs";
import { Appointment, ProfessionalProfile } from "../types";
import { parseDate, formatDate, formatTime } from "../lib/dateUtils";

// Import Leaflet CSS
import "leaflet/dist/leaflet.css";

// Lazy load the map component
const MapContainer = React.lazy(() =>
  import("react-leaflet").then((module) => ({ default: module.MapContainer })),
);
const TileLayer = React.lazy(() =>
  import("react-leaflet").then((module) => ({ default: module.TileLayer })),
);
const Marker = React.lazy(() =>
  import("react-leaflet").then((module) => ({ default: module.Marker })),
);
const Popup = React.lazy(() =>
  import("react-leaflet").then((module) => ({ default: module.Popup })),
);

export default function ProfessionalDashboard() {
  const { currentUser, userProfile, loading: authLoading } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showEditProfile, setShowEditProfile] = useState(false);

  useEffect(() => {
    if (authLoading) return;

    if (!currentUser) {
      setLoading(false);
      return;
    }

    // Écouter les changements de rendez-vous en temps réel
    const unsubscribe = appointmentService.onProfessionalAppointmentsChange(
      currentUser.uid,
      (appointmentsData) => {
        setAppointments(appointmentsData);
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, [currentUser, authLoading]);

  // Fix Leaflet default markers
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("leaflet").then((L) => {
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
          iconUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
          shadowUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
        });
      });
    }
  }, []);

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

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const todayAppointments = appointments.filter((apt) => {
    if (!apt.date) return false;
    const date = parseDate(apt.date);
    return date >= today && date < tomorrow && apt.status !== "cancelled";
  });

  const upcomingAppointments = appointments.filter((apt) => {
    if (!apt.date) return false;
    const date = parseDate(apt.date);
    return date >= tomorrow && apt.status !== "cancelled";
  });

  const completedAppointments = appointments.filter(
    (apt) => apt.status === "completed",
  );
  const totalEarnings = completedAppointments.reduce(
    (sum, apt) => sum + (apt.price || 0),
    0,
  );

  // Données pour le graphique
  const statsData = {
    confirmed: appointments.filter((apt) => apt.status === "confirmed").length,
    completed: appointments.filter((apt) => apt.status === "completed").length,
    cancelled: appointments.filter((apt) => apt.status === "cancelled").length,
    pending: appointments.filter((apt) => apt.status === "pending").length,
  };

  // Rendez-vous avec coordonnées pour la carte
  const appointmentsWithCoords = appointments.filter(
    (apt) => apt.coordinates && apt.coordinates.lat && apt.coordinates.lng,
  );

  const professionalProfile = userProfile as ProfessionalProfile;
  const IconComponent = getCategoryIcon(professionalProfile?.profession || "");

  // Centre de la carte (Paris par défaut)
  const mapCenter: [number, number] = [48.8566, 2.3522];

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
              <Button variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                Ma fiche publique
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
            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-4">
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
                      <p className="text-sm text-muted-foreground">
                        Aujourd'hui
                      </p>
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
                      <p className="text-sm text-muted-foreground">
                        RDV réalisés
                      </p>
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
                        {professionalProfile?.rating?.toFixed(1) || "0.0"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Note moyenne
                      </p>
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

            {/* Graphiques et Carte */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Graphique des statistiques */}
              <StatsChart data={statsData} />

              {/* Carte des rendez-vous */}
              <Card>
                <CardHeader>
                  <CardTitle>Carte des rendez-vous</CardTitle>
                  <CardDescription>Localisation de vos clients</CardDescription>
                </CardHeader>
                <CardContent>
                  {appointmentsWithCoords.length === 0 ? (
                    <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <MapPin className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Aucun rendez-vous avec localisation
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="h-64 rounded-lg overflow-hidden border">
                      <Suspense
                        fallback={
                          <div className="h-full bg-muted flex items-center justify-center">
                            <div className="text-center space-y-2">
                              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
                              <p className="text-muted-foreground">
                                Chargement de la carte...
                              </p>
                            </div>
                          </div>
                        }
                      >
                        <MapContainer
                          center={mapCenter}
                          zoom={12}
                          className="h-full w-full"
                        >
                          <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          />
                          {appointmentsWithCoords.map((appointment) => (
                            <Marker
                              key={appointment.id}
                              position={[
                                appointment.coordinates!.lat,
                                appointment.coordinates!.lng,
                              ]}
                            >
                              <Popup>
                                <div className="space-y-2 min-w-48">
                                  <h4 className="font-semibold">
                                    {appointment.service}
                                  </h4>
                                  <div className="space-y-1 text-sm">
                                    <div>
                                      <strong>Date:</strong>{" "}
                                      {formatDate(appointment.date)} à{" "}
                                      {formatTime(appointment.date)}
                                    </div>
                                    <div>
                                      <strong>Adresse:</strong>{" "}
                                      {appointment.address}
                                    </div>
                                    <div>
                                      <strong>Statut:</strong>{" "}
                                      {appointment.status}
                                    </div>
                                    {appointment.price && (
                                      <div className="text-lg font-semibold text-primary pt-2">
                                        {appointment.price}€
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </Popup>
                            </Marker>
                          ))}
                        </MapContainer>
                      </Suspense>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Appointments */}
            <Card>
              <CardHeader>
                <CardTitle>Mes rendez-vous</CardTitle>
                <CardDescription>Gérez vos rendez-vous clients</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="today" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="today">Aujourd'hui</TabsTrigger>
                    <TabsTrigger value="upcoming">À venir</TabsTrigger>
                  </TabsList>

                  <TabsContent value="today" className="space-y-4 mt-6">
                    {todayAppointments.length === 0 ? (
                      <div className="text-center py-8">
                        <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">
                          Aucun rendez-vous aujourd'hui
                        </h3>
                        <p className="text-muted-foreground">
                          Profitez de cette journée plus calme !
                        </p>
                      </div>
                    ) : (
                      todayAppointments.map((appointment) => (
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
                      ))
                    )}
                  </TabsContent>

                  <TabsContent value="upcoming" className="space-y-4 mt-6">
                    {upcomingAppointments.length === 0 ? (
                      <div className="text-center py-8">
                        <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">
                          Aucun rendez-vous à venir
                        </h3>
                        <p className="text-muted-foreground">
                          Les nouveaux rendez-vous apparaîtront ici
                        </p>
                      </div>
                    ) : (
                      upcomingAppointments.map((appointment) => (
                        <Card key={appointment.id}>
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

                              <Button variant="outline" size="sm">
                                Détails
                              </Button>
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
            {/* Professional Profile Card */}
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
                  {professionalProfile?.address && (
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{professionalProfile.address}</span>
                    </div>
                  )}
                  {professionalProfile?.siret && (
                    <div className="flex items-center gap-2 text-sm">
                      <Award className="h-4 w-4 text-muted-foreground" />
                      <span>SIRET: {professionalProfile.siret}</span>
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

            {/* Services */}
            {professionalProfile?.services &&
              professionalProfile.services.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Mes services</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {professionalProfile.services.map((service, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="mr-2 mb-2"
                      >
                        {service}
                      </Badge>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full mt-3"
                      onClick={() => setShowEditProfile(true)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Modifier mes services
                    </Button>
                  </CardContent>
                </Card>
              )}

            {/* Availability */}
            {professionalProfile?.availability && (
              <Card>
                <CardHeader>
                  <CardTitle>Mes disponibilités</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {Object.entries(professionalProfile.availability).map(
                    ([day, isAvailable]) => {
                      const dayLabels: { [key: string]: string } = {
                        monday: "Lundi",
                        tuesday: "Mardi",
                        wednesday: "Mercredi",
                        thursday: "Jeudi",
                        friday: "Vendredi",
                        saturday: "Samedi",
                        sunday: "Dimanche",
                      };

                      return (
                        <div
                          key={day}
                          className="flex items-center justify-between"
                        >
                          <Label className="text-sm">{dayLabels[day]}</Label>
                          <Switch checked={isAvailable as boolean} disabled />
                        </div>
                      );
                    },
                  )}
                  <Button variant="outline" size="sm" className="w-full mt-3">
                    <Settings className="h-4 w-4 mr-2" />
                    Modifier les créneaux
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions rapides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Mes statistiques
                </Button>
                <Button variant="outline" className="w-full">
                  <Star className="h-4 w-4 mr-2" />
                  Gérer mes avis
                </Button>
                <Button variant="outline" className="w-full">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Support pro
                </Button>
              </CardContent>
            </Card>
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
