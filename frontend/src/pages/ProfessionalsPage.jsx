import { useState } from "react";

function ProfessionalsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("tous");

  const categories = [
    { value: "tous", label: "Tous" },
    { value: "automobile", label: "Automobile" },
    { value: "plomberie", label: "Plomberie" },
    { value: "serrurerie", label: "Serrurerie" },
  ];

  // Données d'exemple (à remplacer par des données réelles)
  const professionals = [
    {
      id: 1,
      name: "Jean Dupont",
      profession: "automobile",
      rating: 4.8,
      services: ["Révision", "Réparation", "Diagnostic"],
      location: "Paris 15e",
    },
    {
      id: 2,
      name: "Marie Martin",
      profession: "plomberie",
      rating: 4.9,
      services: ["Dépannage", "Installation", "Maintenance"],
      location: "Paris 12e",
    },
  ];

  const filteredProfessionals = professionals.filter(prof => {
    const matchesSearch = prof.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "tous" || prof.profession === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Trouvez votre professionnel</h1>
        
        {/* Filtres de recherche */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Rechercher un professionnel..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input flex-1"
          />
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="input md:w-48"
          >
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Liste des professionnels */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProfessionals.length > 0 ? (
          filteredProfessionals.map(prof => (
            <div key={prof.id} className="card p-6">
              <div className="flex items-center mb-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">
                    {prof.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="ml-3">
                  <h3 className="font-semibold">{prof.name}</h3>
                  <p className="text-sm text-gray-600 capitalize">{prof.profession}</p>
                </div>
              </div>
              
              <div className="mb-3">
                <div className="flex items-center mb-1">
                  <span className="text-yellow-500">★</span>
                  <span className="ml-1 text-sm">{prof.rating}</span>
                </div>
                <p className="text-sm text-gray-600">{prof.location}</p>
              </div>
              
              <div className="mb-4">
                <p className="text-sm font-medium mb-1">Services:</p>
                <div className="flex flex-wrap gap-1">
                  {prof.services.map(service => (
                    <span
                      key={service}
                      className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
              
              <button className="btn btn-primary w-full">
                Prendre RDV
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-600">Aucun professionnel trouvé</p>
          </div>
        )}
      </div>

      {/* Message si pas de résultats */}
      {filteredProfessionals.length === 0 && (searchTerm || selectedCategory !== "tous") && (
        <div className="text-center py-8">
          <p className="text-gray-600">
            Aucun professionnel ne correspond à vos critères de recherche.
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("tous");
            }}
            className="btn btn-secondary mt-4"
          >
            Réinitialiser les filtres
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfessionalsPage;
