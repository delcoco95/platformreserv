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
      tomorrow.setDate(now.getDate() + 1);
      tomorrow.setHours(10, 0, 0, 0);

      const nextWeek = new Date(now);
      nextWeek.setDate(now.getDate() + 7);
      nextWeek.setHours(14, 30, 0, 0);

      const pastDate = new Date(now);
      pastDate.setDate(now.getDate() - 3);
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
                address: "456 Avenue des Champs, 75008 Paris",
                notes: "Urgence plomberie",
              },
              {
                clientId: currentUser.uid,
                professionalId: "prof_demo_3",
                service: "Installation serrure",
                date: fromDate(pastDate),
                duration: 60,
                status: "completed" as const,
                price: 80,
                address: "789 Rue de la Paix, 75009 Paris",
                notes: "Serrure 3 points",
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
                price: 150,
                address: "321 Boulevard Saint-Germain, 75006 Paris",
                notes: "Révision 20 000 km",
              },
              {
                clientId: "client_demo_2",
                professionalId: currentUser.uid,
                service: "Freinage",
                date: fromDate(nextWeek),
                duration: 60,
                status: "pending" as const,
                price: 90,
                address: "654 Rue de Rivoli, 75001 Paris",
                notes: "Changement plaquettes",
              },
            ];

      // Créer les rendez-vous
      for (const appointment of appointments) {
        await appointmentService.createAppointment(appointment);
      }

      setMessage(
        `${appointments.length} rendez-vous de démonstration créés avec succès !`,
      );
    } catch (error: any) {
      console.error("Erreur lors de la création des données:", error);
      setMessage(`Erreur: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const clearData = async () => {
    setLoading(true);
    setMessage("");

    try {
      // Note: Cette fonctionnalité nécessiterait un endpoint API pour supprimer
      setMessage("Fonctionnalité de suppression à implémenter côté API");
    } catch (error: any) {
      setMessage(`Erreur: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Données de test
          </h1>
          <p className="text-gray-600">
            Générez des données de démonstration pour tester l'application
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Données de test</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground">
              Utilisez cette page pour créer des données de démonstration dans
              votre base MongoDB. Cela vous permettra de tester les dashboards
              avec des données réelles.
            </p>

            {message && (
              <Alert
                variant={message.includes("Erreur") ? "destructive" : "default"}
              >
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{message}</AlertDescription>
              </Alert>
            )}

            <div className="flex gap-4 justify-center">
              <Button
                onClick={createSampleAppointments}
                disabled={loading || !currentUser}
                size="lg"
              >
                <Plus className="h-4 w-4 mr-2" />
                {loading ? "Création..." : "Créer des rendez-vous"}
              </Button>

              <Button
                onClick={clearData}
                variant="outline"
                disabled={loading || !currentUser}
                size="lg"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Vider les données
              </Button>
            </div>

            {!currentUser && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Veuillez vous connecter pour créer des données de test.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
