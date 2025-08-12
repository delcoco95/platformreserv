import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Star, MapPin, Phone, Mail, Building } from "lucide-react";
import { ProfessionalProfile } from "../../types";
import { getProfessionLabel } from "../../utils/profession";

interface ProfessionalContactDialogProps {
  professional: ProfessionalProfile;
  children: React.ReactNode;
}

export const ProfessionalContactDialog = ({ 
  professional, 
  children 
}: ProfessionalContactDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      
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
                      {professional.rating.toFixed(1)}{" "}
                      {professional.totalReviews && professional.totalReviews > 0
                        ? `(${professional.totalReviews} avis)`
                        : "(Nouveau)"}
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
  );
};
