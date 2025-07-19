import { useState } from "react";
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

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

type AccountType = "client" | "professionnel" | "";

export default function Signup() {
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState<AccountType>("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    profession: "",
    siret: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateSiret = (siret: string) => /^\d{14}$/.test(siret);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!accountType) return setError("Veuillez sélectionner un type de compte");
    if (!formData.email || !formData.password || !formData.confirmPassword) return setError("Veuillez remplir tous les champs");
    if (!validateEmail(formData.email)) return setError("Adresse email invalide");
    if (formData.password.length < 6) return setError("Mot de passe trop court");
    if (formData.password !== formData.confirmPassword) return setError("Les mots de passe ne correspondent pas");

    if (accountType === "client") {
      if (!formData.firstName || !formData.lastName) return setError("Prénom et nom requis");
    } else if (accountType === "professionnel") {
      if (!formData.companyName || !formData.profession || !formData.siret) return setError("Champs pro requis");
      if (!validateSiret(formData.siret)) return setError("SIRET invalide");
    }

    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      const userData = {
        role: accountType,
        email: formData.email,
        ...(accountType === "client"
          ? {
              firstName: formData.firstName,
              lastName: formData.lastName,
            }
          : {
              companyName: formData.companyName,
              profession: formData.profession,
              siret: formData.siret,
            }),
      };

      await setDoc(doc(db, "users", user.uid), userData);
      navigate(accountType === "client" ? "/espace-client" : "/professionnels");
    } catch (err: any) {
      console.error(err);
      setError(err.code === "auth/email-already-in-use" ? "Cet email est déjà utilisé." : "Erreur : " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-muted/20">
      <div className="max-w-lg w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground">Inscription</h1>
          <p className="mt-2 text-muted-foreground">
            Créez votre compte RendezVousPro
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">
              Créer un compte
            </CardTitle>
            <CardDescription className="text-center">
              Choisissez votre type de compte et complétez vos informations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Étape 1: Choix du type de compte */}
              <div className="space-y-3">
                <Label className="text-base font-medium">
                  Type de compte *
                </Label>
                <RadioGroup
                  value={accountType}
                  onValueChange={(value) =>
                    setAccountType(value as AccountType)
                  }
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
                        <div className="font-medium">Client</div>
                        <div className="text-xs text-muted-foreground">
                          Je recherche des services
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
                      <Building className="mb-3 h-6 w-6" />
                      <div className="text-center">
                        <div className="font-medium">Professionnel</div>
                        <div className="text-xs text-muted-foreground">
                          Je propose mes services
                        </div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Étape 2: Champs selon le type de compte */}
              {accountType && (
                <div className="space-y-4 border-t pt-6">
                  {accountType === "client" && (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">Prénom *</Label>
                          <Input
                            id="firstName"
                            type="text"
                            placeholder="Jean"
                            value={formData.firstName}
                            onChange={(e) =>
                              handleInputChange("firstName", e.target.value)
                            }
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Nom *</Label>
                          <Input
                            id="lastName"
                            type="text"
                            placeholder="Dupont"
                            value={formData.lastName}
                            onChange={(e) =>
                              handleInputChange("lastName", e.target.value)
                            }
                            required
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {accountType === "professionnel" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="companyName">
                          Nom de l'entreprise *
                        </Label>
                        <Input
                          id="companyName"
                          type="text"
                          placeholder="Auto Service Plus"
                          value={formData.companyName}
                          onChange={(e) =>
                            handleInputChange("companyName", e.target.value)
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="profession">Métier *</Label>
                        <Select
                          value={formData.profession}
                          onValueChange={(value) =>
                            handleInputChange("profession", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Choisir votre métier" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="automobile">
                              Entretien & Réparation Automobile
                            </SelectItem>
                            <SelectItem value="plomberie">Plomberie</SelectItem>
                            <SelectItem value="serrurerie">
                              Serrurerie
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="siret">SIRET *</Label>
                        <Input
                          id="siret"
                          type="text"
                          placeholder="12345678901234"
                          value={formData.siret}
                          onChange={(e) =>
                            handleInputChange("siret", e.target.value)
                          }
                          maxLength={14}
                          required
                        />
                        <p className="text-xs text-muted-foreground">
                          14 chiffres de votre numéro SIRET
                        </p>
                      </div>
                    </>
                  )}

                  {/* Champs communs */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Adresse email *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="votre@email.com"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Mot de passe *</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) =>
                          handleInputChange("password", e.target.value)
                        }
                        className="pl-10 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">
                      Confirmer le mot de passe *
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={(e) =>
                          handleInputChange("confirmPassword", e.target.value)
                        }
                        className="pl-10 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <UserCheck className="mr-2 h-4 w-4 animate-spin" />
                        Création du compte...
                      </>
                    ) : (
                      "Créer mon compte"
                    )}
                  </Button>
                </div>
              )}
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Vous avez déjà un compte ?{" "}
                <Link
                  to="/connexion"
                  className="font-medium text-primary hover:underline"
                >
                  Connectez-vous
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Demo info */}
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            Demo : remplissez le formulaire avec des données valides
            <br />
            SIRET de test : 12345678901234
          </p>
        </div>
      </div>
    </div>
  );
}
