import { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Euro, Clock } from "lucide-react";

interface Service {
  name: string;
  price: number;
  duration: number;
  description?: string;
}

interface ServiceSelectorProps {
  services: Service[];
  selectedServices: Service[];
  onSelectionChange: (selectedServices: Service[]) => void;
}

export const ServiceSelector = ({
  services,
  selectedServices,
  onSelectionChange,
}: ServiceSelectorProps) => {
  const handleServiceToggle = (service: Service) => {
    const isSelected = selectedServices.some((s) => s.name === service.name);

    if (isSelected) {
      // Désélectionner le service
      const newSelection = selectedServices.filter(
        (s) => s.name !== service.name,
      );
      onSelectionChange(newSelection);
    } else {
      // Sélectionner le service
      const newSelection = [...selectedServices, service];
      onSelectionChange(newSelection);
    }
  };

  const isServiceSelected = (service: Service) => {
    return selectedServices.some((s) => s.name === service.name);
  };

  const getTotalPrice = () => {
    return selectedServices.reduce(
      (total, service) => total + service.price,
      0,
    );
  };

  const getTotalDuration = () => {
    return selectedServices.reduce(
      (total, service) => total + service.duration,
      0,
    );
  };

  if (services.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Services disponibles</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-4">
            Aucun service disponible pour ce professionnel
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sélectionnez vos services</CardTitle>
        {selectedServices.length > 0 && (
          <div className="flex gap-2 mt-2">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Euro className="h-3 w-3" />
              {getTotalPrice()}€
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {getTotalDuration()}min
            </Badge>
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-3">
        {services.map((service, index) => (
          <div
            key={index}
            className={`flex items-start space-x-3 p-3 rounded-lg border cursor-pointer transition-colors ${
              isServiceSelected(service)
                ? "bg-primary/5 border-primary"
                : "hover:bg-muted/50"
            }`}
            onClick={() => handleServiceToggle(service)}
          >
            <Checkbox
              checked={isServiceSelected(service)}
              onCheckedChange={() => handleServiceToggle(service)}
              className="mt-1"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-medium">{service.name}</h4>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    <Euro className="h-3 w-3" />
                    {service.price}€
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {service.duration}min
                  </Badge>
                </div>
              </div>
              {service.description && (
                <p className="text-sm text-muted-foreground">
                  {service.description}
                </p>
              )}
            </div>
          </div>
        ))}

        {selectedServices.length === 0 && (
          <p className="text-muted-foreground text-center py-4 text-sm">
            Sélectionnez au moins un service pour continuer
          </p>
        )}
      </CardContent>
    </Card>
  );
};
