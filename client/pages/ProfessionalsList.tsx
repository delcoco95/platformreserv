// client/pages/ProfessionalsList.tsx

import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Search,
  Star,
  MapPin,
  Phone,
  Mail,
  Car,
  Wrench,
  Key,
  Users,
} from "lucide-react";
import { professionalService } from "../services/professionalService";
import { ProfessionalProfile } from "../types";

export default function ProfessionalsList() {
  const [searchParams] = useSearchParams();
  const [professionals, setProfessionals] = useState<ProfessionalProfile[]>([]);
  const [filteredProfessionals, setFilteredProfessionals] = useState<ProfessionalProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("categorie") || "all");

  const categories = [
    { value: "all", label: "Toutes les catégories", icon: Users },
    { value: "automobile", label: "Automobile", icon: Car },
    { value: "plomberie", label: "Plomberie", icon: Wrench },
    { value: "serrurerie", label: "Serrurerie", icon: Key },
  ];

  useEffect(() => {
    loadProfessionals();
  }, []);

  useEffect(() => {
    filterProfessionals();
  }, [professionals, searchQuery, selectedCategory]);

  const loadProfessionals = async () => {
    try {
      setLoading(true);
      const data = await professionalService.getAllProfessionals();
      setProfessionals(data);
    } catch (err) {
      console.error("Erreur lors du chargement :", err);
      setError("Impossible de charger les professionnels pour le moment.");
    } finally {
      setLoading(false);
    }
  };

  const filterProfessionals = () => {
    let filtered = [...professionals];

    if (selectedCategory !== "all") {
      filtered = filtered.filter((prof) => prof.profession === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((prof) =>
        prof.companyName?.toLowerCase().includes(query) ||
        prof.profession?.toLowerCase().includes(query) ||
        prof.address?.toLowerCase().includes(query) ||
        prof.services?.some((s) => s.toLowerCase().includes(query))
      );
    }

    setFilteredProfessionals(filtered);
  };

  const getCategoryIcon = (profession: string) => {
    switch (profession) {
      case "automobile":
        return Car;
      case "plomberie":
        return Wrench;
      case "serrurerie":
        return Key;
      default:
        return Users;
    }
  };

  const getProfessionLabel = (profession: string) => {
    switch (profession) {
      case "automobile":
        return "Automobile";
      case "plomberie":
        return "Plomberie";
      case "serrurerie":
        return "Serrurerie";
      default:
        return profession;
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto" />
          <p className="text-muted-foreground">Chargement des professionnels...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-2">
          <p className="text-red-500 font-medium">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Nos professionnels</h1>
          <p className="text-muted-foreground">Découvrez les prestataires inscrits</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Rechercher par nom, métier, service..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="md:w-64">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      <div className="flex items-center space-x-2">
                        <category.icon className="h-4 w-4" />
                        <span>{category.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              {filteredProfessionals.length} professionnel
              {filteredProfessionals.length > 1 ? "s" : ""} trouvé
              {filteredProfessionals.length > 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {filteredProfessionals.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Aucun professionnel trouvé
            </h3>
            <p className="text-gray-600 mb-6">
              {searchQuery || selectedCategory !== "all"
                ? "Essayez d’élargir vos critères"
                : "Aucun professionnel inscrit pour le moment"}
            </p>
            {(searchQuery || selectedCategory !== "all") && (
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
              >
                Réinitialiser les filtres
              </Button>
            )}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProfessionals.map((prof) => {
              const Icon = getCategoryIcon(prof.profession || "");

              return (
                <Card key={prof.uid} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-primary text-white text-lg">
                          {prof.companyName?.[0] || "P"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-lg truncate">
                          {prof.companyName || "Professionnel"}
                        </CardTitle>
                        <div className="flex items-center space-x-2 mt-1">
                          <Icon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {getProfessionLabel(prof.profession || "")}
                          </span>
                        </div>
                        {prof.isVerified && (
                          <Badge variant="secondary" className="mt-2">Vérifié</Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {prof.rating && (
                      <div className="flex items-center space-x-2">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium ml-1">
                          {prof.rating.toFixed(1)}
                        </span>
                        {prof.totalReviews && (
                          <span className="text-sm text-muted-foreground">
                            ({prof.totalReviews} avis)
                          </span>
                        )}
                      </div>
                    )}

                    {prof.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {prof.description}
                      </p>
                    )}

                    {prof.services?.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Services :</p>
                        <div className="flex flex-wrap gap-1">
                          {prof.services.slice(0, 3).map((service, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {service}
                            </Badge>
                          ))}
                          {prof.services.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{prof.services.length - 3} autres
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}

                    {prof.address && (
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span className="truncate">{prof.address}</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex space-x-2">
                        {prof.phone && (
                          <Button size="sm" variant="outline">
                            <Phone className="h-4 w-4" />
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          <Mail className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button size="sm" asChild>
                        <Link to={`/professionnel/${prof.uid}`}>Voir le profil</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
