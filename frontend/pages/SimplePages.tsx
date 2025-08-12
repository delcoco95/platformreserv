import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  ArrowLeft,
  Shield,
  MapPin,
  HelpCircle,
  FileText,
  Lock,
  Cookie,
  CheckCircle,
  Phone,
  Mail,
  Clock,
  Euro,
  Users,
  Award,
} from "lucide-react";

export function Guarantees() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="mb-6">
          <Button variant="outline" asChild>
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour à l'accueil
            </Link>
          </Button>
        </div>

        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Nos garanties
            </h1>
            <p className="text-lg text-muted-foreground">
              Votre satisfaction est notre priorité absolue
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  Professionnels vérifiés
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Tous nos professionnels sont rigoureusement sélectionnés et
                  vérifiés. Assurance, qualifications, références : nous
                  contrôlons tout pour votre sécurité.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-blue-600" />
                  Satisfaction garantie
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Si vous n'êtes pas satisfait du service, nous nous engageons à
                  trouver une solution ou à vous rembourser intégralement.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Euro className="h-5 w-5 text-yellow-600" />
                  Prix transparents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Tous nos tarifs sont affichés clairement. Aucune surprise,
                  aucun frais caché. Le prix annoncé est le prix final.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-purple-600" />
                  Ponctualité assurée
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Nos professionnels s'engagent à respecter les horaires
                  convenus. En cas de retard, vous êtes immédiatement prévenu.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Notre engagement qualité</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold">Suivi personnalisé</h3>
                  <p className="text-muted-foreground">
                    Un conseiller dédié vous accompagne tout au long de votre
                    expérience.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold">Support réactif</h3>
                  <p className="text-muted-foreground">
                    Notre équipe support est disponible 7j/7 pour répondre à vos
                    questions.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold">Assurance responsabilité</h3>
                  <p className="text-muted-foreground">
                    Tous nos interventions sont couvertes par une assurance
                    responsabilité civile professionnelle.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export function Coverage() {
  const zones = [
    { name: "Paris et Île-de-France", available: true },
    { name: "Lyon et région Rhône-Alpes", available: true },
    { name: "Marseille et Provence", available: true },
    { name: "Toulouse et Occitanie", available: true },
    { name: "Bordeaux et Nouvelle-Aquitaine", available: true },
    { name: "Lille et Hauts-de-France", available: true },
    { name: "Nantes et Pays de la Loire", available: true },
    { name: "Strasbourg et Grand Est", available: true },
    { name: "Montpellier et Hérault", available: true },
    { name: "Rennes et Bretagne", available: true },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="mb-6">
          <Button variant="outline" asChild>
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour à l'accueil
            </Link>
          </Button>
        </div>

        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Zone de couverture
            </h1>
            <p className="text-lg text-muted-foreground">
              BookAuto est disponible dans toute la France
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Principales zones disponibles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-3">
                {zones.map((zone, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>{zone.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Extension continue</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Nous étendons constamment notre réseau de professionnels pour
                  couvrir de nouvelles zones. Si votre région n'est pas encore
                  disponible, elle le sera bientôt !
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Demande dans votre zone</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Votre zone n'est pas encore couverte ? Contactez-nous pour
                  nous faire part de votre demande.
                </p>
                <Button asChild>
                  <Link to="/contact">Nous contacter</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Help() {
  const helpTopics = [
    {
      title: "Comment réserver un service ?",
      content:
        "Recherchez le service souhaité, sélectionnez un professionnel, choisissez un créneau et confirmez votre réservation.",
    },
    {
      title: "Comment annuler une réservation ?",
      content:
        "Vous pouvez annuler gratuitement jusqu'à 24h avant l'intervention depuis votre espace client.",
    },
    {
      title: "Que faire en cas de problème ?",
      content:
        "Contactez immédiatement notre support client au 01 23 45 67 89 ou via notre chat en ligne.",
    },
    {
      title: "Comment devenir professionnel ?",
      content:
        "Inscrivez-vous sur notre plateforme, complétez votre profil et soumettez vos documents de qualification.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="mb-6">
          <Button variant="outline" asChild>
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour à l'accueil
            </Link>
          </Button>
        </div>

        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Aide et support
            </h1>
            <p className="text-lg text-muted-foreground">
              Nous sommes là pour vous aider
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-green-600" />
                  Support téléphonique
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3">
                  Notre équipe est disponible du lundi au vendredi de 9h à 18h.
                </p>
                <a
                  href="tel:+33123456789"
                  className="text-primary font-semibold hover:underline"
                >
                  01 23 45 67 89
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-blue-600" />
                  Support par email
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3">
                  Réponse garantie sous 24h ouvrées.
                </p>
                <a
                  href="mailto:support@rendezvoupro.fr"
                  className="text-primary font-semibold hover:underline"
                >
                  support@rendezvoupro.fr
                </a>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Questions fréquentes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {helpTopics.map((topic, index) => (
                <div key={index} className="border-b pb-4 last:border-b-0">
                  <h3 className="font-semibold mb-2">{topic.title}</h3>
                  <p className="text-muted-foreground">{topic.content}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="text-center">
            <Button asChild size="lg">
              <Link to="/faq">Voir toutes les FAQ</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Terms() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="mb-6">
          <Button variant="outline" asChild>
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour à l'accueil
            </Link>
          </Button>
        </div>

        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Conditions d'utilisation
            </h1>
            <p className="text-muted-foreground">
              Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>1. Objet et champ d'application</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Les présentes conditions générales d'utilisation (CGU)
                s'appliquent à l'utilisation de la plateforme BookAuto,
                service de mise en relation entre clients particuliers et
                professionnels de services �� domicile.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Inscription et compte utilisateur</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-muted-foreground">
                L'inscription sur la plateforme est gratuite pour les clients.
                Elle nécessite de fournir des informations exactes et à jour.
              </p>
              <p className="text-muted-foreground">
                Chaque utilisateur est responsable de la confidentialité de ses
                identifiants de connexion.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. Services proposés</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                BookAuto est une plateforme de mise en relation. Nous ne
                réalisons pas directement les prestations de service, mais
                facilitons le contact entre clients et professionnels qualifiés.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. Responsabilités</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-muted-foreground">
                RendezVousPro s'engage à vérifier les qualifications des
                professionnels partenaires, mais ne peut être tenu responsable
                de la qualité des prestations réalisées.
              </p>
              <p className="text-muted-foreground">
                Les professionnels sont responsables de leurs interventions et
                disposent de leurs propres assurances professionnelles.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. Tarification et paiement</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Les tarifs sont fixés librement par chaque professionnel et
                affichés de manière transparente sur la plateforme. Le paiement
                s'effectue directement avec le professionnel selon les modalités
                convenues.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="mb-6">
          <Button variant="outline" asChild>
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour à l'accueil
            </Link>
          </Button>
        </div>

        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Politique de confidentialité
            </h1>
            <p className="text-muted-foreground">
              Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-primary" />
                Protection de vos données
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Nous nous engageons à protéger vos données personnelles
                conformément au Règlement Général sur la Protection des Données
                (RGPD) et à la loi Informatique et Libertés.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>1. Données collectées</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-muted-foreground">
                Nous collectons uniquement les données nécessaires au
                fonctionnement de notre service :
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Informations d'identification (nom, prénom, email)</li>
                <li>Coordonnées (adresse, téléphone)</li>
                <li>Données de navigation et d'utilisation du site</li>
                <li>Préférences et historique des réservations</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Utilisation des données</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-muted-foreground">
                Vos données sont utilisées pour :
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Faciliter la mise en relation avec les professionnels</li>
                <li>Gérer votre compte et vos réservations</li>
                <li>Améliorer nos services</li>
                <li>Vous envoyer des communications pertinentes</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. Vos droits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-muted-foreground">
                Vous disposez des droits suivants sur vos données :
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Droit d'accès et de rectification</li>
                <li>Droit à l'effacement</li>
                <li>Droit à la portabilité</li>
                <li>Droit d'opposition</li>
              </ul>
              <p className="text-muted-foreground mt-3">
                Pour exercer ces droits, contactez-nous à :{" "}
                <a
                  href="mailto:dpo@rendezvoupro.fr"
                  className="text-primary hover:underline"
                >
                  dpo@rendezvoupro.fr
                </a>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export function Cookies() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="mb-6">
          <Button variant="outline" asChild>
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour à l'accueil
            </Link>
          </Button>
        </div>

        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Gestion des cookies
            </h1>
            <p className="text-muted-foreground">
              Informations sur l'utilisation des cookies sur notre site
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cookie className="h-5 w-5 text-orange-600" />
                Qu'est-ce qu'un cookie ?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Un cookie est un petit fichier texte stocké sur votre appareil
                lors de votre visite sur notre site. Il nous permet d'améliorer
                votre expérience de navigation et de personnaliser nos services.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Types de cookies utilisés</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Cookies essentiels</h3>
                <p className="text-muted-foreground">
                  Nécessaires au fonctionnement du site (authentification,
                  sécurité, navigation). Ces cookies ne peuvent pas être
                  désactivés.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Cookies de performance</h3>
                <p className="text-muted-foreground">
                  Nous aident à comprendre comment vous utilisez notre site pour
                  l'améliorer (Google Analytics, statistiques de visite).
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Cookies de préférences</h3>
                <p className="text-muted-foreground">
                  Mémorisent vos choix et préférences pour personnaliser votre
                  expérience (langue, région, préférences d'affichage).
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Gérer vos préférences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Vous pouvez à tout moment modifier vos préférences concernant
                les cookies :
              </p>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <h4 className="font-medium">Cookies essentiels</h4>
                    <p className="text-sm text-muted-foreground">
                      Toujours actifs
                    </p>
                  </div>
                  <Badge variant="secondary">Obligatoire</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <h4 className="font-medium">Cookies de performance</h4>
                    <p className="text-sm text-muted-foreground">
                      Analytics et statistiques
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Gérer
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <h4 className="font-medium">Cookies de préférences</h4>
                    <p className="text-sm text-muted-foreground">
                      Personnalisation
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Gérer
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contrôle via votre navigateur</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Vous pouvez également gérer les cookies directement depuis les
                paramètres de votre navigateur. Notez que la désactivation de
                certains cookies peut affecter le fonctionnement du site.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
