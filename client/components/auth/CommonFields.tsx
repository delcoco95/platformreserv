import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

interface CommonFieldsProps {
  formData: {
    email: string;
    password: string;
    confirmPassword: string;
    phone: string;
    address: string;
  };
  onInputChange: (field: string, value: string) => void;
  isLoading: boolean;
}

export const CommonFields = ({ formData, onInputChange, isLoading }: CommonFieldsProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
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
            onChange={(e) => onInputChange("email", e.target.value)}
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
              onChange={(e) => onInputChange("password", e.target.value)}
              className="pl-10 pr-10"
              placeholder="••••••••"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div>
          <Label htmlFor="confirmPassword">Confirmer le mot de passe *</Label>
          <div className="relative mt-1">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={(e) => onInputChange("confirmPassword", e.target.value)}
              className="pl-10 pr-10"
              placeholder="••••••••"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
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
            onChange={(e) => onInputChange("phone", e.target.value)}
            placeholder="06 12 34 56 78"
            disabled={isLoading}
          />
        </div>
        <div>
          <Label htmlFor="address">Adresse (optionnel)</Label>
          <Input
            id="address"
            value={formData.address}
            onChange={(e) => onInputChange("address", e.target.value)}
            placeholder="Votre adresse"
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  );
};
