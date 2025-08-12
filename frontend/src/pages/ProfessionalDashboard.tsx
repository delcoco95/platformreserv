import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import ImageUpload from "../components/professional/ImageUpload";
import { User, Camera, Settings, BarChart3 } from "lucide-react";

interface ProfessionalImage {
  url: string;
  originalName?: string;
}

export default function ProfessionalDashboard() {
  const { userProfile } = useAuth();
  const [images, setImages] = useState<ProfessionalImage[]>([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfessionalImages();
  }, []);

  const fetchProfessionalImages = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      // Décoder le token pour obtenir l'ID utilisateur
      const payload = JSON.parse(atob(token.split('.')[1]));
      const userId = payload.id;

      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/upload/professional/${userId}/images`);
      const data = await response.json();

      if (data.success) {
        setImages(data.images || []);
      }
    } catch (error) {
      console.error('Erreur récupération images:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImagesChange = (newImages: ProfessionalImage[]) => {
    setImages(newImages);
  };

  const tabs = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: BarChart3 },
    { id: 'profile', label: 'Mon profil', icon: User },
    { id: 'images', label: 'Mes photos', icon: Camera },
    { id: 'settings', label: 'Paramètres', icon: Settings },
  ];

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Espace Professionnel</h1>
        {userProfile && (
          <p className="text-gray-600">
            {userProfile.companyName || userProfile.firstName + ' ' + userProfile.lastName}
          </p>
        )}
      </div>

      {/* Navigation par onglets */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {/* Vue d'ensemble */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Vue d'ensemble</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-blue-900">Rendez-vous</h3>
                  <p className="text-2xl font-bold text-blue-600">0</p>
                  <p className="text-sm text-blue-700">Cette semaine</p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-green-900">Revenus</h3>
                  <p className="text-2xl font-bold text-green-600">0€</p>
                  <p className="text-sm text-green-700">Ce mois-ci</p>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-purple-900">Avis</h3>
                  <p className="text-2xl font-bold text-purple-600">0</p>
                  <p className="text-sm text-purple-700">Note moyenne</p>
                </div>
              </div>
            </div>
          )}

          {/* Mon profil */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Mon profil</h2>
              {userProfile && (
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Nom de la société</label>
                      <p className="mt-1 text-sm text-gray-900">{userProfile.companyName || "Non défini"}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Spécialité</label>
                      <p className="mt-1 text-sm text-gray-900">{userProfile.profession || "Non définie"}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <p className="mt-1 text-sm text-gray-900">{userProfile.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Téléphone</label>
                      <p className="mt-1 text-sm text-gray-900">{userProfile.phone || "Non défini"}</p>
                    </div>
                  </div>
                  {userProfile.description && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Description</label>
                      <p className="mt-1 text-sm text-gray-900">{userProfile.description}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Mes photos */}
          {activeTab === 'images' && (
            <div className="space-y-6">
              <ImageUpload
                images={images}
                onImagesChange={handleImagesChange}
                maxImages={5}
              />
            </div>
          )}

          {/* Paramètres */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Paramètres</h2>
              <p className="text-gray-600">Cette section est en cours de développement.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
