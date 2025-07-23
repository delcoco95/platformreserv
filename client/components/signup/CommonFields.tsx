import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Eye, EyeOff } from "lucide-react";

interface FormDataType {
  email: string;
  password: string;
  confirmPassword: string;
}

interface CommonFieldsProps {
  formData: FormDataType;
  onChange: (field: string, value: string) => void;
  disabled: boolean;
  showPassword?: boolean;
  setShowPassword?: (show: boolean) => void;
  showConfirmPassword?: boolean;
  setShowConfirmPassword?: (show: boolean) => void;
}

export const CommonFields = ({
  formData,
  onChange,
  disabled,
  showPassword: externalShowPassword,
  setShowPassword: externalSetShowPassword,
  showConfirmPassword: externalShowConfirmPassword,
  setShowConfirmPassword: externalSetShowConfirmPassword,
}: CommonFieldsProps) => {
  // États internes si les props ne sont pas fournies
  const [internalShowPassword, setInternalShowPassword] = useState(false);
  const [internalShowConfirmPassword, setInternalShowConfirmPassword] = useState(false);

  // Utiliser les props externes ou les états internes
  const showPassword = externalShowPassword !== undefined ? externalShowPassword : internalShowPassword;
  const setShowPassword = externalSetShowPassword || setInternalShowPassword;
  const showConfirmPassword = externalShowConfirmPassword !== undefined ? externalShowConfirmPassword : internalShowConfirmPassword;
  const setShowConfirmPassword = externalSetShowConfirmPassword || setInternalShowConfirmPassword;

  return (
    <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <h3 className="font-semibold text-gray-900">Informations de connexion</h3>
      
      <div className="space-y-2">
        <Label htmlFor="email">
          Adresse email <span className="text-red-500">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => onChange("email", e.target.value)}
          placeholder="votre.email@exemple.com"
          disabled={disabled}
          className="bg-white"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">
          Mot de passe <span className="text-red-500">*</span>
        </Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={(e) => onChange("password", e.target.value)}
            placeholder="Minimum 6 caractères"
            disabled={disabled}
            className="bg-white pr-10"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
            disabled={disabled}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
            <span className="sr-only">
              {showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
            </span>
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">
          Confirmer le mot de passe <span className="text-red-500">*</span>
        </Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={(e) => onChange("confirmPassword", e.target.value)}
            placeholder="Confirmez votre mot de passe"
            disabled={disabled}
            className="bg-white pr-10"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            disabled={disabled}
          >
            {showConfirmPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
            <span className="sr-only">
              {showConfirmPassword ? "Masquer la confirmation" : "Afficher la confirmation"}
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};
