import { useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Badge } from "../ui/badge";
import { Clock, Save } from "lucide-react";

interface TimeSlot {
  start: string;
  end: string;
}

interface DayAvailability {
  enabled: boolean;
  morning?: TimeSlot;
  afternoon?: TimeSlot;
  evening?: TimeSlot;
}

interface Availability {
  [key: string]: DayAvailability;
}

interface AvailabilityManagerProps {
  availability: Availability;
  onUpdateAvailability: (availability: Availability) => void;
}

const dayLabels: { [key: string]: string } = {
  monday: "Lundi",
  tuesday: "Mardi",
  wednesday: "Mercredi",
  thursday: "Jeudi",
  friday: "Vendredi",
  saturday: "Samedi",
  sunday: "Dimanche",
};

const timeSlots = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
  "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
  "20:00", "20:30", "21:00"
];

export const AvailabilityManager = ({ availability, onUpdateAvailability }: AvailabilityManagerProps) => {
  const [localAvailability, setLocalAvailability] = useState<Availability>(availability);
  const [hasChanges, setHasChanges] = useState(false);

  const updateDayAvailability = (day: string, enabled: boolean) => {
    const newAvailability = {
      ...localAvailability,
      [day]: {
        ...localAvailability[day],
        enabled,
      },
    };
    setLocalAvailability(newAvailability);
    setHasChanges(true);
  };

  const updateTimeSlot = (day: string, period: 'morning' | 'afternoon' | 'evening', field: 'start' | 'end', value: string) => {
    const newAvailability = {
      ...localAvailability,
      [day]: {
        ...localAvailability[day],
        [period]: {
          ...localAvailability[day]?.[period],
          [field]: value,
        },
      },
    };
    setLocalAvailability(newAvailability);
    setHasChanges(true);
  };

  const handleSave = () => {
    onUpdateAvailability(localAvailability);
    setHasChanges(false);
  };

  const getPeriodLabel = (period: string) => {
    switch (period) {
      case 'morning': return 'Matin';
      case 'afternoon': return 'Après-midi';
      case 'evening': return 'Soir';
      default: return period;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Mes disponibilités</CardTitle>
            <CardDescription>
              Configurez vos créneaux horaires
            </CardDescription>
          </div>
          {hasChanges && (
            <Button onClick={handleSave} size="sm">
              <Save className="h-4 w-4 mr-2" />
              Enregistrer
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {Object.entries(dayLabels).map(([day, label]) => {
          const dayAvailability = localAvailability[day] || { enabled: false };
          
          return (
            <div key={day} className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-base font-medium">{label}</Label>
                <Switch
                  checked={dayAvailability.enabled}
                  onCheckedChange={(enabled) => updateDayAvailability(day, enabled)}
                />
              </div>
              
              {dayAvailability.enabled && (
                <div className="pl-4 space-y-3 border-l-2 border-primary/20">
                  {['morning', 'afternoon', 'evening'].map((period) => {
                    const slot = dayAvailability[period as keyof DayAvailability] as TimeSlot | undefined;
                    
                    return (
                      <div key={period} className="grid grid-cols-[80px_1fr_1fr] gap-3 items-center">
                        <Badge variant="outline" className="justify-center">
                          {getPeriodLabel(period)}
                        </Badge>
                        <Select
                          value={slot?.start || ""}
                          onValueChange={(value) => updateTimeSlot(day, period as any, 'start', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Début" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map((time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Select
                          value={slot?.end || ""}
                          onValueChange={(value) => updateTimeSlot(day, period as any, 'end', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Fin" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map((time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
