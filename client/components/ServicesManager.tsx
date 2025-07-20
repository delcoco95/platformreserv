import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";
import {
  Plus,
  Edit,
  Trash2,
  Euro,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // en minutes
  category: string;
}

const SERVICE_CATEGORIES = [
  { value: "diagnostic", label: "Diagnostic" },
  { value: "reparation", label: "Réparation" },
  { value: "entretien", label: "Entretien" },
  { value: "installation", label: "Installation" },
  { value: "urgence", label: "Urgence" },
  { value: "autre", label: "Autre" },
];

const DURATION_OPTIONS = [
  { value: 30, label: "30 minutes" },
  { value: 60, label: "1 heure" },
  { value: 90, label: "1h30" },
  { value: 120, label: "2 heures" },
  { value: 180, label: "3 heures" },
  { value: 240, label: "4 heures" },
  { value: 480, label: "Journée complète" },
];

export function ServicesManager() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
    category: "",
  });

  useEffect(() => {
    // Services par défaut basés sur les données démo
    const defaultServices: Service[] = [
      {
        id: "1",
        name: "Révision complète",
        description: "Contrôle complet du véhicule : moteur, freins, direction, éclairage",
        price: 150,
        duration: 120,
        category: "entretien",
      },
      {
        id: "2",
        name: "Vidange",
        description: "Changement de l'huile moteur et du filtre à huile",
        price: 45,
        duration: 30,
        category: "entretien",
      },
      {
        id: "3",
        name: "Diagnostic électronique",
        description: "Diagnostic complet des systèmes électroniques du véhicule",
        price: 80,
        duration: 60,
        category: "diagnostic",
      },
    ];
    setServices(defaultServices);
  }, []);

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      duration: "",
      category: "",
    });
    setEditingService(null);
  };

  const openAddDialog = () => {
    resetForm();
    setShowDialog(true);
  };

  const openEditDialog = (service: Service) => {
    setFormData({
      name: service.name,
      description: service.description,
      price: service.price.toString(),
      duration: service.duration.toString(),
      category: service.category,
    });
    setEditingService(service);
    setShowDialog(true);
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.price || !formData.duration || !formData.category) {
      alert("Veuillez remplir tous les champs obligatoires");
      return;
    }

    const serviceData: Service = {
      id: editingService?.id || Date.now().toString(),
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      duration: parseInt(formData.duration),
      category: formData.category,
    };

    if (editingService) {
      setServices(prev => prev.map(service => 
        service.id === editingService.id ? serviceData : service
      ));
    } else {
      setServices(prev => [...prev, serviceData]);
    }

    setShowDialog(false);
    resetForm();
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const deleteService = (serviceId: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce service ?")) {
      setServices(prev => prev.filter(service => service.id !== serviceId));
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const getCategoryLabel = (category: string) => {
    return SERVICE_CATEGORIES.find(cat => cat.value === category)?.label || category;
  };

  const getDurationLabel = (duration: number) => {
    return DURATION_OPTIONS.find(opt => opt.value === duration)?.label || `${duration} min`;
  };

  const saveServices = async () => {
    setIsLoading(true);
    try {
      // Ici on sauvegarderait en base de données
      await new Promise(resolve => setTimeout(resolve, 1000));
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {showSuccess && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            Services mis à jour avec succès !
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Euro className="h-5 w-5" />
                Gestion des services
              </CardTitle>
              <CardDescription>
                Créez et gérez vos services avec leurs prix et durées.
              </CardDescription>
            </div>
            <Dialog open={showDialog} onOpenChange={setShowDialog}>
              <DialogTrigger asChild>
                <Button onClick={openAddDialog}>
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter un service
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>
                    {editingService ? "Modifier le service" : "Ajouter un service"}
                  </DialogTitle>
                  <DialogDescription>
                    Remplissez les informations du service.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom du service *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Ex: Révision complète"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Décrivez le service en détail..."
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">Prix (€) *</Label>
                      <Input
                        id="price"
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                        placeholder="50.00"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="duration">Durée *</Label>
                      <Select
                        value={formData.duration}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, duration: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent>
                          {DURATION_OPTIONS.map(option => (
                            <SelectItem key={option.value} value={option.value.toString()}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Catégorie *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        {SERVICE_CATEGORIES.map(category => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowDialog(false);
                      resetForm();
                    }}
                  >
                    Annuler
                  </Button>
                  <Button onClick={handleSubmit}>
                    {editingService ? "Modifier" : "Ajouter"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {services.length === 0 ? (
            <div className="text-center py-8">
              <Euro className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Aucun service</h3>
              <p className="text-muted-foreground mb-4">
                Commencez par ajouter vos premiers services.
              </p>
              <Button onClick={openAddDialog}>
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un service
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {services.map(service => (
                <div key={service.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{service.name}</h3>
                        <Badge variant="secondary">
                          {getCategoryLabel(service.category)}
                        </Badge>
                      </div>
                      {service.description && (
                        <p className="text-sm text-muted-foreground mb-3">
                          {service.description}
                        </p>
                      )}
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Euro className="h-4 w-4 text-green-600" />
                          <span className="font-medium">{service.price}€</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-blue-600" />
                          <span>{getDurationLabel(service.duration)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditDialog(service)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteService(service.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="flex justify-end pt-4 border-t">
                <Button
                  onClick={saveServices}
                  disabled={isLoading}
                  className="w-full sm:w-auto"
                >
                  {isLoading ? "Sauvegarde..." : "Sauvegarder les services"}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>Conseil :</strong> Définissez des prix justes et compétitifs. 
          Les clients pourront voir vos tarifs avant de réserver.
        </AlertDescription>
      </Alert>
    </div>
  );
}
