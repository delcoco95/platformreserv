import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Switch } from "./ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Alert, AlertDescription } from "./ui/alert";
import { useAuth } from "../contexts/AuthContext";
import { ClientProfile, ProfessionalProfile } from "../types";
import { AlertCircle, Loader2 } from "lucide-react";

interface EditProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditProfileDialog({
  open,
  onOpenChange,
}: EditProfileDialogProps) {
  const { userProfile, updateUserProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState(() => {
    if (!userProfile) return {};

    if (userProfile.userType === "client") {
      const client = userProfile as ClientProfile;
      return {
        firstName: client.firstName || "",
        lastName: client.lastName || "",
        phone: client.phone || "",
        address: client.address || "",
        notifications: client.preferences?.notifications ?? true,
        smsAlerts: client.preferences?.smsAlerts ?? false,
        emailAlerts: client.preferences?.emailAlerts ?? true,
      };
    } else {
      const professional = userProfile as ProfessionalProfile;
      return {
        companyName: professional.companyName || "",
        phone: professional.phone || "",
        address: professional.address || "",
        description: professional.description || "",
      };
    }
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userProfile) return;

    setLoading(true);
    setError("");

    try {
      let updateData: Partial<ClientProfile | ProfessionalProfile> = {};

      if (userProfile.userType === "client") {
        updateData = {
          firstName: formData.firstName as string,
          lastName: formData.lastName as string,
          phone: formData.phone as string,
          address: formData.address as string,
          preferences: {
            notifications: formData.notifications as boolean,
            smsAlerts: formData.smsAlerts as boolean,
            emailAlerts: formData.emailAlerts as boolean,
          },
        };
      } else {
        updateData = {
          companyName: formData.companyName as string,
          phone: formData.phone as string,
          address: formData.address as string,
          description: formData.description as string,
        };
      }

      await updateUserProfile(updateData);
      onOpenChange(false);
    } catch (err: any) {
      console.error("Erreur lors de la mise à jour:", err);
      setError("Une erreur est survenue lors de la mise à jour");
    } finally {
      setLoading(false);
    }
  };

  if (!userProfile) return null;

  const isClient = userProfile.userType === "client";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Modifier mon profil</DialogTitle>
          <DialogDescription>
            Mettez à jour vos informations personnelles
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {isClient ? (
            <>
              {/* Champs Client */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Prénom</Label>
                  <Input
                    id="firstName"
                    value={(formData.firstName as string) || ""}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Nom</Label>
                  <Input
                    id="lastName"
                    value={(formData.lastName as string) || ""}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={(formData.phone as string) || ""}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Adresse</Label>
                <Input
                  id="address"
                  value={(formData.address as string) || ""}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  disabled={loading}
                />
              </div>

              {/* Préférences */}
              <div className="space-y-4 pt-4 border-t">
                <h4 className="font-medium">Préférences de notification</h4>

                <div className="flex items-center justify-between">
                  <Label htmlFor="notifications" className="flex-1">
                    Notifications générales
                  </Label>
                  <Switch
                    id="notifications"
                    checked={formData.notifications as boolean}
                    onCheckedChange={(checked) =>
                      handleInputChange("notifications", checked)
                    }
                    disabled={loading}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="emailAlerts" className="flex-1">
                    Alertes par email
                  </Label>
                  <Switch
                    id="emailAlerts"
                    checked={formData.emailAlerts as boolean}
                    onCheckedChange={(checked) =>
                      handleInputChange("emailAlerts", checked)
                    }
                    disabled={loading}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="smsAlerts" className="flex-1">
                    Alertes par SMS
                  </Label>
                  <Switch
                    id="smsAlerts"
                    checked={formData.smsAlerts as boolean}
                    onCheckedChange={(checked) =>
                      handleInputChange("smsAlerts", checked)
                    }
                    disabled={loading}
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Champs Professionnel */}
              <div className="space-y-2">
                <Label htmlFor="companyName">Nom de l'entreprise</Label>
                <Input
                  id="companyName"
                  value={(formData.companyName as string) || ""}
                  onChange={(e) =>
                    handleInputChange("companyName", e.target.value)
                  }
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={(formData.phone as string) || ""}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Adresse</Label>
                <Input
                  id="address"
                  value={(formData.address as string) || ""}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={(formData.description as string) || ""}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  placeholder="Décrivez votre entreprise et vos services..."
                  rows={3}
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="services">
                  Services (séparés par des virgules)
                </Label>
                <Textarea
                  id="services"
                  value={(formData.services as string) || ""}
                  onChange={(e) =>
                    handleInputChange("services", e.target.value)
                  }
                  placeholder="Vidange, freinage, lavage auto..."
                  rows={2}
                  disabled={loading}
                />
              </div>
            </>
          )}

          <DialogFooter className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enregistrement...
                </>
              ) : (
                "Enregistrer"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
