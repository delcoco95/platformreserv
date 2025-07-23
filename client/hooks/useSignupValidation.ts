import { useState } from "react";

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

type AccountType = "client" | "professionnel" | "";

export const useSignupValidation = () => {
  const [error, setError] = useState("");

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (password: string) => password.length >= 6;

  const validateForm = (
    accountType: AccountType,
    formData: FormData
  ): boolean => {
    setError("");

    // Validation du type de compte
    if (!accountType) {
      setError("Veuillez sélectionner un type de compte");
      return false;
    }

    // Validation des champs obligatoires communs
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      setError("Veuillez remplir tous les champs obligatoires");
      return false;
    }

    // Validation de l'email
    if (!validateEmail(formData.email)) {
      setError("Veuillez entrer une adresse email valide");
      return false;
    }

    // Validation du mot de passe
    if (!validatePassword(formData.password)) {
      setError("Le mot de passe doit contenir au moins 6 caractères");
      return false;
    }

    // Validation de la confirmation du mot de passe
    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return false;
    }

    // Validation spécifique au type de compte
    if (accountType === "client") {
      if (!formData.firstName || !formData.lastName) {
        setError("Veuillez remplir votre nom et prénom");
        return false;
      }
    } else if (accountType === "professionnel") {
      if (!formData.companyName || !formData.profession) {
        setError("Veuillez remplir le nom de l'entreprise et la profession");
        return false;
      }
    }

    return true;
  };

  const prepareAdditionalData = (
    accountType: AccountType,
    formData: FormData
  ) => {
    return accountType === "client"
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
  };

  return {
    error,
    setError,
    validateForm,
    prepareAdditionalData,
  };
};
