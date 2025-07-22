import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Alert, AlertDescription } from "../components/ui/alert";
import {
  Star,
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  Calendar,
  Euro,
  Award,
  Building,
  ArrowLeft,
  AlertCircle,
  User,
} from "lucide-react";
import { professionalService } from "../services/professionalService";
import { appointmentService } from "../services/appointmentService";
import { emailService } from "../services/emailService";
import { useAuth } from "../contexts/AuthContext";
import {
  ProfessionalProfile as ProfessionalType,
  ClientProfile,
} from "../types";
import { now } from "../lib/dateUtils";

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  category: string;
}

interface TimeSlot {
  id: string;
  start: string;
  end: string;
  date: string;
  available: boolean;
}

const mockServices: Service[] = [
  {
    id: "1",
    name: "Révision complète",
    description:
      "Contrôle complet du véhicule : moteur, freins, direction, éclairage",
    price: 150,
    duration: 120,
    category: "entretien",
  },
  {
    id: "2",
    name: "Vidange",
    description: "Changement de l'huile moteur et du filtre à huile",
    price: 45,
    duration: 30,
    category: "entretien",
  },
  {
    id: "3",
    name: "Diagnostic électronique",
    description: "Diagnostic complet des systèmes électroniques du véhicule",
    price: 80,
    duration: 60,
    category: "diagnostic",
  },
];

const generateTimeSlots = (): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const today = new Date();

  for (let i = 1; i <= 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    if (date.getDay() !== 0) {
      // Pas le dimanche
      const morningSlots = [
        "09:00",
        "09:30",
        "10:00",
        "10:30",
        "11:00",
        "11:30",
      ];
      const afternoonSlots = [
        "14:00",
        "14:30",
        "15:00",
        "15:30",
        "16:00",
        "16:30",
        "17:00",
        "17:30",
      ];

      [...morningSlots, ...afternoonSlots].forEach((time, index) => {
        slots.push({
          id: `${date.toISOString().split("T")[0]}-${time}`,
          start: time,
          end: "",
          date: date.toISOString().split("T")[0],
          available: Math.random() > 0.3, // 70% de chances d'être disponible
        });
      });
    }
  }

  return slots;
};

