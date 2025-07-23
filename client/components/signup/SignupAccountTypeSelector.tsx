import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Card, CardContent } from "../ui/card";
import { User, Building2 } from "lucide-react";

interface SignupAccountTypeSelectorProps {
  accountType: string;
  onChange: (value: "client" | "professionnel") => void;
}

export const SignupAccountTypeSelector = ({
  accountType,
  onChange,
}: SignupAccountTypeSelectorProps) => {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium mb-4">Type de compte</h3>
        <RadioGroup
          value={accountType}
          onValueChange={onChange}
          className="grid grid-cols-2 gap-4"
        >
          <div>
            <RadioGroupItem
              value="client"
              id="client"
              className="peer sr-only"
            />
            <Label
              htmlFor="client"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
            >
              <User className="mb-3 h-6 w-6" />
              <div className="text-center">
                <div className="font-semibold">Client</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Je recherche un professionnel
                </div>
              </div>
            </Label>
          </div>
          
          <div>
            <RadioGroupItem
              value="professionnel"
              id="professionnel"
              className="peer sr-only"
            />
            <Label
              htmlFor="professionnel"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
            >
              <Building2 className="mb-3 h-6 w-6" />
              <div className="text-center">
                <div className="font-semibold">Professionnel</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Je propose mes services
                </div>
              </div>
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};
