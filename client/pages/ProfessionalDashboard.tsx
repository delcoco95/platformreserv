import { useState, Suspense } from "react";
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
} from "lucide-react";

// Import Leaflet CSS
import "leaflet/dist/leaflet.css";

// Lazy load the map component
const Map = lazy(() =>
  import("../components/Map").then((module) => ({ default: module.Map })),
);

import { lazy } from "react";

export default function ProfessionalDashboard() {
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);

  // Mock data - remplacer par des vraies données API
  const professionalInfo = {
    companyName: "Auto Service Plus",
    profession: "Entretien & Réparation Automobile",
    email: "contact@autoserviceplus.fr",
    phone: "01 23 45 67 89",
    avatar: "",
    address: "123 Rue de la République, 75001 Paris",
    siret: "12345678901234",
    rating: 4.8,
    totalReviews: 147,
  };

  const stats = {
    appointmentsThisMonth: 23,
    attendanceRate: 96,
    averageRating: 4.8,
    totalEarnings: 2340,
  };

  const upcomingAppointments = [
    {
      id: 1,
      clientName: "Marie",
      clientEmail: "marie.martin@email.com",
      clientPhone: "06 12 34 56 78",
      service: "Vidange moteur",
      date: "2024-01-15",
      time: "14:30",
      duration: "45 min",
      price: "65€",
      address: "15 Rue Victor Hugo, 75001 Paris",
      lat: 48.8566,
      lng: 2.3522,
      status: "confirmed",
    },
    {
      id: 2,
      clientName: "Pierre",
      clientEmail: "pierre.dubois@email.com",
      clientPhone: "06 98 76 54 32",
      service: "Révision complète",
      date: "2024-01-15",
      time: "16:00",
      duration: "90 min",
      price: "180€",
      address: "42 Avenue des Champs, 75008 Paris",
      lat: 48.8698,
      lng: 2.3077,
      status: "confirmed",
    },
    {
      id: 3,
      clientName: "Sophie",
      clientEmail: "sophie.bernard@email.com",
      clientPhone: "06 11 22 33 44",
      service: "Freinage",
      date: "2024-01-16",
      time: "10:00",
      duration: "60 min",
      price: "120€",
      address: "78 Boulevard Saint-Germain, 75005 Paris",
      lat: 48.8534,
      lng: 2.3488,
      status: "confirmed",
    },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Centre de la carte (Paris)
  const mapCenter: [number, number] = [48.8566, 2.3522];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-muted/20 py-8">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Espace Professionnel
              </h1>
              <p className="text-muted-foreground mt-2">
                Gérez vos rendez-vous et votre activité
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                Voir ma fiche publique
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Modifier mes disponibilités
              </Button>
            </div>
          </div>
        </div>

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
                        {stats.appointmentsThisMonth}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        RDV ce mois
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">
                        {stats.attendanceRate}%
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Taux présence
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
                        {stats.averageRating}
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
                      <TrendingUp className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">
                        {stats.totalEarnings}€
                      </p>
                      <p className="text-sm text-muted-foreground">Ce mois</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Appointments and Map */}
            <Card>
              <CardHeader>
                <CardTitle>Rendez-vous à venir</CardTitle>
                <CardDescription>
                  Vos prochains rendez-vous clients
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="list" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="list">Liste</TabsTrigger>
                    <TabsTrigger value="map">Carte</TabsTrigger>
                  </TabsList>

                  <TabsContent value="list" className="space-y-4 mt-6">
                    {upcomingAppointments.map((appointment) => (
                      <Card
                        key={appointment.id}
                        className="border-l-4 border-l-primary"
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex gap-4">
                              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                <Car className="h-5 w-5 text-primary" />
                              </div>
                              <div className="flex-1 space-y-2">
                                <div className="flex items-center gap-2">
                                  <h3 className="font-semibold">
                                    {appointment.service}
                                  </h3>
                                  <Badge className="bg-green-100 text-green-800">
                                    Confirmé
                                  </Badge>
                                </div>
                                <p className="text-sm font-medium">
                                  Client: {appointment.clientName}
                                </p>
                                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                  <div className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    {formatDate(appointment.date)}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    {appointment.time} ({appointment.duration})
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <MapPin className="h-4 w-4" />
                                    {appointment.address}
                                  </div>
                                </div>
                                <div className="flex items-center gap-4 text-sm">
                                  <div className="flex items-center gap-1">
                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                    <a
                                      href={`tel:${appointment.clientPhone}`}
                                      className="hover:text-primary"
                                    >
                                      {appointment.clientPhone}
                                    </a>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                    <a
                                      href={`mailto:${appointment.clientEmail}`}
                                      className="hover:text-primary"
                                    >
                                      {appointment.clientEmail}
                                    </a>
                                  </div>
                                </div>
                                <div className="text-lg font-semibold text-primary">
                                  {appointment.price}
                                </div>
                              </div>
                            </div>
                            <Button variant="outline" size="sm">
                              <Phone className="h-4 w-4 mr-2" />
                              Contacter
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>

                  <TabsContent value="map" className="mt-6">
                    <div className="h-96 rounded-lg overflow-hidden border">
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
                        <Map
                          appointments={upcomingAppointments}
                          center={mapCenter}
                          zoom={12}
                          onMarkerClick={setSelectedAppointment}
                        />
                      </Suspense>
                    </div>
                    <p className="text-sm text-muted-foreground mt-4">
                      Cliquez sur les marqueurs pour voir les détails des
                      rendez-vous. Les informations des clients s'affichent dans
                      les bulles d'information.
                    </p>
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
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={professionalInfo.avatar} />
                    <AvatarFallback className="text-lg bg-primary text-primary-foreground">
                      {professionalInfo.companyName
                        .split(" ")
                        .map((word) => word[0])
                        .join("")
                        .slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">
                      {professionalInfo.companyName}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {professionalInfo.profession}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">
                        {professionalInfo.rating}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        ({professionalInfo.totalReviews} avis)
                      </span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2 pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{professionalInfo.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{professionalInfo.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{professionalInfo.address}</span>
                  </div>
                </div>
                <div className="space-y-2 pt-4">
                  <Button variant="outline" className="w-full">
                    <Settings className="h-4 w-4 mr-2" />
                    Modifier le profil
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Eye className="h-4 w-4 mr-2" />
                    Voir ma fiche publique
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions rapides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full">
                  <Calendar className="h-4 w-4 mr-2" />
                  Gérer mes créneaux
                </Button>
                <Button variant="outline" className="w-full">
                  <Users className="h-4 w-4 mr-2" />
                  Mes statistiques
                </Button>
                <Button variant="outline" className="w-full">
                  <Star className="h-4 w-4 mr-2" />
                  Mes avis clients
                </Button>
                <Button variant="outline" className="w-full">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Support pro
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Activité récente</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Nouveau rendez-vous confirmé</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Avis 5★ reçu de Marie</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>Profil mis à jour</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Paiement reçu: 180€</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
