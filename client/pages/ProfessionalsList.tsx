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
  Filter,
} from "lucide-react";
import { professionalService } from "../services/professionalService";
import { ProfessionalProfile } from "../types";
import { useAuth } from "../contexts/AuthContext";
import { DemoModeAlert } from "../components/DemoModeAlert";

export default function ProfessionalsList() {
  const { currentUser } = useAuth();
  const [searchParams] = useSearchParams();
  const [professionals, setProfessionals] = useState<ProfessionalProfile[]>([]);
  const [filteredProfessionals, setFilteredProfessionals] = useState<
    ProfessionalProfile[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("categorie") || "all",
  );

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
    } catch (error) {
      console.error("Erreur lors du chargement des professionnels:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterProfessionals = () => {
    let filtered = [...professionals];

    // Filtrer par catégorie
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (prof) => prof.profession === selectedCategory,
      );
    }

    // Filtrer par recherche
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (prof) =>
          prof.companyName?.toLowerCase().includes(query) ||
          prof.profession?.toLowerCase().includes(query) ||
          prof.services?.some((service) =>
            service.toLowerCase().includes(query),
          ) ||
          prof.address?.toLowerCase().includes(query),
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
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
          <p className="text-muted-foreground">
            Chargement des professionnels...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Nos professionnels
          </h1>
          <p className="text-muted-foreground">
            Découvrez tous les professionnels disponibles sur notre plateforme
          </p>
        </div>

        {/* Demo Mode Alert */}
        {!currentUser && <DemoModeAlert />}

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Rechercher par nom, service, ville..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Category filter */}
            <div className="md:w-64">
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
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

          {/* Results count */}
          <div className="mt-4 pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              {filteredProfessionals.length} professionnel
              {filteredProfessionals.length > 1 ? "s" : ""} trouvé
              {filteredProfessionals.length > 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {/* Results */}
        {filteredProfessionals.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Aucun professionnel trouvé
            </h3>
            <p className="text-gray-600 mb-6">
              {searchQuery || selectedCategory !== "all"
                ? "Essayez de modifier vos critères de recherche"
                : "Aucun professionnel n'est inscrit pour le moment"}
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
            {filteredProfessionals.map((professional) => {
              const IconComponent = getCategoryIcon(
                professional.profession || "",
              );

              return (
                <Card
                  key={professional.uid}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                          {professional.companyName?.[0] || "P"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-lg truncate">
                          {professional.companyName || "Professionnel"}
                        </CardTitle>
                        <div className="flex items-center space-x-2 mt-1">
                          <IconComponent className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {getProfessionLabel(professional.profession || "")}
                          </span>
                        </div>
                        {professional.isVerified && (
                          <Badge variant="secondary" className="mt-2">
                            Vérifié
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Rating */}
                    {professional.rating && (
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium ml-1">
                            {professional.rating.toFixed(1)}
                          </span>
                        </div>
                        {professional.totalReviews && (
                          <span className="text-sm text-muted-foreground">
                            ({professional.totalReviews} avis)
                          </span>
                        )}
                      </div>
                    )}

                    {/* Description */}
                    {professional.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {professional.description}
                      </p>
                    )}

                    {/* Services */}
                    {professional.services &&
                      professional.services.length > 0 && (
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Services :</p>
                          <div className="flex flex-wrap gap-1">
                            {professional.services
                              .slice(0, 3)
                              .map((service, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {service}
                                </Badge>
                              ))}
                            {professional.services.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{professional.services.length - 3} autres
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}

                    {/* Location */}
                    {professional.address && (
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span className="truncate">{professional.address}</span>
                      </div>
                    )}

                    {/* Contact */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex space-x-2">
                        {professional.phone && (
                          <Button size="sm" variant="outline">
                            <Phone className="h-4 w-4" />
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          <Mail className="h-4 w-4" />
                        </Button>
                      </div>
                                            <Button size="sm" asChild>
                        <Link to={`/professionnel/${professional.uid}`}>
                          Voir le profil
                        </Link>
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
