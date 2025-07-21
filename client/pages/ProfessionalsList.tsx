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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
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
  Building,
} from "lucide-react";
import { professionalService } from "../services/professionalService";
import { ProfessionalProfile } from "../types";
import { useAuth } from "../contexts/AuthContext";
import { DemoModeAlert } from "../components/DemoModeAlert";
import { NewProfessionalAlert } from "../components/NewProfessionalAlert";

export default function ProfessionalsList() {
  const { currentUser } = useAuth();
  const [searchParams] = useSearchParams();
  const [professionals, setProfessionals] = useState<ProfessionalProfile[]>([]);
  const [filteredProfessionals, setFilteredProfessionals] = useState<ProfessionalProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("categorie") || "all",
  );
  const [selectedProfessional, setSelectedProfessional] =
    useState<ProfessionalProfile | null>(null);
  const [showContactDialog, setShowContactDialog] = useState(false);

  const categories = [
    { value: "all", label: "Toutes les catégories", icon: Users },
    { value: "automobile", label: "Automobile", icon: Car },
    { value: "plomberie", label: "Plomberie", icon: Wrench },
    { value: "serrurerie", label: "Serrurerie", icon: Key },
  ];

  useEffect(() => {
    // Utiliser un listener temps réel pour les professionnels
    const unsubscribe = professionalService.onProfessionalsChange((data) => {
      setProfessionals(data);
      setLoading(false);
    });

    return () => unsubscribe();
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

  // Fonction pour normaliser le texte (insensible aux accents)
  const normalizeText = (text: string) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  };

  const filterProfessionals = () => {
    let filtered = [...professionals];

    if (selectedCategory !== "all") {
      filtered = filtered.filter((prof) => prof.profession === selectedCategory);
    }

    // Filtrer par recherche (insensible aux accents et à la casse)
    if (searchQuery.trim()) {
      const query = normalizeText(searchQuery);
      filtered = filtered.filter(
        (prof) =>
          normalizeText(prof.companyName || "").includes(query) ||
          normalizeText(prof.profession || "").includes(query) ||
          prof.services?.some((service) =>
            normalizeText(service).includes(query),
          ) ||
          normalizeText(prof.address || "").includes(query) ||
          normalizeText(prof.description || "").includes(query),
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
      <NewProfessionalAlert professionals={professionals} />
      <div className="container max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Nos professionnels</h1>
          <p className="text-muted-foreground">Découvrez les prestataires inscrits</p>
        </div>

        {/* Demo Mode Alert */}
        {!currentUser && <DemoModeAlert />}

        {/* Filters */}
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
                      <Dialog>
                        <DialogTrigger asChild>
                          <Avatar className="h-16 w-16 cursor-pointer hover:opacity-80 transition-opacity">
                            <AvatarImage src="" />
                            <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                              {professional.companyName?.[0] || "P"}
                            </AvatarFallback>
                          </Avatar>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                                  {professional.companyName?.[0] || "P"}
                                </AvatarFallback>
                              </Avatar>
                              {professional.companyName}
                            </DialogTitle>
                            <DialogDescription>
                              Informations de contact
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-3">
                              <div className="flex items-center gap-3">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <div>
                                  <p className="text-sm font-medium">Email</p>
                                  <a
                                    href={`mailto:${professional.email}`}
                                    className="text-sm text-primary hover:underline"
                                  >
                                    {professional.email}
                                  </a>
                                </div>
                              </div>
                              {professional.phone && (
                                <div className="flex items-center gap-3">
                                  <Phone className="h-4 w-4 text-muted-foreground" />
                                  <div>
                                    <p className="text-sm font-medium">
                                      Téléphone
                                    </p>
                                    <a
                                      href={`tel:${professional.phone}`}
                                      className="text-sm text-primary hover:underline"
                                    >
                                      {professional.phone}
                                    </a>
                                  </div>
                                </div>
                              )}
                              {professional.address && (
                                <div className="flex items-center gap-3">
                                  <MapPin className="h-4 w-4 text-muted-foreground" />
                                  <div>
                                    <p className="text-sm font-medium">
                                      Adresse
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                      {professional.address}
                                    </p>
                                  </div>
                                </div>
                              )}
                              <div className="flex items-center gap-3">
                                <Building className="h-4 w-4 text-muted-foreground" />
                                <div>
                                  <p className="text-sm font-medium">
                                    Spécialité
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    {getProfessionLabel(
                                      professional.profession || "",
                                    )}
                                  </p>
                                </div>
                              </div>
                              {professional.rating && (
                                <div className="flex items-center gap-3">
                                  <Star className="h-4 w-4 text-muted-foreground" />
                                  <div>
                                    <p className="text-sm font-medium">Note</p>
                                    <div className="flex items-center gap-1">
                                      <Star className="h-3 w-3 text-yellow-500 fill-current" />
                                      <span className="text-sm">
                                        {professional.rating.toFixed(1)} (
                                        {professional.totalReviews || 0} avis)
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                            <div className="border-t pt-4">
                              <Button className="w-full" asChild>
                                <Link to={`/professionnel/${professional.uid}`}>
                                  Voir le profil complet
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
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
                          <Link to={`/professionnel/${prof.uid}`}>
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
