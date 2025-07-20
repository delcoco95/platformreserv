import { Alert, AlertDescription } from "./ui/alert";
import { Info } from "lucide-react";

export function DemoModeAlert() {
  return (
    <Alert className="mb-6 border-blue-200 bg-blue-50">
      <Info className="h-4 w-4 text-blue-600" />
      <AlertDescription className="text-blue-800">
        <strong>Mode démo :</strong> Vous naviguez actuellement avec des données
        d'exemple. Connectez-vous pour accéder à vos vraies données.
      </AlertDescription>
    </Alert>
  );
}
