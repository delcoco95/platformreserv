import { useState, useEffect } from "react";
import { Alert, AlertDescription } from "./ui/alert";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { Users, X, Star } from "lucide-react";
import { ProfessionalProfile } from "../types";

interface NewProfessionalAlertProps {
  professionals: ProfessionalProfile[];
}

export function NewProfessionalAlert({ professionals }: NewProfessionalAlertProps) {
  const [previousCount, setPreviousCount] = useState(0);
  const [newProfessionals, setNewProfessionals] = useState<ProfessionalProfile[]>([]);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (previousCount === 0) {
      // Première initialisation, ne pas afficher d'alerte
      setPreviousCount(professionals.length);
      return;
    }

    if (professionals.length > previousCount) {
      // De nouveaux professionnels ont été ajoutés
      const newOnes = professionals.slice(-1); // Prendre le dernier ajouté
      setNewProfessionals(newOnes);
      setShowAlert(true);
      
      // Auto-hide après 10 secondes
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 10000);

      setPreviousCount(professionals.length);

      return () => clearTimeout(timer);
    } else if (professionals.length !== previousCount) {
      // Mise à jour du compteur si la liste change d'une autre façon
      setPreviousCount(professionals.length);
    }
  }, [professionals, previousCount]);

  if (!showAlert || newProfessionals.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 w-80">
      <Alert className="border-green-200 bg-green-50 shadow-lg">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Users className="h-5 w-5 text-green-600" />
            </div>
            <div className="flex-1">
              <AlertDescription className="text-green-800">
                <div className="space-y-2">
                  <p className="font-semibold">Nouveau professionnel !</p>
                  {newProfessionals.map((professional) => (
                    <div key={professional.uid} className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                          {professional.companyName?.[0] || "P"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {professional.companyName}
                        </p>
                        <div className="flex items-center gap-1 text-xs">
                          <Badge variant="outline" className="text-xs">
                            {professional.profession}
                          </Badge>
                          {professional.isVerified && (
                            <Badge variant="secondary" className="text-xs">
                              <Star className="h-2 w-2 mr-1" />
                              Vérifié
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  <p className="text-xs text-green-700 mt-1">
                    vient de rejoindre la plateforme
                  </p>
                </div>
              </AlertDescription>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAlert(false)}
            className="h-6 w-6 p-0 text-green-600 hover:text-green-700 hover:bg-green-100"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </Alert>
    </div>
  );
}
