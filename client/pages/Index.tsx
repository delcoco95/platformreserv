import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Search,
  Car,
  Wrench,
  Key,
  Droplet,
  Scissors,
  Shield,
  Clock,
  Star,
  MapPin,
  Users,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

export default function Index() {
  const [postalCode, setPostalCode] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const services = [
    {
      icon: Car,
      title: "Entretien & Réparation Automobile",
      description: "Tous vos besoins automotive",
      subcategories: [
        { name: "Vidange", icon: Droplet },
        { name: "Freinage", icon: Shield },
        { name: "Lavage auto", icon: Car },
        { name: "Polissage", icon: Star },
        { name: "Carrosserie", icon: Wrench },
      ],
      color: "bg-blue-50 text-blue-700 border-blue-200",
    },
    {
      icon: Wrench,
      title: "Plomberie",
      description: "Installation et dépannage",
      subcategories: [
        { name: "Installation", icon: Wrench },
        { name: "Dépannage", icon: Clock },
        { name: "Urgences 24h/7j", icon: Shield },
      ],
      color: "bg-green-50 text-green-700 border-green-200",
    },
    {
      icon: Key,
      title: "Serrurerie",
      description: "Sécurité et urgences",
      subcategories: [
        { name: "Ouverture de porte", icon: Key },
        { name: "Installation serrure", icon: Shield },
        { name: "Urgence", icon: Clock },
      ],
      color: "bg-orange-50 text-orange-700 border-orange-200",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Recherchez",
      description:
        "Trouvez un professionnel près de chez vous selon vos besoins",
      icon: Search,
    },
    {
      number: "02",
      title: "Réservez",
      description: "Choisissez un créneau disponible directement en ligne",
      icon: Clock,
    },
    {
      number: "03",
      title: "Confirmez",
      description:
        "Recevez la confirmation et les détails de votre rendez-vous",
      icon: CheckCircle,
    },
  ];

  const faqs = [
    {
      question: "Comment puis-je réserver un rendez-vous ?",
      answer:
        "Il vous suffit de rechercher un professionnel dans votre secteur, consulter ses disponibilités et choisir le créneau qui vous convient. La réservation se fait en quelques clics.",
    },
    {
      question: "Puis-je annuler ou modifier mon rendez-vous ?",
      answer:
        "Oui, vous pouvez annuler ou modifier votre rendez-vous jusqu'à 24h avant la date prévue directement depuis votre espace client.",
    },
    {
      question: "Comment sont fixés les tarifs ?",
      answer:
        "Chaque professionnel fixe ses propres tarifs qui sont affichés clairement sur sa fiche. Vous pouvez comparer les prix avant de réserver.",
    },
    {
      question: "Que se passe-t-il en cas d'urgence ?",
      answer:
        "Pour les urgences, filtrez par 'Disponible maintenant' ou 'Urgence 24h/7j'. Nos professionnels partenaires proposent des interventions rapides.",
    },
    {
      question: "Comment contacter le professionnel ?",
      answer:
        "Une fois votre réservation confirmée, vous recevez les coordonnées du professionnel et pouvez le contacter directement.",
    },
    {
      question: "Y a-t-il des frais de réservation ?",
      answer:
        "La réservation en ligne est entièrement gratuite. Vous ne payez que le service du professionnel selon ses tarifs.",
    },
  ];

  const handleSearch = () => {
    // Navigate to search results with parameters
    if (postalCode && selectedCategory) {
      window.location.href = `/recherche?code=${postalCode}&service=${selectedCategory}`;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/5 to-primary/10 py-20 md:py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
              Trouvez votre professionnel en{" "}
              <span className="text-primary">quelques clics</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Réservez facilement vos rendez-vous avec des professionnels
              qualifiés près de chez vous : automobile, plomberie, serrurerie.
            </p>

            {/* Search Bar */}
            <div className="bg-white p-6 rounded-2xl shadow-lg max-w-2xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Code postal (ex: 75001)"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="h-12"
                  />
                </div>
                <div className="flex-1">
                  <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Choisir un service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="automobile">Automobile</SelectItem>
                      <SelectItem value="plomberie">Plomberie</SelectItem>
                      <SelectItem value="serrurerie">Serrurerie</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleSearch} size="lg" className="h-12 px-8">
                  <Search className="mr-2 h-5 w-5" />
                  Rechercher
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>4.8/5 sur 2400+ avis</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                <span>+5000 professionnels</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Nos services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Découvrez tous nos domaines d'expertise avec des professionnels
              qualifiés et vérifiés.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-primary/20 flex flex-col h-full"
              >
                <CardHeader className="text-center pb-4">
                  <div
                    className={`w-16 h-16 rounded-full ${service.color} flex items-center justify-center mx-auto mb-4`}
                  >
                    <service.icon className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col h-full">
                  <div className="space-y-3 flex-1">
                    {service.subcategories.map((sub, subIndex) => (
                      <div
                        key={subIndex}
                        className="flex items-center gap-3 text-sm"
                      >
                        <sub.icon className="h-4 w-4 text-muted-foreground" />
                        <span>{sub.name}</span>
                      </div>
                    ))}
                  </div>
                                    <Button
                    variant="outline"
                    className="w-full mt-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    asChild
                  >
                    <Link to="/professionnels">
                      Voir les professionnels
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Comment ça marche ?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Réservez votre rendez-vous en 3 étapes simples
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {steps.map((step, index) => (
              <div key={index} className="text-center space-y-6">
                <div className="relative mx-auto w-fit">
                  <div className="w-20 h-20 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">
                    {step.number}
                  </div>
                  <div className="absolute -bottom-3 -right-3">
                    <div className="w-12 h-12 bg-white border-4 border-primary rounded-full flex items-center justify-center shadow-md">
                      <step.icon className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                </div>
                <div className="bg-white/50 rounded-xl p-6 border border-primary/10">
                  <h3 className="text-xl font-semibold mb-3 text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Questions fréquentes
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Trouvez rapidement les réponses à vos questions
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-border rounded-lg px-6"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-6">
                    <span className="font-medium">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Professional CTA */}
      <section className="py-20 bg-primary">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground">
              Vous êtes un professionnel ?
            </h2>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
              Rejoignez notre plateforme et développez votre clientèle. Gérez
              vos rendez-vous facilement et augmentez votre visibilité.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-primary hover:bg-white/90"
                asChild
              >
                <Link to="/professionnels">
                  Inscription professionnelle
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 hover:border-white/80 backdrop-blur-sm"
              >
                En savoir plus
              </Button>
            </div>
            <div className="flex items-center justify-center gap-8 text-sm text-primary-foreground/80 pt-8">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <span>Inscription gratuite</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <span>Commission réduite</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <span>Support dédié</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
