import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Star,
  MapPin,
  Phone,
  Mail,
  Building,
  Car,
  Wrench,
  Key,
  Users,
} from "lucide-react";
import { ProfessionalProfile } from "../../types";

interface ProfessionalCardProps {
  professional: ProfessionalProfile;
}

export const ProfessionalCard = ({ professional }: ProfessionalCardProps) => {
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

  const IconComponent = getCategoryIcon(professional.profession || "");

  return (
    <Card className="hover:shadow-lg transition-shadow">
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
                <DialogDescription>Informations de contact</DialogDescription>
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
                        <p className="text-sm font-medium">Téléphone</p>
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
                        <p className="text-sm font-medium">Adresse</p>
                        <p className="text-sm text-muted-foreground">
                          {professional.address}
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Spécialité</p>
                      <p className="text-sm text-muted-foreground">
                        {getProfessionLabel(professional.profession || "")}
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
        <div className="flex items-center space-x-2">
          {professional.rating && professional.rating > 0 ? (
            <>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="text-sm font-medium ml-1">
                  {professional.rating.toFixed(1)}
                </span>
              </div>
              <span className="text-sm text-muted-foreground">
                ({professional.totalReviews || 0} avis)
              </span>
            </>
          ) : (
            <div className="flex items-center text-muted-foreground">
              <Star className="h-4 w-4" />
              <span className="text-sm ml-1">Pas encore de note</span>
            </div>
          )}
        </div>

        {/* Description */}
        {professional.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {professional.description}
          </p>
        )}

        {/* Services */}
        {professional.services && professional.services.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Services :</p>
            <div className="flex flex-wrap gap-1">
              {professional.services.slice(0, 3).map((service, index) => (
                <Badge key={index} variant="outline" className="text-xs">
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
};
