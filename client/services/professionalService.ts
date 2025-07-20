import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { ProfessionalProfile } from "../types";

// Données démo pour le cas où Firebase n'est pas disponible
const demoProfessionals: ProfessionalProfile[] = [
  {
    uid: "demo-1",
    email: "garage.martin@example.com",
    userType: "professionnel",
    companyName: "Garage Martin",
    profession: "automobile",
    phone: "01 23 45 67 89",
    address: "123 Rue de la République, 75001 Paris",
    description: "Garage spécialisé dans la réparation automobile depuis 1985",
    services: ["Révision", "Vidange", "Freinage", "Pneus"],
    rating: 4.5,
    totalReviews: 42,
    isVerified: true,
    createdAt: new Date() as any,
    updatedAt: new Date() as any,
  },
  {
    uid: "demo-2",
    email: "plomberie.dupont@example.com",
    userType: "professionnel",
    companyName: "Plomberie Dupont",
    profession: "plomberie",
    phone: "01 98 76 54 32",
    address: "456 Avenue des Champs, 75008 Paris",
    description:
      "Intervention rapide 24h/24 pour tous vos problèmes de plomberie",
    services: ["Fuite", "Débouchage", "Installation", "Réparation"],
    rating: 4.8,
    totalReviews: 67,
    isVerified: true,
    createdAt: new Date() as any,
    updatedAt: new Date() as any,
  },
  {
    uid: "demo-3",
    email: "serrurerie.bernard@example.com",
    userType: "professionnel",
    companyName: "Serrurerie Bernard",
    profession: "serrurerie",
    phone: "01 11 22 33 44",
    address: "789 Boulevard Saint-Germain, 75006 Paris",
    description: "Serrurier agréé assurance, intervention 24h/24",
    services: [
      "Ouverture de porte",
      "Changement serrure",
      "Blindage",
      "Dépannage",
    ],
    rating: 4.3,
    totalReviews: 28,
    isVerified: true,
    createdAt: new Date() as any,
    updatedAt: new Date() as any,
  },
];

export const professionalService = {
  // Récupérer tous les professionnels
  async getAllProfessionals(): Promise<ProfessionalProfile[]> {
    try {
      // Vérifier si l'utilisateur est connecté
      if (!auth.currentUser) {
        console.warn("Utilisateur non connecté, utilisation des données démo");
        return demoProfessionals;
      }

      const q = query(
        collection(db, "users"),
        where("userType", "==", "professionnel"),
        orderBy("companyName", "asc"),
      );
      const snapshot = await getDocs(q);
      const professionals = snapshot.docs.map(
        (doc) => doc.data() as ProfessionalProfile,
      );

      // Si aucun professionnel trouvé, retourner les données démo
      return professionals.length > 0 ? professionals : demoProfessionals;
    } catch (error) {
      console.warn("Erreur Firebase, utilisation des données démo:", error);
      return demoProfessionals;
    }
  },

  // Récupérer les professionnels par catégorie
  async getProfessionalsByCategory(
    profession: string,
  ): Promise<ProfessionalProfile[]> {
    try {
      if (!auth.currentUser) {
        return demoProfessionals.filter(
          (prof) => prof.profession === profession,
        );
      }

      const q = query(
        collection(db, "users"),
        where("userType", "==", "professionnel"),
        where("profession", "==", profession),
        orderBy("companyName", "asc"),
      );
      const snapshot = await getDocs(q);
      const professionals = snapshot.docs.map(
        (doc) => doc.data() as ProfessionalProfile,
      );

      return professionals.length > 0
        ? professionals
        : demoProfessionals.filter((prof) => prof.profession === profession);
    } catch (error) {
      console.warn("Erreur Firebase, utilisation des données démo:", error);
      return demoProfessionals.filter((prof) => prof.profession === profession);
    }
  },

  // Rechercher des professionnels par nom ou service
  async searchProfessionals(
    searchTerm: string,
  ): Promise<ProfessionalProfile[]> {
    // Note: Firestore ne supporte pas les recherches textuelles natives
    // Pour une recherche plus avancée, il faudrait utiliser Algolia ou similar
    const professionals = await this.getAllProfessionals();

    return professionals.filter(
      (prof) =>
        prof.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prof.profession?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prof.services?.some((service) =>
          service.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
    );
  },

  // Écouter les changements de professionnels en temps réel
  onProfessionalsChange(
    callback: (professionals: ProfessionalProfile[]) => void,
  ) {
    try {
      if (!auth.currentUser) {
        // Si pas d'utilisateur connecté, retourner les données démo
        setTimeout(() => callback(demoProfessionals), 100);
        return () => {}; // unsubscribe function
      }

      const q = query(
        collection(db, "users"),
        where("userType", "==", "professionnel"),
        orderBy("companyName", "asc"),
      );

      return onSnapshot(
        q,
        (snapshot) => {
          const professionals = snapshot.docs.map(
            (doc) => doc.data() as ProfessionalProfile,
          );
          callback(
            professionals.length > 0 ? professionals : demoProfessionals,
          );
        },
        (error) => {
          console.warn(
            "Erreur dans l'écoute Firebase, utilisation des données démo:",
            error,
          );
          callback(demoProfessionals);
        },
      );
    } catch (error) {
      console.warn("Erreur Firebase, utilisation des données démo:", error);
      setTimeout(() => callback(demoProfessionals), 100);
      return () => {};
    }
  },

  // Écouter les professionnels par catégorie en temps réel
  onProfessionalsByCategoryChange(
    profession: string,
    callback: (professionals: ProfessionalProfile[]) => void,
  ) {
    try {
      if (!auth.currentUser) {
        const filtered = demoProfessionals.filter(
          (prof) => prof.profession === profession,
        );
        setTimeout(() => callback(filtered), 100);
        return () => {};
      }

      const q = query(
        collection(db, "users"),
        where("userType", "==", "professionnel"),
        where("profession", "==", profession),
        orderBy("companyName", "asc"),
      );

      return onSnapshot(
        q,
        (snapshot) => {
          const professionals = snapshot.docs.map(
            (doc) => doc.data() as ProfessionalProfile,
          );
          const filtered = demoProfessionals.filter(
            (prof) => prof.profession === profession,
          );
          callback(professionals.length > 0 ? professionals : filtered);
        },
        (error) => {
          console.warn(
            "Erreur dans l'écoute Firebase, utilisation des données démo:",
            error,
          );
          const filtered = demoProfessionals.filter(
            (prof) => prof.profession === profession,
          );
          callback(filtered);
        },
      );
    } catch (error) {
      console.warn("Erreur Firebase, utilisation des données démo:", error);
      const filtered = demoProfessionals.filter(
        (prof) => prof.profession === profession,
      );
      setTimeout(() => callback(filtered), 100);
      return () => {};
    }
  },
};
