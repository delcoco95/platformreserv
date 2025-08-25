// frontend/src/services/api.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: false,
  headers: { "Content-Type": "application/json" },
});

// Helper générique (centralise les erreurs)
export async function apiCall(method, url, data) {
  try {
    const res = await api.request({ method, url, data });
    return res.data;
  } catch (err) {
    // Normalize error
    const msg =
      err?.response?.data?.message ||
      err?.message ||
      "Erreur réseau, veuillez réessayer.";
    console.error("Erreur API:", err?.response?.data || err);
    throw new Error(msg);
  }
}

/**
 * Construit le payload d'inscription au format attendu par le backend.
 * On accepte des clés "fr" du formulaire et on les mappe proprement.
 */
export function buildRegisterPayload(form) {
  // Tolère plusieurs noms de champs remontés par le formulaire
  const userType = form.userType || form.type || form.role || "client";

  const firstName =
    form.firstName || form.prenom || form.givenName || form.firstname;
  const lastName = form.lastName || form.nom || form.familyName || form.lastname;
  const email = form.email;
  const password = form.password || form.motdepasse || form.pass;
  const phone = form.phone || form.telephone || form.tel;

  // Adresse "personnelle" (client/pro)
  const address = {
    street:
      form.addressStreet ||
      form.rue ||
      form.adresse ||
      form.adresseRue ||
      form.street,
    city: form.addressCity || form.ville || form.city,
    zipCode: form.addressZipCode || form.codePostal || form.cp || form.zipCode,
    country: form.addressCountry || form.pays || form.country || "France",
  };

  // Champs pro uniquement si professionnel
  let businessInfo = undefined;
  let businessAddress = undefined;
  let profession = undefined;

  if (userType === "professionnel") {
    const companyName =
      form.companyName || form.raisonSociale || form.nomEntreprise;
    const siret = form.siret;

    businessInfo = { companyName, siret };

    businessAddress = {
      street:
        form.businessStreet ||
        form.ruePro ||
        form.adressePro ||
        form.businessAddressStreet,
      city: form.businessCity || form.villePro || form.businessAddressCity,
      zipCode:
        form.businessZipCode ||
        form.cpPro ||
        form.codePostalPro ||
        form.businessAddressZipCode,
      country:
        form.businessCountry ||
        form.paysPro ||
        form.businessAddressCountry ||
        "France",
    };

    profession =
      form.profession ||
      form.metier ||
      form.categorie ||
      form.specialite ||
      "automobile";
  }

  return {
    userType,
    email,
    password,
    firstName,
    lastName,
    phone,
    address,
    businessInfo,
    businessAddress,
    profession,
  };
}

export async function register(formValues) {
  const payload = buildRegisterPayload(formValues);

  // Petit log pour déboguer localement si besoin
  // eslint-disable-next-line no-console
  console.log("➡️ Payload /register", payload);

  return await apiCall("post", "/api/auth/register", payload);
}

export async function login({ email, password }) {
  return await apiCall("post", "/api/auth/login", { email, password });
}
