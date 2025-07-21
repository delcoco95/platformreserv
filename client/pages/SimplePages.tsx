import { Button } from "../components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface SimplePageProps {
  title: string;
  content: React.ReactNode;
}

function SimplePage({ title, content }: SimplePageProps) {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gray-50 py-12">
        <div className="container max-w-4xl mx-auto px-4">
          <Button variant="outline" className="mb-6" asChild>
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour à l'accueil
            </Link>
          </Button>

          <h1 className="text-4xl font-bold text-foreground mb-4">{title}</h1>
        </div>
      </section>

      <section className="py-12">
        <div className="container max-w-4xl mx-auto px-4">{content}</div>
      </section>
    </div>
  );
}

export function Guarantees() {
  return (
    <SimplePage
      title="Nos garanties"
      content={
        <div className="prose prose-gray max-w-none">
          <h2>Satisfaction garantie</h2>
          <p>
            Chez RendezVousPro, votre satisfaction est notre priorité. Nous nous
            engageons à vous offrir des services de qualité avec des
            professionnels vérifiés.
          </p>

          <h3>Garantie de qualité</h3>
          <ul>
            <li>Tous nos professionnels sont vérifiés et assurés</li>
            <li>Satisfaction client garantie ou remboursé</li>
            <li>Service client disponible 7j/7</li>
            <li>Médiation en cas de litige</li>
          </ul>

          <h3>Sécurité des paiements</h3>
          <p>
            Vos transactions sont sécurisées. Le paiement s'effectue directement
            avec le professionnel après la prestation.
          </p>

          <h3>Protection des données</h3>
          <p>
            Vos données personnelles sont protégées conformément au RGPD. Nous
            ne les partageons qu'avec le professionnel choisi.
          </p>
        </div>
      }
    />
  );
}

export function Coverage() {
  return (
    <SimplePage
      title="Zone de couverture"
      content={
        <div className="prose prose-gray max-w-none">
          <h2>Où intervenons-nous ?</h2>
          <p>
            RendezVousPro couvre l'ensemble du territoire français métropolitain
            avec un réseau de professionnels qualifiés.
          </p>

          <h3>Principales zones couvertes</h3>
          <ul>
            <li>Île-de-France (Paris et banlieue)</li>
            <li>Lyon et région Rhône-Alpes</li>
            <li>Marseille et région PACA</li>
            <li>Toulouse et région Occitanie</li>
            <li>Bordeaux et Nouvelle-Aquitaine</li>
            <li>Lille et Hauts-de-France</li>
            <li>Nantes et Pays de la Loire</li>
            <li>Strasbourg et Grand Est</li>
          </ul>

          <p>
            Notre réseau s'étend également dans les villes moyennes et zones
            périurbaines. Vérifiez la disponibilité des professionnels dans
            votre secteur en effectuant une recherche sur notre plateforme.
          </p>
        </div>
      }
    />
  );
}

export function Help() {
  return (
    <SimplePage
      title="Aide et support"
      content={
        <div className="prose prose-gray max-w-none">
          <h2>Comment pouvons-nous vous aider ?</h2>

          <h3>Guides d'utilisation</h3>
          <ul>
            <li>
              <Link
                to="/comment-ca-marche"
                className="text-primary hover:underline"
              >
                Comment ça marche ?
              </Link>
            </li>
            <li>
              <Link to="/faq" className="text-primary hover:underline">
                Questions fréquentes
              </Link>
            </li>
            <li>Guide de réservation</li>
            <li>Gérer son compte client</li>
          </ul>

          <h3>Contactez-nous</h3>
          <div className="not-prose grid md:grid-cols-2 gap-6 my-6">
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">Service client</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Du lundi au vendredi, 9h-18h
              </p>
              <p className="text-sm">📞 01 23 45 67 89</p>
              <p className="text-sm">✉️ support@rendezvoupro.fr</p>
            </div>
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">Urgences</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Pour les professionnels
              </p>
              <p className="text-sm">📞 01 23 45 67 90</p>
              <p className="text-sm">✉️ urgence@rendezvoupro.fr</p>
            </div>
          </div>

          <h3>Professionnels</h3>
          <p>
            Vous êtes un professionnel et souhaitez rejoindre notre plateforme ?
            <Link
              to="/inscription"
              className="text-primary hover:underline ml-1"
            >
              Inscrivez-vous ici
            </Link>
          </p>
        </div>
      }
    />
  );
}

export function Privacy() {
  return (
    <SimplePage
      title="Politique de confidentialité"
      content={
        <div className="prose prose-gray max-w-none">
          <h2>Protection de vos données personnelles</h2>

          <h3>Données collectées</h3>
          <p>
            Nous collectons uniquement les données nécessaires au fonctionnement
            de notre service : nom, email, numéro de téléphone, adresse pour les
            interventions.
          </p>

          <h3>Utilisation des données</h3>
          <ul>
            <li>Mise en relation avec les professionnels</li>
            <li>Gestion des rendez-vous</li>
            <li>Amélioration de nos services</li>
            <li>Communication sur nos offres (avec votre accord)</li>
          </ul>

          <h3>Partage des données</h3>
          <p>
            Vos données ne sont partagées qu'avec le professionnel que vous
            choisissez, et uniquement dans le cadre de la prestation. Nous ne
            vendons jamais vos données à des tiers.
          </p>

          <h3>Vos droits</h3>
          <p>
            Conformément au RGPD, vous disposez d'un droit d'accès, de
            rectification, de suppression et de portabilité de vos données.
            Contactez-nous à dpo@rendezvoupro.fr pour exercer ces droits.
          </p>

          <p className="text-sm text-muted-foreground">
            Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
          </p>
        </div>
      }
    />
  );
}

export function Terms() {
  return (
    <SimplePage
      title="Conditions d'utilisation"
      content={
        <div className="prose prose-gray max-w-none">
          <h2>Conditions générales d'utilisation</h2>

          <h3>Objet</h3>
          <p>
            Les présentes conditions générales régissent l'utilisation de la
            plateforme RendezVousPro, service de mise en relation entre clients
            et professionnels.
          </p>

          <h3>Inscription</h3>
          <p>
            L'inscription est gratuite pour les clients. Les informations
            fournies doivent être exactes et à jour. Vous vous engagez à
            maintenir la confidentialité de vos identifiants de connexion.
          </p>

          <h3>Utilisation du service</h3>
          <ul>
            <li>Utilisation conforme à l'objet de la plateforme</li>
            <li>Respect des professionnels et autres utilisateurs</li>
            <li>Interdiction de tout usage frauduleux</li>
            <li>Respect des prix et conditions fixés par les professionnels</li>
          </ul>

          <h3>Responsabilités</h3>
          <p>
            RendezVousPro agit en qualité d'intermédiaire. La responsabilité des
            prestations incombe aux professionnels. Nous nous efforçons de
            vérifier la qualité de nos partenaires mais ne garantissons pas les
            résultats.
          </p>

          <h3>Annulation et modifications</h3>
          <p>
            Les annulations et modifications sont possibles selon les conditions
            définies par chaque professionnel. Des frais peuvent s'appliquer en
            cas d'annulation tardive.
          </p>

          <h3>Droit applicable</h3>
          <p>
            Les présentes conditions sont soumises au droit français. En cas de
            litige, les tribunaux français sont compétents.
          </p>

          <p className="text-sm text-muted-foreground">
            Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
          </p>
        </div>
      }
    />
  );
}
