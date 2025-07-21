import { ProfessionalProfile, ClientProfile, Appointment } from "../types";

interface EmailData {
  to: string;
  subject: string;
  html: string;
}

// Template d'email de confirmation pour le client
const generateClientConfirmationEmail = (
  appointment: Appointment,
  professional: ProfessionalProfile,
  client: ClientProfile,
): EmailData => {
  const date = appointment.date.toDate();
  const formattedDate = date.toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = date.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #4f46e5; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .details { background: white; padding: 15px; margin: 10px 0; border-radius: 5px; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        .button { background: #4f46e5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 10px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Confirmation de rendez-vous</h1>
        </div>
        <div class="content">
          <p>Bonjour ${client.firstName || ""},</p>
          <p>Votre demande de rendez-vous a été enregistrée avec succès !</p>
          
          <div class="details">
            <h3>Détails du rendez-vous</h3>
            <p><strong>Service :</strong> ${appointment.service}</p>
            <p><strong>Date :</strong> ${formattedDate}</p>
            <p><strong>Heure :</strong> ${formattedTime}</p>
            <p><strong>Durée :</strong> ${appointment.duration} minutes</p>
            <p><strong>Prix :</strong> ${appointment.price}€</p>
            ${appointment.address ? `<p><strong>Adresse :</strong> ${appointment.address}</p>` : ""}
            ${appointment.notes ? `<p><strong>Notes :</strong> ${appointment.notes}</p>` : ""}
          </div>

          <div class="details">
            <h3>Professionnel</h3>
            <p><strong>Entreprise :</strong> ${professional.companyName}</p>
            <p><strong>Email :</strong> ${professional.email}</p>
            ${professional.phone ? `<p><strong>Téléphone :</strong> ${professional.phone}</p>` : ""}
            ${professional.address ? `<p><strong>Adresse :</strong> ${professional.address}</p>` : ""}
          </div>

          <p><strong>Statut :</strong> En attente de confirmation</p>
          <p>Le professionnel va prendre contact avec vous sous peu pour confirmer les détails de l'intervention.</p>
        </div>
        <div class="footer">
          <p>Cet email a été envoyé automatiquement, merci de ne pas y répondre.</p>
          <p>Rendez-vous Pro - Votre plateforme de services</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return {
    to: client.email,
    subject: `Confirmation de rendez-vous - ${appointment.service}`,
    html,
  };
};

// Template d'email de notification pour le professionnel
const generateProfessionalNotificationEmail = (
  appointment: Appointment,
  professional: ProfessionalProfile,
  client: ClientProfile,
): EmailData => {
  const date = appointment.date.toDate();
  const formattedDate = date.toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = date.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #059669; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .details { background: white; padding: 15px; margin: 10px 0; border-radius: 5px; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        .button { background: #059669; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 10px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Nouvelle demande de rendez-vous</h1>
        </div>
        <div class="content">
          <p>Bonjour,</p>
          <p>Vous avez reçu une nouvelle demande de rendez-vous sur la plateforme.</p>
          
          <div class="details">
            <h3>Détails du rendez-vous</h3>
            <p><strong>Service :</strong> ${appointment.service}</p>
            <p><strong>Date :</strong> ${formattedDate}</p>
            <p><strong>Heure :</strong> ${formattedTime}</p>
            <p><strong>Durée :</strong> ${appointment.duration} minutes</p>
            <p><strong>Prix :</strong> ${appointment.price}€</p>
            ${appointment.address ? `<p><strong>Adresse d'intervention :</strong> ${appointment.address}</p>` : ""}
            ${appointment.notes ? `<p><strong>Notes du client :</strong> ${appointment.notes}</p>` : ""}
          </div>

          <div class="details">
            <h3>Informations client</h3>
            <p><strong>Nom :</strong> ${client.firstName || ""} ${client.lastName || ""}</p>
            <p><strong>Email :</strong> ${client.email}</p>
            ${client.phone ? `<p><strong>Téléphone :</strong> ${client.phone}</p>` : ""}
            ${client.address ? `<p><strong>Adresse :</strong> ${client.address}</p>` : ""}
          </div>

          <p><strong>Action requise :</strong> Contactez le client pour confirmer les détails et finaliser le rendez-vous.</p>
        </div>
        <div class="footer">
          <p>Connectez-vous à votre espace professionnel pour gérer cette demande.</p>
          <p>Rendez-vous Pro - Votre plateforme de services</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return {
    to: professional.email,
    subject: `Nouvelle demande de rendez-vous - ${client.firstName || "Client"} ${client.lastName || ""}`,
    html,
  };
};

export const emailService = {
  // Fonction pour envoyer un email de confirmation au client
  async sendClientConfirmation(
    appointment: Appointment,
    professional: ProfessionalProfile,
    client: ClientProfile,
  ): Promise<boolean> {
    try {
      const emailData = generateClientConfirmationEmail(
        appointment,
        professional,
        client,
      );

      // En mode démo, on simule l'envoi
      console.log("📧 Email de confirmation client envoyé:", emailData);

      // Ici, on intégrerait un vrai service email comme:
      // - SendGrid
      // - Mailgun
      // - Amazon SES
      // - Resend

      // Simulation d'un délai d'envoi
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return true;
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'email client:", error);
      return false;
    }
  },

  // Fonction pour envoyer une notification au professionnel
  async sendProfessionalNotification(
    appointment: Appointment,
    professional: ProfessionalProfile,
    client: ClientProfile,
  ): Promise<boolean> {
    try {
      const emailData = generateProfessionalNotificationEmail(
        appointment,
        professional,
        client,
      );

      // En mode démo, on simule l'envoi
      console.log("📧 Email de notification professionnel envoyé:", emailData);

      // Simulation d'un délai d'envoi
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return true;
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'email professionnel:", error);
      return false;
    }
  },

  // Fonction pour envoyer les deux emails lors d'une réservation
  async sendBookingConfirmationEmails(
    appointment: Appointment,
    professional: ProfessionalProfile,
    client: ClientProfile,
  ): Promise<{ clientSent: boolean; professionalSent: boolean }> {
    const [clientSent, professionalSent] = await Promise.all([
      this.sendClientConfirmation(appointment, professional, client),
      this.sendProfessionalNotification(appointment, professional, client),
    ]);

    return { clientSent, professionalSent };
  },
};
