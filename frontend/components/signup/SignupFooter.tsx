import { Link } from "react-router-dom";

export const SignupFooter = () => {
  return (
    <>
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

      <div className="text-center">
        <Link
          to="/"
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          ← Retour à l'accueil
        </Link>
      </div>
    </>
  );
};
