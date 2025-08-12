import { Card, CardContent } from "../ui/card";
import { Calendar, Users, Euro, Award } from "lucide-react";
import { Appointment } from "../../types";
import { parseDate } from "../../lib/dateUtils";

interface ProfessionalStatsProps {
  appointments: Appointment[];
  totalReviews?: number;
  rating?: number;
}

export const ProfessionalStats = ({ appointments, totalReviews, rating }: ProfessionalStatsProps) => {
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

  const completedAppointments = appointments.filter((apt) => apt.status === "completed");
  const totalEarnings = completedAppointments.reduce((sum, apt) => sum + (apt.price || 0), 0);

  const stats = [
    {
      icon: Calendar,
      label: "RDV aujourd'hui",
      value: todayAppointments.length,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      icon: Users,
      label: "RDV terminés",
      value: completedAppointments.length,
      color: "text-green-600", 
      bg: "bg-green-100",
    },
    {
      icon: Euro,
      label: "Revenus totaux",
      value: `${totalEarnings}€`,
      color: "text-purple-600",
      bg: "bg-purple-100",
    },
    {
      icon: Award,
      label: "Note moyenne",
      value: rating && rating > 0 ? rating.toFixed(1) : "-",
      color: "text-orange-600",
      bg: "bg-orange-100",
    },
  ];

  return (
    <div className="grid md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 ${stat.bg} rounded-full flex items-center justify-center`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
