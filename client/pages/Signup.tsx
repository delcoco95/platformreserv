import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Alert, AlertDescription } from "../components/ui/alert";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import {
  User,
  Building,
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  UserCheck,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

type AccountType = "client" | "professionnel" | "";

export default function Signup() {
  const navigate = useNavigate();
  const { register, currentUser, userProfile } = useAuth();

  const [accountType, setAccountType] = useState<AccountType>("");
  const [formData, setFormData] = useState({
    // Client fields
    firstName: "",
    lastName: "",
    // Professional fields
    companyName: "",
    profession: "",
    siret: "",
    // Common fields
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
    } catch (error: any) {
      console.error("Erreur d'inscription:", error);

      // Messages d'erreur API
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
              {/* Sélection du type de compte */}
              <div>
                <Label className="text-base font-semibold">
                  Type de compte *
                </Label>
                <RadioGroup
                  value={accountType}
                  onValueChange={(value) =>
                    setAccountType(value as AccountType)
                  }
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

              {/* Champs spécifiques au client */}
              {accountType === "client" && (
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
                        onChange={(e) =>
                          handleInputChange("firstName", e.target.value)
                        }
                        placeholder="Votre prénom"
                        disabled={isLoading}
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Nom *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) =>
                          handleInputChange("lastName", e.target.value)
                        }
                        placeholder="Votre nom"
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Champs spécifiques au professionnel */}
              {accountType === "professionnel" && (
                <div className="space-y-4 p-4 bg-green-50 rounded-lg border border-green-200">
                  <h3 className="font-semibold text-green-900">
                    Informations professionnelles
                  </h3>
                  <div>
                    <Label htmlFor="companyName">Nom de l'entreprise *</Label>
                    <Input
                      id="companyName"
                      value={formData.companyName}
                      onChange={(e) =>
                        handleInputChange("companyName", e.target.value)
                      }
                      placeholder="Nom de votre entreprise"
                      disabled={isLoading}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="profession">Profession *</Label>
                      <Select
                        value={formData.profession}
                        onValueChange={(value) =>
                          handleInputChange("profession", value)
                        }
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
                        onChange={(e) =>
                          handleInputChange("siret", e.target.value)
                        }
                        placeholder="Numéro SIRET"
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Champs communs */}
              {accountType && (
                <div className="space-y-4">
                  <h3 className="font-semibold">Informations de contact</h3>

                  <div>
                    <Label htmlFor="email">Adresse email *</Label>
                    <div className="relative mt-1">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className="pl-10"
                        placeholder="votre@email.com"
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="password">Mot de passe *</Label>
                      <div className="relative mt-1">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={(e) =>
                            handleInputChange("password", e.target.value)
                          }
                          className="pl-10 pr-10"
                          placeholder="••••••••"
                          disabled={isLoading}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="confirmPassword">
                        Confirmer le mot de passe *
                      </Label>
                      <div className="relative mt-1">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          value={formData.confirmPassword}
                          onChange={(e) =>
                            handleInputChange("confirmPassword", e.target.value)
                          }
                          className="pl-10 pr-10"
                          placeholder="••••••••"
                          disabled={isLoading}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Téléphone (optionnel)</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        placeholder="06 12 34 56 78"
                        disabled={isLoading}
                      />
                    </div>
                    <div>
                      <Label htmlFor="address">Adresse (optionnel)</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) =>
                          handleInputChange("address", e.target.value)
                        }
                        placeholder="Votre adresse"
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                </div>
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

        {/* Lien de retour */}
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
