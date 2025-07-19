import { useState } from "react";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Settings,
  X,
  Phone,
  Mail,
  Car,
  Wrench,
  Key,
} from "lucide-react";

export default function ClientDashboard() {
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);

  // Mock data - remplacer par des vraies données API
  const userInfo = {
    firstName: "Jean",
    lastName: "Dupont",
    email: "jean.dupont@email.com",
    phone: "06 12 34 56 78",
    avatar: "",
  };

  const upcomingAppointments = [
    {
      id: 1,
      service: "Vidange moteur",
      professional: "Auto Service Plus",
      professionalAvatar: "",
      date: "2024-01-15",
      time: "14:30",
      duration: "45 min",
      address: "123 Rue de la République, 75001 Paris",
      status: "confirmed",
      category: "automobile",
      phone: "01 23 45 67 89",
      price: "65€",
    },
    {
      id: 2,
      service: "Réparation fuite",
      professional: "Plomberie Express",
      professionalAvatar: "",
      date: "2024-01-20",
      time: "09:00",
      duration: "60 min",
      address: "456 Avenue Victor Hugo, 75016 Paris",
      status: "confirmed",
      category: "plomberie",
      phone: "01 34 56 78 90",
      price: "120€",
    },
  ];

  const pastAppointments = [
    {
      id: 3,
      service: "Installation serrure",
      professional: "Sécurité Pro",
      date: "2023-12-10",
      time: "16:00",
      status: "completed",
      category: "serrurerie",
      price: "180€",
      rating: 5,
    },
    {
      id: 4,
      service: "Lavage complet",
      professional: "Car Wash Deluxe",
      date: "2023-12-05",
      time: "11:30",
      status: "completed",
      category: "automobile",
      price: "35€",
      rating: 4,
    },
    {
      id: 5,
      service: "Dépannage urgent",
      professional: "Plomberie 24h",
      date: "2023-11-28",
      time: "22:15",
      status: "cancelled",
      category: "plomberie",
      price: "85€",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-100 text-green-800">Confirmé</Badge>;
      case "completed":
        return <Badge className="bg-blue-100 text-blue-800">Terminé</Badge>;
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800">Annulé</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "automobile":
        return <Car className="h-4 w-4 text-blue-600" />;
      case "plomberie":
        return <Wrench className="h-4 w-4 text-green-600" />;
      case "serrurerie":
        return <Key className="h-4 w-4 text-orange-600" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleCancelAppointment = (appointmentId: number) => {
    // Logique d'annulation - à implémenter avec l'API
    console.log("Annulation du rendez-vous:", appointmentId);
    alert("Rendez-vous annulé avec succès !");
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-muted/20 py-8">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Bonjour {userInfo.firstName} 👋
              </h1>
              <p className="text-muted-foreground mt-2">
                Gérez vos rendez-vous et vos informations personnelles
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Modifier mes informations
              </Button>
              <Button asChild>
                <Link to="/recherche">Nouveau rendez-vous</Link>
              </Button>
            </div>
          </div>
        </div>

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
                      <User className="h-6 w-6 text-green-600" />
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
                        Services réalisés
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <Clock className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">4.5</p>
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
                  Consultez vos rendez-vous à venir et votre historique
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
                        <p className="text-muted-foreground">
                          Aucun rendez-vous programmé
                        </p>
                        <Button className="mt-4" asChild>
                          <Link to="/recherche">Réserver un service</Link>
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
                              <div className="flex gap-4">
                                <div className="flex-shrink-0">
                                  {getCategoryIcon(appointment.category)}
                                </div>
                                <div className="flex-1 space-y-2">
                                  <div className="flex items-center gap-2">
                                    <h3 className="font-semibold">
                                      {appointment.service}
                                    </h3>
                                    {getStatusBadge(appointment.status)}
                                  </div>
                                  <p className="text-sm text-muted-foreground">
                                    {appointment.professional}
                                  </p>
                                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                      <Calendar className="h-4 w-4" />
                                      {formatDate(appointment.date)}
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Clock className="h-4 w-4" />
                                      {appointment.time} ({appointment.duration}
                                      )
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <MapPin className="h-4 w-4" />
                                      {appointment.address}
                                    </div>
                                  </div>
                                  <div className="text-lg font-semibold text-primary">
                                    {appointment.price}
                                  </div>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    setSelectedAppointment(appointment)
                                  }
                                >
                                  Détails
                                </Button>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() =>
                                    handleCancelAppointment(appointment.id)
                                  }
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </TabsContent>

                  <TabsContent value="history" className="space-y-4 mt-6">
                    {pastAppointments.map((appointment) => (
                      <Card key={appointment.id} className="opacity-75">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex gap-4">
                              <div className="flex-shrink-0">
                                {getCategoryIcon(appointment.category)}
                              </div>
                              <div className="flex-1 space-y-2">
                                <div className="flex items-center gap-2">
                                  <h3 className="font-semibold">
                                    {appointment.service}
                                  </h3>
                                  {getStatusBadge(appointment.status)}
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {appointment.professional}
                                </p>
                                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                  <div className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    {formatDate(appointment.date)}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    {appointment.time}
                                  </div>
                                </div>
                                <div className="text-lg font-semibold">
                                  {appointment.price}
                                </div>
                              </div>
                            </div>
                            {appointment.status === "completed" &&
                              appointment.rating && (
                                <div className="flex items-center gap-1">
                                  <span className="text-sm text-muted-foreground">
                                    Note:
                                  </span>
                                  <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                      <span
                                        key={i}
                                        className={`text-sm ${
                                          i < appointment.rating
                                            ? "text-yellow-500"
                                            : "text-gray-300"
                                        }`}
                                      >
                                        ★
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
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
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={userInfo.avatar} />
                    <AvatarFallback className="text-lg">
                      {userInfo.firstName[0]}
                      {userInfo.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">
                      {userInfo.firstName} {userInfo.lastName}
                    </h3>
                    <p className="text-sm text-muted-foreground">Client</p>
                  </div>
                </div>
                <div className="space-y-2 pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{userInfo.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{userInfo.phone}</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  <Settings className="h-4 w-4 mr-2" />
                  Modifier
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions rapides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" asChild>
                  <Link to="/recherche">
                    <Calendar className="h-4 w-4 mr-2" />
                    Nouveau rendez-vous
                  </Link>
                </Button>
                <Button variant="outline" className="w-full">
                  <User className="h-4 w-4 mr-2" />
                  Mes préférences
                </Button>
                <Button variant="outline" className="w-full">
                  <Phone className="h-4 w-4 mr-2" />
                  Support client
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Appointment Details Modal */}
        {selectedAppointment && (
          <Dialog
            open={!!selectedAppointment}
            onOpenChange={() => setSelectedAppointment(null)}
          >
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Détails du rendez-vous</DialogTitle>
                <DialogDescription>
                  Informations complètes sur votre réservation
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold">Service</h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedAppointment.service}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">Professionnel</h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedAppointment.professional}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    📞 {selectedAppointment.phone}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">Date et heure</h4>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(selectedAppointment.date)} à{" "}
                    {selectedAppointment.time}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Durée: {selectedAppointment.duration}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">Adresse</h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedAppointment.address}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">Tarif</h4>
                  <p className="text-lg font-semibold text-primary">
                    {selectedAppointment.price}
                  </p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}
