import { Link } from "react-router-dom";
import { UserCheck } from "lucide-react";

export const SignupHeader = () => {
  return (
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
  );
};
