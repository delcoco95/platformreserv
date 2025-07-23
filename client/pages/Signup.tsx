import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Alert, AlertDescription } from "../components/ui/alert";
import { AlertCircle, UserCheck } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useSignupValidation } from "../hooks/useSignupValidation";
import {
  SignupAccountTypeSelector,
  ClientFields,
  ProfessionalFields,
  CommonFields,
} from "../components/signup";

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
  const navigate = useNavigate();
  const { register, currentUser, userProfile } = useAuth();
  const { error, setError, validateForm, prepareAdditionalData } = useSignupValidation();

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
  useEffect(() => {
    if (currentUser && userProfile) {
      const redirectPath =
        userProfile.userType === "client"
          ? "/espace-client"
          : "/espace-professionnel";
      navigate(redirectPath, { replace: true });
    }
  }, [currentUser, userProfile, navigate]);

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
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
              <UserCheck className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Créer un compte</h2>
          <p className="mt-2 text-sm text-gray-600">
            Rejoignez notre plateforme en quelques minutes
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Inscription</CardTitle>
            <CardDescription>
              Choisissez votre type de compte et remplissez vos informations
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <SignupAccountTypeSelector
                accountType={accountType}
                onChange={setAccountType}
              />

              {accountType === "client" && (
                <ClientFields
                  formData={formData}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
              )}

              {accountType === "professionnel" && (
                <ProfessionalFields
                  formData={formData}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
              )}

              {accountType && (
                <CommonFields
                  formData={formData}
                  onChange={handleInputChange}
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

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Déjà un compte ?{" "}
                <Link
                  to="/connexion"
                  className="font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  Se connecter
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Link
            to="/"
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
