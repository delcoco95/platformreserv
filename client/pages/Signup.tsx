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
import {
  AccountTypeSelector,
  ClientForm,
  ProfessionalForm,
  CommonFields,
} from "../components/auth";

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
  const [error, setError] = useState("");
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

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (password: string) => password.length >= 6;

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!accountType) {
      setError("Veuillez sélectionner un type de compte");
      return;
    }

    if (!formData.email || !formData.password || !formData.confirmPassword) {
      setError("Veuillez remplir tous les champs obligatoires");
      return;
    }

    if (!validateEmail(formData.email)) {
      setError("Veuillez entrer une adresse email valide");
      return;
    }

    if (!validatePassword(formData.password)) {
      setError("Le mot de passe doit contenir au moins 6 caractères");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    // Validation spécifique au type de compte
    if (accountType === "client") {
      if (!formData.firstName || !formData.lastName) {
        setError("Veuillez remplir votre nom et prénom");
        return;
      }
    } else if (accountType === "professionnel") {
      if (!formData.companyName || !formData.profession) {
        setError("Veuillez remplir le nom de l'entreprise et la profession");
        return;
      }
    }

    setIsLoading(true);

    try {
<<<<<<< HEAD
      await register(formData.email, formData.password, accountType);
=======
      // Préparer les données additionnelles selon le type de compte
      const additionalData =
        accountType === "client"
          ? {
              firstName: formData.firstName,
              lastName: formData.lastName,
              phone: formData.phone,
              address: formData.address,
            }
          : {
              companyName: formData.companyName,
              profession: formData.profession,
              siret: formData.siret,
              phone: formData.phone,
              address: formData.address,
            };

await register(
  formData.email,
  formData.password,
  accountType,
  { ...(accountType === "client"
      ? { nom: formData.lastName, prenom: formData.firstName, telephone: formData.phone, adresse: formData.address,
        }
      : { nom: formData.companyName, metier: formData.profession, siret: formData.siret, telephone: formData.phone, adresse: formData.address,
        }),
  }
);
>>>>>>> e92b838680099adeeb2f2a262baad75269ed2085
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
              <AccountTypeSelector
                value={accountType}
                onChange={setAccountType}
              />

              {accountType === "client" && (
                <ClientForm
                  formData={formData}
                  onInputChange={handleInputChange}
                  isLoading={isLoading}
                />
              )}

              {accountType === "professionnel" && (
                <ProfessionalForm
                  formData={formData}
                  onInputChange={handleInputChange}
                  isLoading={isLoading}
                />
              )}

              {accountType && (
                <CommonFields
                  formData={formData}
                  onInputChange={handleInputChange}
                  isLoading={isLoading}
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
