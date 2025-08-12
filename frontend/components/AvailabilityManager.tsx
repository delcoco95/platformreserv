import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Switch } from "./ui/switch";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Clock,
  Plus,
  Trash2,
  Calendar,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

interface TimeSlot {
  id: string;
  start: string;
  end: string;
}

interface DayAvailability {
  day: string;
  isAvailable: boolean;
  timeSlots: TimeSlot[];
}

const DAYS_OF_WEEK = [
  { key: "monday", label: "Lundi" },
  { key: "tuesday", label: "Mardi" },
  { key: "wednesday", label: "Mercredi" },
  { key: "thursday", label: "Jeudi" },
  { key: "friday", label: "Vendredi" },
  { key: "saturday", label: "Samedi" },
  { key: "sunday", label: "Dimanche" },
];

const TIME_OPTIONS = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
];

export function AvailabilityManager() {
  const [availability, setAvailability] = useState<
    Record<string, DayAvailability>
  >({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [newSlotStart, setNewSlotStart] = useState("");
  const [newSlotEnd, setNewSlotEnd] = useState("");
  const [showAddSlotDialog, setShowAddSlotDialog] = useState(false);

  useEffect(() => {
    // Initialiser les disponibilités par défaut
    const defaultAvailability: Record<string, DayAvailability> = {};
    DAYS_OF_WEEK.forEach((day) => {
      defaultAvailability[day.key] = {
        day: day.key,
        isAvailable: day.key !== "sunday", // Dimanche fermé par défaut
        timeSlots:
          day.key !== "sunday"
            ? [
                { id: "1", start: "09:00", end: "12:00" },
                { id: "2", start: "14:00", end: "18:00" },
              ]
            : [],
      };
    });
    setAvailability(defaultAvailability);
  }, []);

  const toggleDayAvailability = (dayKey: string) => {
    setAvailability((prev) => ({
      ...prev,
      [dayKey]: {
        ...prev[dayKey],
        isAvailable: !prev[dayKey].isAvailable,
        timeSlots: !prev[dayKey].isAvailable ? prev[dayKey].timeSlots : [],
      },
    }));
  };

  const addTimeSlot = () => {
    if (!selectedDay || !newSlotStart || !newSlotEnd) return;

    if (newSlotStart >= newSlotEnd) {
      alert("L'heure de fin doit être après l'heure de début");
      return;
    }

    const newSlot: TimeSlot = {
      id: Date.now().toString(),
      start: newSlotStart,
      end: newSlotEnd,
    };

    setAvailability((prev) => ({
      ...prev,
      [selectedDay]: {
        ...prev[selectedDay],
        timeSlots: [...prev[selectedDay].timeSlots, newSlot].sort((a, b) =>
          a.start.localeCompare(b.start),
        ),
      },
    }));

    setNewSlotStart("");
    setNewSlotEnd("");
    setShowAddSlotDialog(false);
  };

  const removeTimeSlot = (dayKey: string, slotId: string) => {
    setAvailability((prev) => ({
      ...prev,
      [dayKey]: {
        ...prev[dayKey],
        timeSlots: prev[dayKey].timeSlots.filter((slot) => slot.id !== slotId),
      },
    }));
  };

  const saveAvailability = async () => {
    setIsLoading(true);
    try {
      // Ici on sauvegarderait en base de données
      await new Promise((resolve) => setTimeout(resolve, 1000));
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
            Vos disponibilités ont été mises à jour avec succès !
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Gestion des disponibilités
          </CardTitle>
          <CardDescription>
            Définissez vos créneaux horaires pour chaque jour de la semaine. Les
            clients pourront réserver uniquement sur ces créneaux.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {DAYS_OF_WEEK.map((day) => {
            const dayAvailability = availability[day.key];
            if (!dayAvailability) return null;

            return (
              <div key={day.key} className="border rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Switch
                      checked={dayAvailability.isAvailable}
                      onCheckedChange={() => toggleDayAvailability(day.key)}
                    />
                    <Label className="text-base font-medium">{day.label}</Label>
                  </div>
                  {dayAvailability.isAvailable && (
                    <Dialog
                      open={showAddSlotDialog && selectedDay === day.key}
                      onOpenChange={(open) => {
                        setShowAddSlotDialog(open);
                        if (open) setSelectedDay(day.key);
                      }}
                    >
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedDay(day.key)}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Ajouter un créneau
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>
                            Ajouter un créneau - {day.label}
                          </DialogTitle>
                          <DialogDescription>
                            Définissez l'heure de début et de fin pour ce
                            nouveau créneau.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid grid-cols-2 gap-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="start-time">Heure de début</Label>
                            <Select
                              value={newSlotStart}
                              onValueChange={setNewSlotStart}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionner" />
                              </SelectTrigger>
                              <SelectContent>
                                {TIME_OPTIONS.map((time) => (
                                  <SelectItem key={time} value={time}>
                                    {time}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="end-time">Heure de fin</Label>
                            <Select
                              value={newSlotEnd}
                              onValueChange={setNewSlotEnd}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionner" />
                              </SelectTrigger>
                              <SelectContent>
                                {TIME_OPTIONS.map((time) => (
                                  <SelectItem key={time} value={time}>
                                    {time}
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
                              setShowAddSlotDialog(false);
                              setNewSlotStart("");
                              setNewSlotEnd("");
                            }}
                          >
                            Annuler
                          </Button>
                          <Button onClick={addTimeSlot}>Ajouter</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>

                {dayAvailability.isAvailable && (
                  <div className="ml-6 space-y-2">
                    {dayAvailability.timeSlots.length === 0 ? (
                      <p className="text-sm text-muted-foreground italic">
                        Aucun créneau défini. Ajoutez des créneaux pour ce jour.
                      </p>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {dayAvailability.timeSlots.map((slot) => (
                          <Badge
                            key={slot.id}
                            variant="secondary"
                            className="flex items-center gap-2 px-3 py-1"
                          >
                            <Clock className="h-3 w-3" />
                            {slot.start} - {slot.end}
                            <button
                              onClick={() => removeTimeSlot(day.key, slot.id)}
                              className="ml-1 text-muted-foreground hover:text-destructive"
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {!dayAvailability.isAvailable && (
                  <div className="ml-6">
                    <Badge variant="outline" className="text-muted-foreground">
                      Fermé
                    </Badge>
                  </div>
                )}
              </div>
            );
          })}

          <div className="flex justify-end pt-4 border-t">
            <Button
              onClick={saveAvailability}
              disabled={isLoading}
              className="w-full sm:w-auto"
            >
              {isLoading ? "Sauvegarde..." : "Sauvegarder les disponibilités"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>Conseil :</strong> Veillez à laisser suffisamment de temps
          entre vos rendez-vous pour vous déplacer et préparer vos
          interventions.
        </AlertDescription>
      </Alert>
    </div>
  );
}
