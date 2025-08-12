import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Settings, Eye, CheckCircle } from "lucide-react";
import { ProfessionalProfile } from "../../types";
import { getProfessionIcon } from "../../utils/profession";

interface ProfessionalProfileSectionProps {
  professional: ProfessionalProfile;
  currentUser: any;
  onEditProfile: () => void;
}

export const ProfessionalProfileSection = ({ 
  professional, 
  currentUser, 
  onEditProfile 
}: ProfessionalProfileSectionProps) => {
  const IconComponent = getProfessionIcon(professional?.profession || "");

  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <div className="flex items-start gap-6">
          <Avatar className="h-20 w-20">
            <AvatarImage src={currentUser?.photoURL || ""} />
            <AvatarFallback className="bg-primary text-primary-foreground text-xl">
              {professional?.companyName?.[0] || "P"}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">
              {professional?.companyName || "Mon entreprise"}
            </h2>
            <div className="flex items-center gap-2 mb-4">
              <IconComponent className="h-4 w-4 text-muted-foreground" />
              <p className="text-muted-foreground">
                {professional?.profession || "Professionnel"}
              </p>
              {professional?.isVerified && (
                <Badge variant="secondary">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Vérifié
                </Badge>
              )}
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" onClick={onEditProfile}>
              <Settings className="h-4 w-4 mr-2" />
              Modifier mes informations
            </Button>
            <Button variant="outline" asChild>
              <Link to={`/professionnel/${professional?.uid}`}>
                <Eye className="h-4 w-4 mr-2" />
                Ma fiche publique
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
