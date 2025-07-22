import { Link } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "../ui/tabs";
import {
  Calendar,
  Clock,
  MapPin,
  MessageCircle,
  X,
  Plus,
  CalendarCheck,
  Star,
} from "lucide-react";
import { Appointment } from "../../types";

interface AppointmentsTabsProps {
  upcomingAppointments: Appointment[];
  pastAppointments: Appointment[];
  getStatusBadge: (status: string) => { className: string; label: string };
  formatDate: (date: any) => string;
  formatTime: (date: any) => string;
  onCancelAppointment: (appointmentId: string) => void;
}

export const AppointmentsTabs = ({
  upcomingAppointments,
  pastAppointments,
  getStatusBadge,
  formatDate,
  formatTime,
  onCancelAppointment,
}: AppointmentsTabsProps) => {
  const renderAppointmentCard = (appointment: Appointment, isUpcoming = true) => (
    <Card
      key={appointment.id}
      className={`${isUpcoming ? "border-l-4 border-l-primary" : "opacity-75"}`}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-3">
              <h3 className={`font-semibold ${isUpcoming ? "text-lg" : ""}`}>
                {appointment.service}
              </h3>
              <Badge className={getStatusBadge(appointment.status).className}>
                {getStatusBadge(appointment.status).label}
              </Badge>
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
              <div className={`font-semibold ${isUpcoming ? "text-lg text-primary" : "text-lg"}`}>
                {appointment.price}€
              </div>
            )}

            {appointment.notes && isUpcoming && (
              <div className="text-sm text-muted-foreground">
                <strong>Notes :</strong> {appointment.notes}
              </div>
            )}
          </div>

          <div className="flex gap-2 ml-4">
            {isUpcoming && (
              <>
                <Button variant="outline" size="sm">
                  <MessageCircle className="h-4 w-4" />
                </Button>
                {appointment.status === "confirmed" && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onCancelAppointment(appointment.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </>
            )}
            {!isUpcoming && appointment.status === "completed" && (
              <Button variant="outline" size="sm">
                <Star className="h-4 w-4 mr-2" />
                Noter
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
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
              upcomingAppointments.map((appointment) => 
                renderAppointmentCard(appointment, true)
              )
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
              pastAppointments.map((appointment) => 
                renderAppointmentCard(appointment, false)
              )
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
