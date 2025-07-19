import { Button } from "./ui/button";
import { Construction } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  description: string;
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center space-y-6 max-w-md mx-auto px-4">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
          <Construction className="h-8 w-8 text-primary" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <p className="text-sm text-muted-foreground">
          Cette page sera développée prochainement. Continuez à interagir avec
          l'assistant pour compléter le contenu de cette section.
        </p>
        <Button asChild>
          <a href="/">Retour à l'accueil</a>
        </Button>
      </div>
    </div>
  );
}
