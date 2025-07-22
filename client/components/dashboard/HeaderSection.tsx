import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Settings, Plus } from "lucide-react";
import { ClientProfile } from "../../types";

interface HeaderSectionProps {
  currentUser: any;
  clientProfile: ClientProfile | null;
  onEditProfile: () => void;
}

export const HeaderSection = ({ 
  currentUser, 
  clientProfile, 
  onEditProfile 
}: HeaderSectionProps) => {
  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={currentUser?.photoURL || ""} />
            <AvatarFallback className="bg-primary text-primary-foreground text-lg">
              {clientProfile?.firstName?.[0] || ""}
              {clientProfile?.lastName?.[0] || "C"}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Bonjour {clientProfile?.firstName || "Client"} 👋
            </h1>
            <p className="text-muted-foreground mt-1">
              Bienvenue dans votre espace personnel
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={onEditProfile}>
            <Settings className="h-4 w-4 mr-2" />
            Modifier mon profil
          </Button>
          <Button asChild>
            <Link to="/professionnels">
              <Plus className="h-4 w-4 mr-2" />
              Nouveau rendez-vous
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
