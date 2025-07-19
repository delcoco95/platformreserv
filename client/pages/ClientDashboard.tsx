import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";

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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Settings,
  X,
  Phone,
  Mail,
  Car,
  Wrench,
  Key,
} from "lucide-react";

export default function ClientDashboard() {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [upcomingAppointments, setUpcomingAppointments] = useState<any[]>([]);
  const [pastAppointments, setPastAppointments] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const userData = userSnap.data();
          setUserInfo(userData);

          // 🔍 Récupérer les rendez-vous du client
          const q = query(
            collection(db, "appointments"),
            where("userId", "==", user.uid)
          );

          const querySnapshot = await getDocs(q);
          const upcoming: any[] = [];
          const past: any[] = [];

          const now = new Date();

          querySnapshot.forEach((doc) => {
            const rdv = doc.data();
            const rdvDate = new Date(rdv.date); // format ISO requis en base
            if (rdvDate >= now) {
              upcoming.push({ id: doc.id, ...rdv });
            } else {
              past.push({ id: doc.id, ...rdv });
            }
          });

          setUpcomingAppointments(upcoming);
          setPastAppointments(past);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-4">Bonjour {userInfo?.firstName}</h1>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upcoming">À venir</TabsTrigger>
          <TabsTrigger value="history">Historique</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="mt-4">
          {loading ? (
            <p className="text-center text-muted-foreground">Chargement...</p>
          ) : upcomingAppointments.length === 0 ? (
            <p className="text-center text-muted-foreground">
              Aucun rendez-vous à venir.
            </p>
          ) : (
            upcomingAppointments.map((rdv) => (
              <Card key={rdv.id}>
                <CardContent className="p-4">
                  <p className="font-semibold">{rdv.service}</p>
                  <p className="text-sm">{rdv.date} à {rdv.heure}</p>
                  <p className="text-sm text-muted-foreground">{rdv.adresse}</p>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="history" className="mt-4">
          {loading ? (
            <p className="text-center text-muted-foreground">Chargement...</p>
          ) : pastAppointments.length === 0 ? (
            <p className="text-center text-muted-foreground">
              Aucun rendez-vous passé.
            </p>
          ) : (
            pastAppointments.map((rdv) => (
              <Card key={rdv.id}>
                <CardContent className="p-4">
                  <p className="font-semibold">{rdv.service}</p>
                  <p className="text-sm">{rdv.date} à {rdv.heure}</p>
                  <p className="text-sm text-muted-foreground">{rdv.adresse}</p>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
