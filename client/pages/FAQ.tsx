import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import {
  Search,
  Phone,
  Mail,
  MessageCircle,
  Users,
  CreditCard,
  Shield,
  Clock,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function FAQ() {
  const faqCategories = [
    {
      title: "Questions générales",
      icon: Users,
      questions: [
        {
          question: "Comment fonctionne RendezVousPro ?",
          answer:
            "RendezVousPro est une plateforme qui met en relation des clients avec des professionnels qualifiés. Vous recherchez un service, choisissez un professionnel, réservez un créneau et le professionnel vous contacte pour finaliser les détails.",
        },
        {
          question: "Quels types de services proposez-vous ?",
          answer:
            "Nous proposons des services dans trois domaines principaux : l'automobile (entretien, réparation), la plomberie (installation, dépannage) et la serrurerie (ouverture, sécurisation). Tous nos professionnels interviennent à domicile.",
        },
        {
          question: "Dans quelles régions êtes-vous disponible ?",
          answer:
            "Nous couvrons actuellement toute la France métropolitaine. Notre réseau de professionnels s'étend dans toutes les grandes villes et leurs banlieues.",
        },
        {
          question: "Comment sont sélectionnés les professionnels ?",
          answer:
            "Tous nos professionnels sont rigoureusement sélectionnés. Nous vérifions leurs qualifications, leur assurance professionnelle, leurs références clients et leur expérience dans leur domaine.",
        },
      ],
    },
    {
      title: "Réservation et paiement",
      icon: CreditCard,
      questions: [
        {
          question: "Comment réserver un service ?",
          answer:
            "C'est très simple : recherchez le service dont vous avez besoin, consultez les profils des professionnels, choisissez celui qui vous convient, sélectionnez un créneau disponible et confirmez votre réservation.",
        },
        {
          question: "Quand dois-je payer ?",
          answer:
            "Le paiement s'effectue directement avec le professionnel après la prestation. Vous réglez le montant convenu selon le mode de paiement accepté par le professionnel (espèces, chèque, carte bancaire).",
        },
        {
          question: "Puis-je annuler ou modifier ma réservation ?",
          answer:
            "Oui, vous pouvez annuler ou modifier votre réservation jusqu'à 24h avant l'intervention. Au-delà, des frais d'annulation peuvent s'appliquer selon les conditions du professionnel.",
        },
        {
          question: "Y a-t-il des frais cachés ?",
          answer:
            "Non, aucun frais caché. Le prix affiché par le professionnel est le prix final. Les seuls frais supplémentaires possibles sont les frais de déplacement si mentionnés dans l'annonce.",
        },
      ],
    },
    {
      title: "Sécurité et garanties",
      icon: Shield,
      questions: [
        {
          question: "Les professionnels sont-ils assurés ?",
          answer:
            "Oui, tous nos professionnels disposent d'une assurance responsabilité civile professionnelle et décennale selon leur domaine d'activité. Nous vérifions ces documents avant leur inscription.",
        },
        {
          question: "Que se passe-t-il en cas de problème ?",
          answer:
            "En cas de problème, contactez notre service client dans les 48h. Nous medions entre vous et le professionnel pour trouver une solution. Si nécessaire, nous activons notre garantie satisfaction.",
        },
        {
          question: "Mes données personnelles sont-elles protégées ?",
          answer:
            "Absolument. Nous respectons le RGPD et ne partageons vos données qu'avec le professionnel choisi, et uniquement dans le cadre de la prestation. Vos données ne sont jamais vendues à des tiers.",
        },
        {
          question: "Comment signaler un professionnel ?",
          answer:
            "Vous pouvez signaler un professionnel via votre espace client ou en contactant notre service client. Nous enquêtons sur tous les signalements et prenons les mesures appropriées.",
        },
      ],
    },
    {
      title: "Devenir professionnel",
      icon: Clock,
      questions: [
        {
          question: "Comment devenir professionnel partenaire ?",
          answer:
            "Inscrivez-vous sur notre plateforme en tant que professionnel, complétez votre profil avec vos qualifications et références, puis attendez la validation de notre équipe. L'inscription est gratuite.",
        },
        {
          question: "Quels sont les critères pour rejoindre la plateforme ?",
          answer:
            "Vous devez être un professionnel qualifié avec une assurance valide, avoir au moins 2 ans d'expérience dans votre domaine, et présenter de bonnes références clients.",
        },
        {
          question: "Y a-t-il des commissions ?",
          answer:
            "Nous prélevons une commission réduite uniquement sur les prestations réalisées. Pas d'abonnement, pas de frais cachés. Vous ne payez que quand vous travaillez.",
        },
        {
          question: "Comment gérer mon planning ?",
          answer:
            "Vous disposez d'un espace professionnel pour gérer vos disponibilités, vos tarifs, vos services et consulter vos demandes de rendez-vous en temps réel.",
        },
      ],
    },
  ];

  const contactOptions = [
    {
      icon: Phone,
      title: "Par téléphone",
      description: "Du lundi au vendredi, 9h-18h",
      action: "01 23 45 67 89",
      link: "tel:+33123456789",
    },
    {
      icon: Mail,
      title: "Par email",
      description: "Réponse sous 24h",
      action: "contact@rendezvoupro.fr",
      link: "mailto:contact@rendezvoupro.fr",
    },
    {
      icon: MessageCircle,
      title: "Chat en ligne",
      description: "Assistance immédiate",
      action: "Ouvrir le chat",
      link: "#",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/5 to-primary/10 py-20">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Foire aux questions
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Trouvez rapidement les réponses à vos questions
          </p>

          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Rechercher dans la FAQ..."
              className="pl-10 h-12"
            />
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-20">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="space-y-12">
            {faqCategories.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <category.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">
                    {category.title}
                  </h2>
                </div>

                <Accordion type="single" collapsible className="space-y-4">
                  {category.questions.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`${categoryIndex}-${index}`}
                      className="border rounded-lg px-6"
                    >
                      <AccordionTrigger className="text-left font-medium">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-50">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Vous ne trouvez pas votre réponse ?
            </h2>
            <p className="text-lg text-muted-foreground">
              Notre équipe est là pour vous aider
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {contactOptions.map((option, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <option.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{option.title}</CardTitle>
                  <CardDescription>{option.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full" asChild>
                    <a href={option.link}>
                      {option.action}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <h3 className="text-xl font-semibold mb-4">
                Toujours pas de réponse ?
              </h3>
              <p className="text-muted-foreground mb-6">
                Consultez notre centre d'aide complet ou contactez directement
                notre équipe support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <Link to="/aide">
                    Centre d'aide
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <a href="mailto:contact@rendezvoupro.fr">
                    Contacter le support
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
