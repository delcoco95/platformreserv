import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface FormDataType {
  companyName: string;
  profession: string;
  siret: string;
  phone: string;
  address: string;
}

interface ProfessionalFieldsProps {
  formData: FormDataType;
  onChange: (field: string, value: string) => void;
  disabled: boolean;
}

export const ProfessionalFields = ({
  formData,
  onChange,
  disabled,
}: ProfessionalFieldsProps) => {
  const professions = [
    { value: "automobile", label: "Automobile" },
    { value: "plomberie", label: "Plomberie" },
    { value: "serrurerie", label: "Serrurerie" },
  ];

  return (
    <div className="space-y-4 p-4 bg-green-50 rounded-lg border border-green-200">
      <h3 className="font-semibold text-green-900">
        Informations professionnelles
      </h3>

      <div className="space-y-2">
        <Label htmlFor="companyName">
          Nom de l'entreprise <span className="text-red-500">*</span>
        </Label>
        <Input
          id="companyName"
          value={formData.companyName}
          onChange={(e) => onChange("companyName", e.target.value)}
          placeholder="Nom de votre entreprise"
          disabled={disabled}
          className="bg-white"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="profession">
          Profession <span className="text-red-500">*</span>
        </Label>
        <Select
          value={formData.profession}
          onValueChange={(value) => onChange("profession", value)}
          disabled={disabled}
        >
          <SelectTrigger className="bg-white">
            <SelectValue placeholder="Sélectionnez votre profession" />
          </SelectTrigger>
          <SelectContent>
            {professions.map((prof) => (
              <SelectItem key={prof.value} value={prof.value}>
                {prof.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="siret">Numéro SIRET</Label>
        <Input
          id="siret"
          value={formData.siret}
          onChange={(e) => onChange("siret", e.target.value)}
          placeholder="Numéro SIRET de votre entreprise"
          disabled={disabled}
          className="bg-white"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="pro-phone">Téléphone</Label>
        <Input
          id="pro-phone"
          value={formData.phone}
          onChange={(e) => onChange("phone", e.target.value)}
          placeholder="Numéro de téléphone professionnel"
          disabled={disabled}
          className="bg-white"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="pro-address">Adresse</Label>
        <Input
          id="pro-address"
          value={formData.address}
          onChange={(e) => onChange("address", e.target.value)}
          placeholder="Adresse de votre entreprise"
          disabled={disabled}
          className="bg-white"
        />
      </div>
    </div>
  );
};
