import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Settings,
  MessageCircle,
  Plus,
  Bell,
  Building,
} from "lucide-react";
import { ClientProfile, ProfessionalProfile } from "../../types";

interface SidebarProps {
  currentUser: any;
  clientProfile: ClientProfile | null;
  lastProfessional: ProfessionalProfile | null;
  onEditProfile: () => void;
}

export const Sidebar = ({
  currentUser,
  clientProfile,
  lastProfessional,
  onEditProfile,
}: SidebarProps) => {
  return (
    <div className="space-y-6">
      {/* Profile Card */}
      <Card>
        <CardHeader>
          <CardTitle>Mon profil</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <User className="h-4 w-4 text-muted-foreground" />
              <span>
                {clientProfile?.firstName || ""}{" "}
                {clientProfile?.lastName || ""}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{currentUser.email}</span>
            </div>
            {clientProfile?.phone && (
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{clientProfile.phone}</span>
              </div>
            )}
            {clientProfile?.address && (
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{clientProfile.address}</span>
              </div>
            )}
          </div>

          <Button
            variant="outline"
            className="w-full mt-4"
            onClick={onEditProfile}
          >
            <Settings className="h-4 w-4 mr-2" />
            Modifier
          </Button>
        </CardContent>
      </Card>

      {/* Last Professional Used */}
      {lastProfessional && (
        <Card>
          <CardHeader>
            <CardTitle>Dernier professionnel</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-secondary">
                  {lastProfessional.companyName?.[0] || "P"}
                </AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-semibold">
                  {lastProfessional.companyName}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {lastProfessional.profession}
                </p>
              </div>
            </div>
            <div className="space-y-2">
              {lastProfessional.phone && (
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <a
                    href={`tel:${lastProfessional.phone}`}
                    className="hover:text-primary"
                  >
                    {lastProfessional.phone}
                  </a>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{lastProfessional.email}</span>
              </div>
              {lastProfessional.address && (
                <div className="flex items-center gap-2 text-sm">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs">
                    {lastProfessional.address}
                  </span>
                </div>
              )}
            </div>
            <Button variant="outline" size="sm" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Reprendre RDV
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Messages/Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Messages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <MessageCircle className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">
              Aucun nouveau message
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Preferences Card */}
      {clientProfile?.preferences && (
        <Card>
          <CardHeader>
            <CardTitle>Mes préférences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-muted-foreground" />
                <span>Notifications générales</span>
              </div>
              <Badge
                variant={
                  clientProfile.preferences.notifications
                    ? "default"
                    : "secondary"
                }
              >
                {clientProfile.preferences.notifications
                  ? "Activées"
                  : "Désactivées"}
              </Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>Alertes email</span>
              </div>
              <Badge
                variant={
                  clientProfile.preferences.emailAlerts
                    ? "default"
                    : "secondary"
                }
              >
                {clientProfile.preferences.emailAlerts
                  ? "Activées"
                  : "Désactivées"}
              </Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-muted-foreground" />
                <span>Alertes SMS</span>
              </div>
              <Badge
                variant={
                  clientProfile.preferences.smsAlerts
                    ? "default"
                    : "secondary"
                }
              >
                {clientProfile.preferences.smsAlerts
                  ? "Activées"
                  : "Désactivées"}
              </Badge>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full mt-3"
              onClick={onEditProfile}
            >
              <Settings className="h-4 w-4 mr-2" />
              Modifier les préférences
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
