import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface FormDataType {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
}

interface ClientFieldsProps {
  formData: FormDataType;
  onChange: (field: string, value: string) => void;
  disabled: boolean;
}

export const ClientFields = ({
  formData,
  onChange,
  disabled,
}: ClientFieldsProps) => {
  return (
    <div className="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
      <h3 className="font-semibold text-blue-900">Informations personnelles</h3>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">
            Prénom <span className="text-red-500">*</span>
          </Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => onChange("firstName", e.target.value)}
            placeholder="Votre prénom"
            disabled={disabled}
            className="bg-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">
            Nom <span className="text-red-500">*</span>
          </Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => onChange("lastName", e.target.value)}
            placeholder="Votre nom"
            disabled={disabled}
            className="bg-white"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="client-phone">Téléphone</Label>
        <Input
          id="client-phone"
          value={formData.phone}
          onChange={(e) => onChange("phone", e.target.value)}
          placeholder="Votre numéro de téléphone"
          disabled={disabled}
          className="bg-white"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="client-address">Adresse</Label>
        <Input
          id="client-address"
          value={formData.address}
          onChange={(e) => onChange("address", e.target.value)}
          placeholder="Votre adresse"
          disabled={disabled}
          className="bg-white"
        />
      </div>
    </div>
  );
};
