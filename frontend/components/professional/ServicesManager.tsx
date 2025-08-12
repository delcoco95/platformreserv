import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Badge } from "../ui/badge";
import { Plus, Edit, Trash2, Euro, Clock } from "lucide-react";

interface Service {
  name: string;
  price: number;
  duration: number;
  description?: string;
}

interface ServicesManagerProps {
  services: Service[];
  onUpdateServices: (services: Service[]) => void;
}

export const ServicesManager = ({
  services,
  onUpdateServices,
}: ServicesManagerProps) => {
  const [showAddService, setShowAddService] = useState(false);
  const [editingService, setEditingService] = useState<number | null>(null);
  const [formData, setFormData] = useState<Service>({
    name: "",
    price: 0,
    duration: 60,
    description: "",
  });

  const resetForm = () => {
    setFormData({
      name: "",
      price: 0,
      duration: 60,
      description: "",
    });
    setEditingService(null);
  };

  const handleAddService = () => {
    if (formData.name && formData.price > 0) {
      const newServices = [...services, formData];
      onUpdateServices(newServices);
      resetForm();
      setShowAddService(false);
    }
  };

  const handleEditService = (index: number) => {
    setFormData(services[index]);
    setEditingService(index);
    setShowAddService(true);
  };

  const handleUpdateService = () => {
    if (editingService !== null && formData.name && formData.price > 0) {
      const newServices = [...services];
      newServices[editingService] = formData;
      onUpdateServices(newServices);
      resetForm();
      setShowAddService(false);
    }
  };

  const handleDeleteService = (index: number) => {
    const newServices = services.filter((_, i) => i !== index);
    onUpdateServices(newServices);
  };

  const handleDialogOpenChange = (open: boolean) => {
    if (!open) {
      resetForm();
    }
    setShowAddService(open);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Mes services</CardTitle>
            <CardDescription>
              Gérez vos services et leurs tarifs
            </CardDescription>
          </div>
          <Dialog open={showAddService} onOpenChange={handleDialogOpenChange}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un service
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingService !== null
                    ? "Modifier le service"
                    : "Ajouter un service"}
                </DialogTitle>
                <DialogDescription>
                  Définissez les détails de votre service
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="serviceName">Nom du service *</Label>
                  <Input
                    id="serviceName"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Ex: Révision complète"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="servicePrice">Prix (€) *</Label>
                    <Input
                      id="servicePrice"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          price: parseFloat(e.target.value) || 0,
                        })
                      }
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <Label htmlFor="serviceDuration">Durée (min)</Label>
                    <Input
                      id="serviceDuration"
                      type="number"
                      min="15"
                      step="15"
                      value={formData.duration}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          duration: parseInt(e.target.value) || 60,
                        })
                      }
                      placeholder="60"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="serviceDescription">Description</Label>
                  <Textarea
                    id="serviceDescription"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Description détaillée du service..."
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => handleDialogOpenChange(false)}
                >
                  Annuler
                </Button>
                <Button
                  onClick={
                    editingService !== null
                      ? handleUpdateService
                      : handleAddService
                  }
                >
                  {editingService !== null ? "Modifier" : "Ajouter"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {services.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-muted-foreground">Aucun service configuré</div>
            <p className="text-sm text-muted-foreground mt-1">
              Ajoutez vos premiers services pour commencer à recevoir des
              réservations
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {services.map((service, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-medium">{service.name}</h4>
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      <Euro className="h-3 w-3" />
                      {service.price}€
                    </Badge>
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      <Clock className="h-3 w-3" />
                      {service.duration}min
                    </Badge>
                  </div>
                  {service.description && (
                    <p className="text-sm text-muted-foreground">
                      {service.description}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditService(index)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteService(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
