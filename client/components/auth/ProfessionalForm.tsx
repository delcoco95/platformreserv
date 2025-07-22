import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface ProfessionalFormProps {
  formData: {
    companyName: string;
    profession: string;
    siret: string;
  };
  onInputChange: (field: string, value: string) => void;
  isLoading: boolean;
}

export const ProfessionalForm = ({
  formData,
  onInputChange,
  isLoading,
}: ProfessionalFormProps) => {
  return (
    <div className="space-y-4 p-4 bg-green-50 rounded-lg border border-green-200">
      <h3 className="font-semibold text-green-900">
        Informations professionnelles
      </h3>
      <div>
        <Label htmlFor="companyName">Nom de l'entreprise *</Label>
        <Input
          id="companyName"
          value={formData.companyName}
          onChange={(e) => onInputChange("companyName", e.target.value)}
          placeholder="Nom de votre entreprise"
          disabled={isLoading}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="profession">Profession *</Label>
          <Select
            value={formData.profession}
            onValueChange={(value) => onInputChange("profession", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choisir..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="automobile">Automobile</SelectItem>
              <SelectItem value="plomberie">Plomberie</SelectItem>
              <SelectItem value="serrurerie">Serrurerie</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="siret">SIRET (optionnel)</Label>
          <Input
            id="siret"
            value={formData.siret}
            onChange={(e) => onInputChange("siret", e.target.value)}
            placeholder="Numéro SIRET"
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  );
};
