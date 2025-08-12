import { Badge } from "../ui/badge";
import { ProfessionalProfile } from "../../types";

interface ProfessionalServicesProps {
  services: ProfessionalProfile["services"];
  maxVisible?: number;
}

export const ProfessionalServices = ({ services, maxVisible = 3 }: ProfessionalServicesProps) => {
  if (!services || !Array.isArray(services) || services.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">Services :</p>
      <div className="flex flex-wrap gap-1">
        {services.slice(0, maxVisible).map((service, index) => (
          <Badge key={index} variant="outline" className="text-xs">
            {typeof service === "string" ? service : service.name}
          </Badge>
        ))}
        {services.length > maxVisible && (
          <Badge variant="outline" className="text-xs">
            +{services.length - maxVisible} autres
          </Badge>
        )}
      </div>
    </div>
  );
};
