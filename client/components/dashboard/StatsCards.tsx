import { Card, CardContent } from "../ui/card";
import { Calendar, CalendarCheck, Star } from "lucide-react";

interface StatsCardsProps {
  upcomingAppointmentsCount: number;
  completedAppointmentsCount: number;
  averageRating?: number;
}

export const StatsCards = ({ 
  upcomingAppointmentsCount, 
  completedAppointmentsCount,
  averageRating = 4.8
}: StatsCardsProps) => {
  const stats = [
    {
      icon: Calendar,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      value: upcomingAppointmentsCount,
      label: "RDV à venir"
    },
    {
      icon: CalendarCheck,
      iconBg: "bg-green-100", 
      iconColor: "text-green-600",
      value: completedAppointmentsCount,
      label: "Services reçus"
    },
    {
      icon: Star,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600", 
      value: averageRating,
      label: "Note moyenne"
    }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 ${stat.iconBg} rounded-full flex items-center justify-center`}>
                <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
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
