import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { ArrowLeft, Building, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export default function LegalNotice() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gray-50 py-12">
        <div className="container max-w-4xl mx-auto px-4">
          <Button variant="outline" className="mb-6" asChild>
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour à l'accueil
            </Link>
          </Button>
          
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Mentions légales
          </h1>
          <p className="text-lg text-muted-foreground">
            Informations légales et réglementaires de la plateforme RendezVousPro
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container max-w-4xl mx-auto px-4 space-y-8">
          
          {/* Éditeur du site */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Éditeur du site
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">RendezVousPro SAS</h3>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>123 Avenue des Champs-Élysées, 75008 Paris, France</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>01 23 45 67 89</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>contact@rendezvoupro.fr</span>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-sm"><strong>Forme juridique :</strong> Société par Actions Simplifiée (SAS)</p>
                <p className="text-sm"><strong>Capital social :</strong> 50 000 €</p>
                <p className="text-sm"><strong>RCS :</strong> Paris B 123 456 789</p>
                <p className="text-sm"><strong>SIRET :</strong> 123 456 789 00012</p>
                <p className="text-sm"><strong>TVA intracommunautaire :</strong> FR12 123456789</p>
              </div>
            </CardContent>
          </Card>

          {/* Directeur de publication */}
          <Card>
            <CardHeader>
              <CardTitle>Directeur de la publication</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">M. Jean Dupont, Président de RendezVousPro SAS</p>
            </CardContent>
          </Card>

          {/* Hébergement */}
          <Card>
            <CardHeader>
              <CardTitle>Hébergement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm"><strong>Hébergeur :</strong> Vercel Inc.</p>
              <p className="text-sm"><strong>Adresse :</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis</p>
              <p className="text-sm"><strong>Site web :</strong> <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://vercel.com</a></p>
            </CardContent>
          </Card>

          {/* Propriété intellectuelle */}
          <Card>
            <CardHeader>
              <CardTitle>Propriété intellectuelle</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">
                L'ensemble du contenu de ce site (textes, images, logos, bases de données, etc.) est protégé par les droits de propriété intellectuelle et appartient à RendezVousPro SAS ou à ses partenaires.
              </p>
              <p className="text-sm">
                Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de RendezVousPro SAS.
              </p>
              <p className="text-sm">
                L'exploitation non autorisée du site ou de l'un quelconque des éléments qu'il contient sera considérée comme constitutive d'une contrefaçon et poursuivie conformément aux dispositions des articles L.335-2 et suivants du Code de Propriété Intellectuelle.
              </p>
            </CardContent>
          </Card>

          {/* Responsabilité */}
          <Card>
            <CardHeader>
              <CardTitle>Limitation de responsabilité</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">
                RendezVousPro SAS met tout en œuvre pour offrir aux utilisateurs des informations et/ou des outils disponibles et vérifiés, mais ne saurait être tenue pour responsable des erreurs, d'une absence de disponibilité des informations et/ou de la présence de virus sur son site.
              </p>
              <p className="text-sm">
                En tant qu'intermédiaire, RendezVousPro SAS n'est pas responsable de la qualité des services fournis par les professionnels référencés sur la plateforme. La responsabilité de RendezVousPro SAS ne saurait être engagée en raison des prestations fournies par les professionnels.
              </p>
            </CardContent>
          </Card>

          {/* Protection des données */}
          <Card>
            <CardHeader>
              <CardTitle>Protection des données personnelles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">
                Conformément à la loi « informatique et libertés » du 6 janvier 1978 modifiée et au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification, de suppression et de portabilité de vos données personnelles.
              </p>
              <p className="text-sm">
                Pour exercer ces droits ou pour toute question sur le traitement de vos données, vous pouvez nous contacter à l'adresse : <a href="mailto:dpo@rendezvoupro.fr" className="text-primary hover:underline">dpo@rendezvoupro.fr</a>
              </p>
              <p className="text-sm">
                Pour plus d'informations, consultez notre <Link to="/confidentialite" className="text-primary hover:underline">politique de confidentialité</Link>.
              </p>
            </CardContent>
          </Card>

          {/* Droit applicable */}
          <Card>
            <CardHeader>
              <CardTitle>Droit applicable et juridiction</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Les présentes mentions légales sont soumises au droit français. En cas de litige, et à défaut de résolution amiable, les tribunaux français seront seuls compétents.
              </p>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle>Contact</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">
                Pour toute question concernant ces mentions légales, vous pouvez nous contacter :
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4" />
                  <a href="mailto:legal@rendezvoupro.fr" className="text-primary hover:underline">legal@rendezvoupro.fr</a>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4" />
                  <span>01 23 45 67 89</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center text-sm text-muted-foreground">
            <p>Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
