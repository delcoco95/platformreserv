import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { User, Building } from "lucide-react";

type AccountType = "client" | "professionnel" | "";

interface AccountTypeSelectorProps {
  value: AccountType;
  onChange: (value: AccountType) => void;
}

export const AccountTypeSelector = ({ value, onChange }: AccountTypeSelectorProps) => {
  return (
    <div>
      <Label className="text-base font-semibold">Type de compte *</Label>
      <RadioGroup
        value={value}
        onValueChange={(value) => onChange(value as AccountType)}
        className="mt-3"
      >
        <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
          <RadioGroupItem value="client" id="client" />
          <Label
            htmlFor="client"
            className="flex items-center space-x-3 cursor-pointer flex-1"
          >
            <User className="h-5 w-5 text-blue-600" />
            <div>
              <div className="font-medium">Client</div>
              <div className="text-sm text-gray-600">
                Je recherche des services
              </div>
            </div>
          </Label>
        </div>
        <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
          <RadioGroupItem value="professionnel" id="professionnel" />
          <Label
            htmlFor="professionnel"
            className="flex items-center space-x-3 cursor-pointer flex-1"
          >
            <Building className="h-5 w-5 text-green-600" />
            <div>
              <div className="font-medium">Professionnel</div>
              <div className="text-sm text-gray-600">
                Je propose mes services
              </div>
            </div>
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};
