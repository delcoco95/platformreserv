import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { BarChart3, Star, ExternalLink } from "lucide-react";
import { Appointment } from "../../types";
import { formatDate, formatTime } from "../../lib/dateUtils";

interface ProfessionalOverviewProps {
  appointments: Appointment[];
  onValidateAppointment: (appointmentId: string) => Promise<void>;
}

export const ProfessionalOverview = ({ 
  appointments, 
  onValidateAppointment 
}: ProfessionalOverviewProps) => {
  const upcomingAppointments = appointments.filter(
    (apt) => apt.status === "confirmed" || apt.status === "pending"
  );

  return (
    <div className="space-y-6">
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

      {/* Prochains rendez-vous */}
      <Card>
        <CardHeader>
          <CardTitle>Prochains rendez-vous</CardTitle>
        </CardHeader>
        <CardContent>
          {upcomingAppointments.length === 0 ? (
            <div className="text-center py-8">
              <h3 className="text-lg font-semibold mb-2">Aucun rendez-vous</h3>
              <p className="text-muted-foreground">
                Vos rendez-vous apparaîtront ici une fois que les clients commenceront à réserver
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {upcomingAppointments.slice(0, 3).map((appointment) => (
                <Card key={appointment.id} className="border-l-4 border-l-primary">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h3 className="font-semibold text-lg">{appointment.service}</h3>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(appointment.date)} à {formatTime(appointment.date)}
                        </p>
                        {appointment.price && (
                          <div className="text-sm font-medium text-green-600">
                            {appointment.price}€
                          </div>
                        )}
                      </div>
                      {appointment.status === "confirmed" && (
                        <Button
                          size="sm"
                          onClick={() => onValidateAppointment(appointment.id)}
                        >
                          Valider
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
