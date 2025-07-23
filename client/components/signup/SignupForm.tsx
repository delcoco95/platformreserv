import { Button } from "../ui/button";
import { Alert, AlertDescription } from "../ui/alert";
import { AlertCircle } from "lucide-react";
import {
  SignupAccountTypeSelector,
  ClientFields,
  ProfessionalFields,
  CommonFields,
} from "./";

type AccountType = "client" | "professionnel" | "";

interface FormData {
  firstName: string;
  lastName: string;
  companyName: string;
  profession: string;
  siret: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  address: string;
}

interface SignupFormProps {
  accountType: AccountType;
  formData: FormData;
  error: string;
  isLoading: boolean;
  onAccountTypeChange: (value: "client" | "professionnel") => void;
  onInputChange: (field: string, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const SignupForm = ({
  accountType,
  formData,
  error,
  isLoading,
  onAccountTypeChange,
  onInputChange,
  onSubmit,
}: SignupFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <SignupAccountTypeSelector
        accountType={accountType}
        onChange={onAccountTypeChange}
      />

      {accountType === "client" && (
        <ClientFields
          formData={formData}
          onChange={onInputChange}
          disabled={isLoading}
        />
      )}

      {accountType === "professionnel" && (
        <ProfessionalFields
          formData={formData}
          onChange={onInputChange}
          disabled={isLoading}
        />
      )}

      {accountType && (
        <CommonFields
          formData={formData}
          onChange={onInputChange}
          disabled={isLoading}
        />
      )}

      {accountType && (
        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
          size="lg"
        >
          {isLoading ? "Création du compte..." : "Créer mon compte"}
        </Button>
      )}
    </form>
  );
};
