import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { MapPin, Phone, Mail } from "lucide-react";
import { ProfessionalProfile } from "../../types";
import { getProfessionIcon, getProfessionLabel } from "../../utils/profession";
import { ProfessionalRating } from "./ProfessionalRating";
import { ProfessionalServices } from "./ProfessionalServices";
import { ProfessionalContactDialog } from "./ProfessionalContactDialog";

interface ProfessionalCardProps {
  professional: ProfessionalProfile;
}

export const ProfessionalCard = ({ professional }: ProfessionalCardProps) => {
  const IconComponent = getProfessionIcon(professional.profession || "");

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex items-start space-x-4">
          <ProfessionalContactDialog professional={professional}>
            <Avatar className="h-16 w-16 cursor-pointer hover:opacity-80 transition-opacity">
              <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                {professional.companyName?.[0] || "P"}
              </AvatarFallback>
            </Avatar>
          </ProfessionalContactDialog>
          
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
        <ProfessionalRating 
          rating={professional.rating} 
          totalReviews={professional.totalReviews} 
        />

        {professional.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {professional.description}
          </p>
        )}

        <ProfessionalServices services={professional.services} />

        {professional.address && (
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span className="truncate">{professional.address}</span>
          </div>
        )}

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
