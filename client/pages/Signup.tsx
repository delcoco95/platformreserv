import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { useAuth } from "../contexts/AuthContext";
import { useSignupValidation } from "../hooks/useSignupValidation";
import { useSignupRedirection } from "../hooks/useSignupRedirection";
import { SignupHeader, SignupFooter, SignupForm } from "../components/signup";

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

export default function Signup() {
  const { register, currentUser, userProfile } = useAuth();
  const { error, setError, validateForm, prepareAdditionalData } =
    useSignupValidation();

  const [accountType, setAccountType] = useState<AccountType>("");
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    companyName: "",
    profession: "",
    siret: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  // Redirection automatique si déjà connecté
  useSignupRedirection(currentUser, userProfile);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation avec le hook
    if (!validateForm(accountType, formData)) {
      return;
    }

    setIsLoading(true);

    try {
      const additionalData = prepareAdditionalData(accountType, formData);

      await register(
        formData.email,
        formData.password,
        accountType,
        additionalData,
      );
    } catch (error: any) {
      console.error("Erreur d'inscription:", error);
      if (error.message) {
        setError(error.message);
      } else {
        setError("Erreur d'inscription. Veuillez réessayer");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-2xl w-full space-y-8">
        <SignupHeader />

        <Card>
          <CardHeader>
            <CardTitle>Inscription</CardTitle>
            <CardDescription>
              Choisissez votre type de compte et remplissez vos informations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignupForm
              accountType={accountType}
              formData={formData}
              error={error}
              isLoading={isLoading}
              onAccountTypeChange={setAccountType}
              onInputChange={handleInputChange}
              onSubmit={handleSubmit}
            />

            <SignupFooter />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
