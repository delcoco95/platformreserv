import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { AvailabilityManager } from "./AvailabilityManager";
import { ServicesManager } from "./ServicesManager";
import { StatsChart } from "./StatsChart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Calendar,
  Euro,
  BarChart3,
  TrendingUp,
  Star,
  ExternalLink,
} from "lucide-react";
import { Button } from "./ui/button";
import { Appointment, ProfessionalProfile } from "../types";

interface ProfessionalTabsProps {
  appointments: Appointment[];
  professionalProfile: ProfessionalProfile;
  todayAppointments: Appointment[];
  upcomingAppointments: Appointment[];
  completedAppointments: Appointment[];
  totalEarnings: number;
  chartData: Array<{ name: string; value: number; color: string }>;
  dashboardContent: React.ReactNode;
}

export function ProfessionalTabs({
  appointments,
  professionalProfile,
  todayAppointments,
  upcomingAppointments,
  completedAppointments,
  totalEarnings,
  chartData,
  dashboardContent,
}: ProfessionalTabsProps) {
  return (
    <Tabs defaultValue="dashboard" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="dashboard" className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4" />
          Tableau de bord
        </TabsTrigger>
        <TabsTrigger value="availability" className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          Disponibilités
        </TabsTrigger>
        <TabsTrigger value="services" className="flex items-center gap-2">
          <Euro className="h-4 w-4" />
          Services & Prix
        </TabsTrigger>
        <TabsTrigger value="stats" className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4" />
          Statistiques
        </TabsTrigger>
      </TabsList>

      <TabsContent value="dashboard" className="mt-6">
        {dashboardContent}
      </TabsContent>

      <TabsContent value="availability" className="mt-6">
        <AvailabilityManager />
      </TabsContent>

      <TabsContent value="services" className="mt-6">
        <ServicesManager />
      </TabsContent>

      <TabsContent value="stats" className="mt-6">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Statistiques détaillées</CardTitle>
              <CardDescription>
                Analysez vos performances et votre activité
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-4">Rendez-vous par statut</h3>
                  <StatsChart data={chartData} />
                </div>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">Chiffre d'affaires</h4>
                    <p className="text-2xl font-bold text-green-600">{totalEarnings}€</p>
                    <p className="text-sm text-muted-foreground">Total réalisé</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">Taux de conversion</h4>
                    <p className="text-2xl font-bold text-blue-600">
                      {appointments.length > 0 
                        ? Math.round((completedAppointments.length / appointments.length) * 100)
                        : 0}%
                    </p>
                    <p className="text-sm text-muted-foreground">Rendez-vous honorés</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">Note moyenne</h4>
                    <div className="flex items-center gap-2">
                      <p className="text-2xl font-bold text-yellow-600">
                        {professionalProfile?.rating?.toFixed(1) || "N/A"}
                      </p>
                      <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Sur {professionalProfile?.totalReviews || 0} avis
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions rapides pour les stats */}
          <Card>
            <CardHeader>
              <CardTitle>Actions rapides</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <BarChart3 className="h-4 w-4 mr-2" />
                Exporter mes statistiques
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Star className="h-4 w-4 mr-2" />
                Gérer mes avis clients
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <ExternalLink className="h-4 w-4 mr-2" />
                Accéder au support pro
              </Button>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  );
}
