import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface ClientFormProps {
  formData: {
    firstName: string;
    lastName: string;
  };
  onInputChange: (field: string, value: string) => void;
  isLoading: boolean;
}

export const ClientForm = ({ formData, onInputChange, isLoading }: ClientFormProps) => {
  return (
    <div className="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
      <h3 className="font-semibold text-blue-900">
        Informations personnelles
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">Prénom *</Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => onInputChange("firstName", e.target.value)}
            placeholder="Votre prénom"
            disabled={isLoading}
          />
        </div>
        <div>
          <Label htmlFor="lastName">Nom *</Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => onInputChange("lastName", e.target.value)}
            placeholder="Votre nom"
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  );
};
