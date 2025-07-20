import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

interface StatsData {
  confirmed: number;
  completed: number;
  cancelled: number;
  pending: number;
}

interface StatsChartProps {
  data: StatsData;
  title?: string;
}

export function StatsChart({ data, title = "Répartition des rendez-vous" }: StatsChartProps) {
  const total = data.confirmed + data.completed + data.cancelled + data.pending;
  
  if (total === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground">Aucune donnée disponible</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getPercentage = (value: number) => Math.round((value / total) * 100);

  const stats = [
    {
      label: "Confirmés",
      value: data.confirmed,
      percentage: getPercentage(data.confirmed),
      color: "bg-green-500",
      badgeVariant: "default" as const,
    },
    {
      label: "Terminés",
      value: data.completed,
      percentage: getPercentage(data.completed),
      color: "bg-blue-500",
      badgeVariant: "secondary" as const,
    },
    {
      label: "En attente",
      value: data.pending,
      percentage: getPercentage(data.pending),
      color: "bg-yellow-500",
      badgeVariant: "outline" as const,
    },
    {
      label: "Annulés",
      value: data.cancelled,
      percentage: getPercentage(data.cancelled),
      color: "bg-red-500",
      badgeVariant: "destructive" as const,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Barre de progression visuelle */}
        <div className="relative">
          <div className="h-8 bg-gray-100 rounded-lg overflow-hidden flex">
            {stats.map((stat, index) => (
              stat.percentage > 0 && (
                <div
                  key={index}
                  className={`${stat.color} flex items-center justify-center text-white text-xs font-medium`}
                  style={{ width: `${stat.percentage}%` }}
                >
                  {stat.percentage > 8 && `${stat.percentage}%`}
                </div>
              )
            ))}
          </div>
        </div>

        {/* Légende avec détails */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${stat.color}`}></div>
                <span className="text-sm">{stat.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">{stat.value}</span>
                <Badge variant={stat.badgeVariant} className="text-xs">
                  {stat.percentage}%
                </Badge>
              </div>
            </div>
          ))}
        </div>

        {/* Résumé */}
        <div className="pt-4 border-t">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Total des rendez-vous</span>
            <span className="font-semibold">{total}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
