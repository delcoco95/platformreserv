import React, { useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Alert, AlertDescription } from "../ui/alert";
import { Send, AlertCircle, Loader2 } from "lucide-react";
import { messageService } from "../../services/messageService";

interface QuickMessageModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  receiverId: string;
  receiverName: string;
  appointmentSubject?: string;
}

export const QuickMessageModal = ({
  open,
  onOpenChange,
  receiverId,
  receiverName,
  appointmentSubject,
}: QuickMessageModalProps) => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;

    setLoading(true);
    setError("");

    try {
      await messageService.sendMessage(receiverId, message.trim());
      setSuccess(true);
      setMessage("");
      
      // Fermer le modal après un court délai
      setTimeout(() => {
        onOpenChange(false);
        setSuccess(false);
      }, 1500);
    } catch (error) {
      console.error("Erreur lors de l'envoi du message:", error);
      setError("Impossible d'envoyer le message. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setMessage("");
    setError("");
    setSuccess(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Envoyer un message</DialogTitle>
          <DialogDescription>
            Message à {receiverName}
            {appointmentSubject && (
              <span className="block text-sm text-muted-foreground mt-1">
                Concernant: {appointmentSubject}
              </span>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success ? (
            <Alert>
              <Send className="h-4 w-4" />
              <AlertDescription>Message envoyé avec succès !</AlertDescription>
            </Alert>
          ) : (
            <div className="space-y-2">
              <Textarea
                placeholder="Tapez votre message ici..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                disabled={loading}
                className="resize-none"
              />
              <p className="text-xs text-muted-foreground">
                {message.length}/500 caractères
              </p>
            </div>
          )}
        </div>

        {!success && (
          <DialogFooter>
            <Button variant="outline" onClick={handleClose} disabled={loading}>
              Annuler
            </Button>
            <Button 
              onClick={handleSend} 
              disabled={!message.trim() || loading || message.length > 500}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Envoi...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Envoyer
                </>
              )}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};