export default function ProfessionalProfile() {
  const { id } = useParams<{ id: string }>();
  const { currentUser, userProfile } = useAuth();
  const [professional, setProfessional] = useState<ProfessionalType | null>(
    null,
  );
  const [services] = useState<Service[]>(mockServices);
  const [timeSlots] = useState<TimeSlot[]>(generateTimeSlots());
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingNotes, setBookingNotes] = useState("");
  const [clientAddress, setClientAddress] = useState("");

  useEffect(() => {
    const loadProfessional = async () => {
      try {
        const professionals = await professionalService.getAllProfessionals();
        const found = professionals.find((p) => p.uid === id);
        if (found) {
          setProfessional(found);
        }
      } catch (error) {
        console.error("Erreur lors du chargement du professionnel:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadProfessional();
    }
  }, [id]);

  const handleBookingSubmit = async () => {
    if (!selectedService || !selectedSlot || !currentUser || !professional) {
      return;
    }

    try {
      const clientProfile = userProfile as ClientProfile;
      const address = clientAddress || clientProfile?.address || "";

      const appointmentData = {
        clientId: currentUser.uid,
        professionalId: professional.uid,
        service: selectedService.name,
        date: Timestamp.fromDate(
          new Date(`${selectedSlot.date}T${selectedSlot.start}:00`),
        ),
        duration: selectedService.duration,
        status: "pending" as const,
        price: selectedService.price,
        address: address,
        notes: bookingNotes,
        coordinates: {
          lat: 48.8566 + (Math.random() - 0.5) * 0.1,
          lng: 2.3522 + (Math.random() - 0.5) * 0.1,
        },
      };

      // Créer le rendez-vous
      await appointmentService.createAppointment(appointmentData);

      // Envoyer les emails de confirmation
      const appointment = {
        ...appointmentData,
        id: "temp-id", // L'ID réel serait retourné par createAppointment
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      };

      try {
        const emailResults = await emailService.sendBookingConfirmationEmails(
          appointment,
          professional,
          clientProfile,
        );

        if (emailResults.clientSent && emailResults.professionalSent) {
          console.log("✅ Emails de confirmation envoyés avec succès");
        } else {
          console.warn(
            "⚠️ Certains emails n'ont pas pu être envoyés",
            emailResults,
          );
        }
      } catch (emailError) {
        console.error("Erreur lors de l'envoi des emails:", emailError);
        // On continue même si les emails échouent
      }

      setBookingSuccess(true);
      setShowBookingDialog(false);

      // Reset form
      setSelectedService(null);
      setSelectedSlot(null);
      setBookingNotes("");
      setClientAddress("");
    } catch (error) {
      console.error("Erreur lors de la réservation:", error);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
  };

  const groupSlotsByDate = () => {
    const grouped: Record<string, TimeSlot[]> = {};
    timeSlots.forEach((slot) => {
      if (!grouped[slot.date]) {
        grouped[slot.date] = [];
      }
      grouped[slot.date].push(slot);
    });
    return grouped;
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
          <p className="text-muted-foreground">Chargement du profil...</p>
        </div>
      </div>
    );
  }

  if (!professional) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto" />
          <div>
            <h3 className="text-lg font-semibold">Professionnel non trouvé</h3>
            <p className="text-muted-foreground">
              Ce professionnel n'existe pas ou n'est plus disponible.
            </p>
          </div>
          <Button asChild>
            <Link to="/professionnels">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour à la liste
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Back Button */}
        <div className="mb-6">
          <Button variant="outline" asChild>
            <Link to="/professionnels">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour à la liste
            </Link>
          </Button>
        </div>

        {/* Success Alert */}
        {bookingSuccess && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              <strong>Réservation confirmée !</strong> Votre demande de
              rendez-vous a été envoyée. Le professionnel vous contactera pour
              confirmer les détails.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Professional Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header Card */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-6">
                  <Avatar className="h-24 w-24">
                    <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                      {professional.companyName?.[0] || "P"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-2xl font-bold">
                        {professional.companyName}
                      </h1>
                      {professional.isVerified && (
                        <Badge variant="secondary">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Vérifié
                        </Badge>
                      )}
                    </div>
                    <p className="text-lg text-muted-foreground mb-4">
                      {professional.profession}
                    </p>

                    <div className="flex items-center gap-6 text-sm">
                      {professional.rating && (
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="font-medium">
                            {professional.rating.toFixed(1)}
                          </span>
                          <span className="text-muted-foreground">
                            ({professional.totalReviews || 0} avis)
                          </span>
                        </div>
                      )}
                      {professional.address && (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{professional.address}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {professional.description && (
                  <div className="mt-6 pt-6 border-t">
                    <h3 className="font-semibold mb-2">À propos</h3>
                    <p className="text-muted-foreground">
                      {professional.description}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Services */}
            <Card>
              <CardHeader>
                <CardTitle>Services proposés</CardTitle>
                <CardDescription>
                  Sélectionnez le service dont vous avez besoin
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                        selectedService?.id === service.id
                          ? "border-primary bg-primary/5"
                          : "hover:border-gray-300"
                      }`}
                      onClick={() => setSelectedService(service)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold">{service.name}</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {service.description}
                          </p>
                          <div className="flex items-center gap-4 mt-3">
                            <div className="flex items-center gap-1">
                              <Euro className="h-4 w-4 text-green-600" />
                              <span className="font-medium">
                                {service.price}€
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4 text-blue-600" />
                              <span>{service.duration} min</span>
                            </div>
                          </div>
                        </div>
                        {selectedService?.id === service.id && (
                          <CheckCircle className="h-5 w-5 text-primary" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Disponibilités */}
            {selectedService && (
              <Card>
                <CardHeader>
                  <CardTitle>Choisir un créneau</CardTitle>
                  <CardDescription>
                    Sélectionnez la date et l'heure qui vous conviennent
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {Object.entries(groupSlotsByDate()).map(([date, slots]) => (
                      <div key={date}>
                        <h3 className="font-medium mb-3">{formatDate(date)}</h3>
                        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                          {slots.map((slot) => (
                            <Button
                              key={slot.id}
                              variant={
                                selectedSlot?.id === slot.id
                                  ? "default"
                                  : "outline"
                              }
                              size="sm"
                              disabled={!slot.available}
                              onClick={() => setSelectedSlot(slot)}
                              className="h-auto py-2"
                            >
                              {slot.start}
                            </Button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Booking Button */}
            {selectedService && selectedSlot && (
              <Card>
                <CardContent className="p-6">
                  <div className="text-center space-y-4">
                    <div className="bg-primary/5 rounded-lg p-4">
                      <h3 className="font-semibold mb-2">
                        Récapitulatif de votre réservation
                      </h3>
                      <div className="space-y-2 text-sm">
                        <p>
                          <strong>Service :</strong> {selectedService.name}
                        </p>
                        <p>
                          <strong>Date :</strong>{" "}
                          {formatDate(selectedSlot.date)}
                        </p>
                        <p>
                          <strong>Heure :</strong> {selectedSlot.start}
                        </p>
                        <p>
                          <strong>Durée :</strong> {selectedService.duration}{" "}
                          minutes
                        </p>
                        <p>
                          <strong>Prix :</strong> {selectedService.price}€
                        </p>
                      </div>
                    </div>

                    {currentUser ? (
                      <Dialog
                        open={showBookingDialog}
                        onOpenChange={setShowBookingDialog}
                      >
                        <DialogTrigger asChild>
                          <Button size="lg" className="w-full">
                            <Calendar className="h-4 w-4 mr-2" />
                            Confirmer la réservation
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Finaliser la réservation</DialogTitle>
                            <DialogDescription>
                              Quelques informations supplémentaires pour
                              confirmer votre rendez-vous.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="address">
                                Adresse d'intervention
                              </Label>
                              <Input
                                id="address"
                                value={clientAddress}
                                onChange={(e) =>
                                  setClientAddress(e.target.value)
                                }
                                placeholder="Adresse où le professionnel doit intervenir"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="notes">Notes (optionnel)</Label>
                              <Textarea
                                id="notes"
                                value={bookingNotes}
                                onChange={(e) =>
                                  setBookingNotes(e.target.value)
                                }
                                placeholder="Détails supplémentaires, instructions particulières..."
                                rows={3}
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button
                              variant="outline"
                              onClick={() => setShowBookingDialog(false)}
                            >
                              Annuler
                            </Button>
                            <Button onClick={handleBookingSubmit}>
                              Confirmer la réservation
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    ) : (
                      <div className="space-y-3">
                        <p className="text-sm text-muted-foreground">
                          Vous devez être connecté pour réserver un rendez-vous
                        </p>
                        <div className="flex gap-2">
                          <Button asChild>
                            <Link to="/connexion">Se connecter</Link>
                          </Button>
                          <Button variant="outline" asChild>
                            <Link to="/inscription">S'inscrire</Link>
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle>Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <a
                      href={`mailto:${professional.email}`}
                      className="hover:text-primary"
                    >
                      {professional.email}
                    </a>
                  </div>
                  {professional.phone && (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <a
                        href={`tel:${professional.phone}`}
                        className="hover:text-primary"
                      >
                        {professional.phone}
                      </a>
                    </div>
                  )}
                  {professional.address && (
                    <div className="flex items-center gap-2 text-sm">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <span>{professional.address}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Services List */}
            {professional.services && professional.services.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Spécialités</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {professional.services.map((service, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-sm"
                      >
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>{service}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Professional Stats */}
            <Card>
              <CardHeader>
                <CardTitle>En quelques chiffres</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm">Note moyenne</span>
                  </div>
                  <span className="font-semibold">
                    {professional.rating?.toFixed(1) || "N/A"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">Avis clients</span>
                  </div>
                  <span className="font-semibold">
                    {professional.totalReviews || 0}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-purple-500" />
                    <span className="text-sm">Professionnel</span>
                  </div>
                  <span className="font-semibold">
                    {professional.isVerified ? "Vérifié" : "Non vérifié"}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
