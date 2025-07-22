import { useState } from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Alert, AlertDescription } from "../components/ui/alert";
import { useAuth } from "../contexts/AuthContext";
import { appointmentService } from "../services/appointmentService";
import { now, fromDate } from "../lib/dateUtils";
import { Plus, Trash2, AlertCircle } from "lucide-react";

export default function TestData() {
  const { currentUser, userProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const createSampleAppointments = async () => {
    if (!currentUser || !userProfile) {
      setMessage("Veuillez vous connecter d'abord");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(14, 0, 0, 0);

      const nextWeek = new Date(now);
      nextWeek.setDate(nextWeek.getDate() + 7);
      nextWeek.setHours(10, 30, 0, 0);

      const pastDate = new Date(now);
      pastDate.setDate(pastDate.getDate() - 3);
      pastDate.setHours(16, 0, 0, 0);

      const appointments =
        userProfile.userType === "client"
          ? [
              {
                clientId: currentUser.uid,
                professionalId: "prof_demo_1",
                service: "Vidange moteur",
                date: fromDate(tomorrow),
                duration: 45,
                status: "confirmed" as const,
                price: 65,
                address: "123 Rue de la République, 75001 Paris",
                notes: "Véhicule : Peugeot 308",
              },
              {
                clientId: currentUser.uid,
                professionalId: "prof_demo_2",
                service: "Réparation fuite",
                date: fromDate(nextWeek),
                duration: 90,
                status: "pending" as const,
                price: 120,
                address: "456 Avenue Victor Hugo, 75016 Paris",
                notes: "Urgence - fuite dans la salle de bain",
              },
              {
                clientId: currentUser.uid,
                professionalId: "prof_demo_3",
                service: "Installation serrure",
                date: fromDate(pastDate),
                duration: 60,
                status: "completed" as const,
                price: 180,
                address: "789 Boulevard Saint-Germain, 75005 Paris",
              },
            ]
          : [
              {
                clientId: "client_demo_1",
                professionalId: currentUser.uid,
                service: "Révision complète",
                date: fromDate(tomorrow),
                duration: 120,
                status: "confirmed" as const,
                price: 200,
                address: "15 Rue Victor Hugo, 75001 Paris",
                coordinates: { lat: 48.8566, lng: 2.3522 },
                notes: "Véhicule ancien, contrôle approfondi",
              },
              {
                clientId: "client_demo_2",
                professionalId: currentUser.uid,
                service: "Freinage",
                date: fromDate(nextWeek),
                duration: 60,
                status: "pending" as const,
                price: 120,
                address: "42 Avenue des Champs, 75008 Paris",
                coordinates: { lat: 48.8698, lng: 2.3077 },
              },
            ];

      for (const appointment of appointments) {
        await appointmentService.createAppointment(appointment);
      }

      setMessage(
        `${appointments.length} rendez-vous de démonstration créés avec succès !`,
      );
    } catch (error) {
      console.error("Erreur lors de la création des données:", error);
      setMessage("Erreur lors de la création des données de test");
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser || !userProfile) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto" />
          <div>
            <h3 className="text-lg font-semibold">Connectez-vous</h3>
            <p className="text-muted-foreground">
              Vous devez être connecté pour utiliser cette fonctionnalité.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 py-8">
      <div className="container max-w-2xl mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle>Données de test Firebase</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <p className="text-muted-foreground mb-4">
                Utilisez cette page pour créer des données de démonstration dans
                votre base Firebase. Cela vous permettra de tester les
                dashboards avec des données réelles.
              </p>

              <Alert className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Compte actuel :</strong>{" "}
                  {userProfile.userType === "client"
                    ? "Client"
                    : "Professionnel"}
                  <br />
                  <strong>Email :</strong> {currentUser.email}
                </AlertDescription>
              </Alert>
            </div>

            {message && (
              <Alert
                className={
                  message.includes("succès")
                    ? "border-green-200 bg-green-50"
                    : "border-red-200 bg-red-50"
                }
              >
                <AlertDescription>{message}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">
                  Créer des rendez-vous de démonstration
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {userProfile.userType === "client"
                    ? "Cela créera 3 rendez-vous (1 passé, 2 à venir) pour tester votre dashboard client."
                    : "Cela créera 2 rendez-vous clients pour tester votre dashboard professionnel."}
                </p>
                <Button
                  onClick={createSampleAppointments}
                  disabled={loading}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  {loading
                    ? "Création en cours..."
                    : "Créer des données de test"}
                </Button>
              </div>
            </div>

            <div className="pt-4 border-t">
              <p className="text-xs text-muted-foreground">
                <strong>Note :</strong> Cette page est uniquement à des fins de
                test. En production, les rendez-vous sont créés par les clients
                via l'interface de réservation.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
