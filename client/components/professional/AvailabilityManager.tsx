import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Badge } from "../ui/badge";
import { Clock, Plus, X } from "lucide-react";

interface TimeSlot {
  start: string;
  end: string;
}

interface DayAvailability {
  enabled: boolean;
  slots: TimeSlot[];
}

interface SimpleAvailability {
  [key: string]: DayAvailability;
}

interface AvailabilityManagerProps {
  availability: any; // L'ancienne structure
  onUpdateAvailability: (availability: SimpleAvailability) => void;
}

const daysOfWeek = [
  { key: "monday", label: "Lundi" },
  { key: "tuesday", label: "Mardi" },
  { key: "wednesday", label: "Mercredi" },
  { key: "thursday", label: "Jeudi" },
  { key: "friday", label: "Vendredi" },
  { key: "saturday", label: "Samedi" },
  { key: "sunday", label: "Dimanche" },
];

export const AvailabilityManager = ({
  availability,
  onUpdateAvailability,
}: AvailabilityManagerProps) => {
  // Convertir l'ancienne structure vers la nouvelle
  const initializeAvailability = (): SimpleAvailability => {
    const newAvailability: SimpleAvailability = {};

    daysOfWeek.forEach(({ key }) => {
      // Récupérer l'état depuis l'ancienne structure ou utiliser une valeur par défaut
      const isEnabled = availability?.[key] || false;

      newAvailability[key] = {
        enabled: isEnabled,
        slots: isEnabled ? [{ start: "09:00", end: "17:00" }] : [],
      };
    });

    return newAvailability;
  };

  const [localAvailability, setLocalAvailability] =
    useState<SimpleAvailability>(initializeAvailability());

  const updateDayAvailability = (day: string, enabled: boolean) => {
    setLocalAvailability((prev) => {
      const newAvailability = {
        ...prev,
        [day]: {
          ...prev[day],
          enabled,
          slots: enabled
            ? prev[day].slots.length > 0
              ? prev[day].slots
              : [{ start: "09:00", end: "17:00" }]
            : [],
        },
      };
      onUpdateAvailability(newAvailability);
      return newAvailability;
    });
  };

  const addTimeSlot = (day: string) => {
    setLocalAvailability((prev) => {
      const newAvailability = {
        ...prev,
        [day]: {
          ...prev[day],
          slots: [...prev[day].slots, { start: "09:00", end: "17:00" }],
        },
      };
      onUpdateAvailability(newAvailability);
      return newAvailability;
    });
  };

  const removeTimeSlot = (day: string, slotIndex: number) => {
    setLocalAvailability((prev) => {
      const newAvailability = {
        ...prev,
        [day]: {
          ...prev[day],
          slots: prev[day].slots.filter((_, index) => index !== slotIndex),
        },
      };
      onUpdateAvailability(newAvailability);
      return newAvailability;
    });
  };

  const updateTimeSlot = (
    day: string,
    slotIndex: number,
    field: "start" | "end",
    value: string,
  ) => {
    setLocalAvailability((prev) => {
      const newAvailability = {
        ...prev,
        [day]: {
          ...prev[day],
          slots: prev[day].slots.map((slot, index) =>
            index === slotIndex ? { ...slot, [field]: value } : slot,
          ),
        },
      };
      onUpdateAvailability(newAvailability);
      return newAvailability;
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestion des disponibilités</CardTitle>
        <CardDescription>
          Configurez vos créneaux horaires pour chaque jour de la semaine
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {daysOfWeek.map(({ key, label }) => {
          const dayAvailability = localAvailability[key];

          return (
            <div key={key} className="space-y-4 p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Label
                    htmlFor={`day-${key}`}
                    className="text-base font-medium"
                  >
                    {label}
                  </Label>
                  <Switch
                    id={`day-${key}`}
                    checked={dayAvailability.enabled}
                    onCheckedChange={(enabled) =>
                      updateDayAvailability(key, enabled)
                    }
                  />
                </div>
                {dayAvailability.enabled && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addTimeSlot(key)}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Ajouter créneau
                  </Button>
                )}
              </div>

              {dayAvailability.enabled && (
                <div className="space-y-3 ml-6">
                  {dayAvailability.slots.length === 0 && (
                    <p className="text-sm text-muted-foreground">
                      Aucun créneau défini. Ajoutez un créneau pour ce jour.
                    </p>
                  )}

                  {dayAvailability.slots.map((slot, slotIndex) => (
                    <div
                      key={slotIndex}
                      className="flex items-center space-x-3 p-3 bg-muted/30 rounded-md"
                    >
                      <Clock className="h-4 w-4 text-muted-foreground" />

                      <div className="flex items-center space-x-2">
                        <Label
                          htmlFor={`${key}-${slotIndex}-start`}
                          className="text-sm"
                        >
                          De
                        </Label>
                        <Input
                          id={`${key}-${slotIndex}-start`}
                          type="time"
                          value={slot.start}
                          onChange={(e) =>
                            updateTimeSlot(
                              key,
                              slotIndex,
                              "start",
                              e.target.value,
                            )
                          }
                          className="w-24"
                        />
                      </div>

                      <div className="flex items-center space-x-2">
                        <Label
                          htmlFor={`${key}-${slotIndex}-end`}
                          className="text-sm"
                        >
                          à
                        </Label>
                        <Input
                          id={`${key}-${slotIndex}-end`}
                          type="time"
                          value={slot.end}
                          onChange={(e) =>
                            updateTimeSlot(
                              key,
                              slotIndex,
                              "end",
                              e.target.value,
                            )
                          }
                          className="w-24"
                        />
                      </div>

                      {dayAvailability.slots.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeTimeSlot(key, slotIndex)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {!dayAvailability.enabled && (
                <div className="ml-6">
                  <Badge variant="secondary">Indisponible</Badge>
                </div>
              )}
            </div>
          );
        })}

        <div className="pt-4 border-t">
          <p className="text-sm text-muted-foreground">
            💡 Astuce: Vous pouvez définir plusieurs créneaux par jour (ex:
            9h-12h et 14h-18h)
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
