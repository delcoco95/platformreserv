import api from "../lib/api";
import { ProfessionalProfile } from "../types";

class ProfessionalService {
  // Récupérer tous les professionnels
  async getAllProfessionals(): Promise<ProfessionalProfile[]> {
    try {
      return await api.get<ProfessionalProfile[]>("/professionals");
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des professionnels:",
        error,
      );
      throw error;
    }
  }

  // Récupérer un professionnel par ID
  async getProfessionalById(id: string): Promise<ProfessionalProfile | null> {
    try {
      return await api.get<ProfessionalProfile>(`/professionals/${id}`);
    } catch (error) {
      console.error("Erreur lors de la récupération du professionnel:", error);
      return null;
    }
  }

  // Créer un profil professionnel
  async createProfessional(data: Partial<ProfessionalProfile>): Promise<void> {
    try {
      await api.post("/professionals", data);
    } catch (error) {
      console.error("Erreur lors de la création du professionnel:", error);
      throw error;
    }
  }

  // Mettre à jour un profil professionnel
  async updateProfessional(
    id: string,
    data: Partial<ProfessionalProfile>,
  ): Promise<void> {
    try {
      await api.put(`/professionals/${id}`, data);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du professionnel:", error);
      throw error;
    }
  }

  // Supprimer un professionnel
  async deleteProfessional(id: string): Promise<void> {
    try {
      await api.delete(`/professionals/${id}`);
    } catch (error) {
      console.error("Erreur lors de la suppression du professionnel:", error);
      throw error;
    }
  }

  // Simuler un listener temps réel (à remplacer par WebSocket si nécessaire)
  onProfessionalsChange(
    callback: (professionals: ProfessionalProfile[]) => void,
  ): () => void {
    let intervalId: NodeJS.Timeout;

    const fetchData = async () => {
      try {
        const professionals = await this.getAllProfessionals();
        callback(professionals);
      } catch (error) {
        console.error(
          "Erreur lors de la mise à jour des professionnels:",
          error,
        );
      }
    };

    // Récupération initiale
    fetchData();

    // Polling toutes les 30 secondes (à adapter selon vos besoins)
    intervalId = setInterval(fetchData, 30000);

    // Fonction de nettoyage
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }

  // Rechercher des professionnels
  async searchProfessionals(params: {
    query?: string;
    profession?: string;
    location?: string;
  }): Promise<ProfessionalProfile[]> {
    try {
      const searchParams = new URLSearchParams();
      if (params.query) searchParams.set("q", params.query);
      if (params.profession) searchParams.set("profession", params.profession);
      if (params.location) searchParams.set("location", params.location);

      const endpoint = `/professionals/search?${searchParams.toString()}`;
      return await api.get<ProfessionalProfile[]>(endpoint);
    } catch (error) {
      console.error("Erreur lors de la recherche:", error);
      throw error;
    }
  }
}

export const professionalService = new ProfessionalService();
