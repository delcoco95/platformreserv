import { 
  collection, 
  getDocs, 
  query, 
  where, 
  orderBy,
  onSnapshot
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { ProfessionalProfile } from '../types';

export const professionalService = {
  // Récupérer tous les professionnels
  async getAllProfessionals(): Promise<ProfessionalProfile[]> {
    const q = query(
      collection(db, 'users'),
      where('userType', '==', 'professionnel'),
      orderBy('companyName', 'asc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data() as ProfessionalProfile);
  },

  // Récupérer les professionnels par catégorie
  async getProfessionalsByCategory(profession: string): Promise<ProfessionalProfile[]> {
    const q = query(
      collection(db, 'users'),
      where('userType', '==', 'professionnel'),
      where('profession', '==', profession),
      orderBy('companyName', 'asc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data() as ProfessionalProfile);
  },

  // Rechercher des professionnels par nom ou service
  async searchProfessionals(searchTerm: string): Promise<ProfessionalProfile[]> {
    // Note: Firestore ne supporte pas les recherches textuelles natives
    // Pour une recherche plus avancée, il faudrait utiliser Algolia ou similar
    const professionals = await this.getAllProfessionals();
    
    return professionals.filter(prof => 
      prof.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prof.profession?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prof.services?.some(service => 
        service.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  },

  // Écouter les changements de professionnels en temps réel
  onProfessionalsChange(callback: (professionals: ProfessionalProfile[]) => void) {
    const q = query(
      collection(db, 'users'),
      where('userType', '==', 'professionnel'),
      orderBy('companyName', 'asc')
    );
    
    return onSnapshot(q, (snapshot) => {
      const professionals = snapshot.docs.map(doc => doc.data() as ProfessionalProfile);
      callback(professionals);
    });
  },

  // Écouter les professionnels par catégorie en temps réel
  onProfessionalsByCategoryChange(profession: string, callback: (professionals: ProfessionalProfile[]) => void) {
    const q = query(
      collection(db, 'users'),
      where('userType', '==', 'professionnel'),
      where('profession', '==', profession),
      orderBy('companyName', 'asc')
    );
    
    return onSnapshot(q, (snapshot) => {
      const professionals = snapshot.docs.map(doc => doc.data() as ProfessionalProfile);
      callback(professionals);
    });
  }
};
