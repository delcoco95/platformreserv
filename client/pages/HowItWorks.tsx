import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  Search,
  Calendar,
  CheckCircle,
  Star,
  Shield,
  Clock,
  ArrowRight,
  Users,
  Car,
  Wrench,
  Key,
  Award,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Recherchez",
      description:
        "Trouvez un professionnel près de chez vous selon vos besoins",
      icon: Search,
      color: "bg-blue-100 text-blue-600",
    },
    {
      number: "02",
      title: "Réservez",
      description: "Choisissez un créneau disponible directement en ligne",
      icon: Calendar,
      color: "bg-green-100 text-green-600",
    },
    {
      number: "03",
      title: "Confirmez",
      description: "Le professionnel vous contacte pour finaliser les détails",
      icon: CheckCircle,
      color: "bg-purple-100 text-purple-600",
    },
  ];

  const services = [
    {
      icon: Car,
      title: "Automobile",
      description: "Entretien, réparation, vidange, révision complète",
      features: [
        "Déplacement à domicile",
        "Diagnostic gratuit",
        "Pièces d'origine",
      ],
    },
    {
      icon: Wrench,
      title: "Plomberie",
      description: "Installation, dépannage, urgences 24h/24",
      features: [
        "Intervention rapide",
        "Devis transparent",
        "Garantie travaux",
      ],
    },
    {
      icon: Key,
      title: "Serrurerie",
      description: "Ouverture de porte, installation, sécurisation",
      features: [
        "Service d'urgence",
        "Sécurité renforcée",
        "Conseils personnalisés",
      ],
    },
  ];

  const advantages = [
    {
      icon: Shield,
      title: "Professionnels vérifiés",
      description: "Tous nos professionnels sont vérifiés et assurés",
    },
    {
      icon: Star,
      title: "Avis clients",
      description: "Consultez les avis et notes laissés par d'autres clients",
    },
    {
      icon: Clock,
      title: "Réservation 24h/24",
      description: "Réservez quand vous voulez, où vous voulez",
    },
    {
      icon: Award,
      title: "Satisfaction garantie",
      description: "Satisfaction client garantie ou remboursé",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/5 to-primary/10 py-20">
        <div className="container max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Comment ça marche ?
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Découvrez comment réserver facilement vos services à domicile en
            quelques étapes simples.
          </p>
          <Button size="lg" asChild>
            <Link to="/professionnels">
              Commencer maintenant
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              3 étapes simples
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Réservez votre service en quelques minutes seulement
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <Card
                key={index}
                className="relative text-center hover:shadow-lg transition-shadow"
              >
                <CardHeader className="pb-4">
                  <div
                    className={`w-16 h-16 rounded-full ${step.color} flex items-center justify-center mx-auto mb-4`}
                  >
                    <step.icon className="h-8 w-8" />
                  </div>
                  <Badge variant="outline" className="w-fit mx-auto mb-2">
                    Étape {step.number}
                  </Badge>
                  <CardTitle className="text-xl">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="h-6 w-6 text-muted-foreground" />
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Nos domaines d'expertise
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Des professionnels qualifiés pour tous vos besoins
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center gap-2 text-sm"
                      >
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className="w-full mt-4" asChild>
                    <Link
                      to={`/professionnels?categorie=${service.title.toLowerCase()}`}
                    >
                      Voir les professionnels
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-20">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Pourquoi nous choisir ?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Les avantages qui font la différence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <advantage.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">
                  {advantage.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {advantage.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Prêt à commencer ?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8">
            Rejoignez des milliers de clients satisfaits
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/professionnels">
                <Users className="mr-2 h-5 w-5" />
                Trouver un professionnel
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
              asChild
            >
              <Link to="/inscription">Devenir professionnel</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
