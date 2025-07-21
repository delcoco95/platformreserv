import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { CheckCircle, Clock, X, MoreVertical, Ban, Award } from "lucide-react";
import { appointmentService } from "../services/appointmentService";
import { Appointment } from "../types";

interface AppointmentActionsProps {
  appointment: Appointment;
  onStatusChange?: (appointmentId: string, newStatus: string) => void;
}

export function AppointmentActions({
  appointment,
  onStatusChange,
}: AppointmentActionsProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);

  const handleStatusChange = async (
    newStatus: "confirmed" | "completed" | "cancelled",
  ) => {
    if (isUpdating) return;

    setIsUpdating(true);
    try {
      await appointmentService.updateAppointmentStatus(
        appointment.id,
        newStatus,
      );
      onStatusChange?.(appointment.id, newStatus);
      setShowCancelDialog(false);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Confirmé
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
            <Clock className="h-3 w-3 mr-1" />
            En attente
          </Badge>
        );
      case "completed":
        return (
          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
            <Award className="h-3 w-3 mr-1" />
            Terminé
          </Badge>
        );
      case "cancelled":
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            <Ban className="h-3 w-3 mr-1" />
            Annulé
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const canConfirm = appointment.status === "pending";
  const canComplete = appointment.status === "confirmed";
  const canCancel =
    appointment.status === "pending" || appointment.status === "confirmed";

  return (
    <div className="flex items-center gap-2">
      {getStatusBadge(appointment.status)}

      {(canConfirm || canComplete || canCancel) && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" disabled={isUpdating}>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {canConfirm && (
              <DropdownMenuItem onClick={() => handleStatusChange("confirmed")}>
                <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                Confirmer
              </DropdownMenuItem>
            )}
            {canComplete && (
              <DropdownMenuItem onClick={() => handleStatusChange("completed")}>
                <Award className="h-4 w-4 mr-2 text-blue-600" />
                Marquer terminé
              </DropdownMenuItem>
            )}
            {canCancel && (
              <DropdownMenuItem onClick={() => setShowCancelDialog(true)}>
                <X className="h-4 w-4 mr-2 text-red-600" />
                Annuler
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Annuler le rendez-vous</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir annuler ce rendez-vous ? Cette action est
              irréversible. Le client sera automatiquement notifié de
              l'annulation.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Retour</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleStatusChange("cancelled")}
              className="bg-red-600 hover:bg-red-700"
            >
              Confirmer l'annulation
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
