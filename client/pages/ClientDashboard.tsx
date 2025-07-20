// ClientDashboard.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  updateDoc,
} from "firebase/firestore";

import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  Settings,
  Pencil,
} from "lucide-react";

export default function ClientDashboard() {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [form, setForm] = useState({ firstName: "", lastName: "", phone: "" });
  const [loading, setLoading] = useState(true);
  const [upcomingAppointments, setUpcomingAppointments] = useState<any[]>([]);
  const [pastAppointments, setPastAppointments] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      console.log("🔁 AuthStateChanged appelé", user);

      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data();
          setUserInfo(data);
          setForm({
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            phone: data.phone || "",
          });
        } else {
          console.warn("👤 Profil non trouvé dans Firestore.");
        }

        const q = query(collection(db, "appointments"), where("userId", "==", user.uid));
        const snapshot = await getDocs(q);
        const now = new Date();

        const upcoming: any[] = [];
        const past: any[] = [];

        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          const date = new Date(data.date);
          if (date >= now) upcoming.push({ id: docSnap.id, ...data });
          else past.push({ id: docSnap.id, ...data });
        });

        setUpcomingAppointments(upcoming);
        setPastAppointments(past);
      } catch (err) {
        console.error("🔥 Erreur dans le dashboard client:", err);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleUpdate = async () => {
    if (!auth.currentUser) return;
    const ref = doc(db, "users", auth.currentUser.uid);
    await updateDoc(ref, {
      firstName: form.firstName,
      lastName: form.lastName,
      phone: form.phone,
    });
    setUserInfo({ ...userInfo, ...form });
  };

  if (loading) return <p className="text-center mt-10 text-muted-foreground">Chargement...</p>;

  if (!userInfo) return <p className="text-center text-red-500">Impossible de charger le profil utilisateur.</p>;

  return (
    <div className="container max-w-4xl py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={userInfo.avatar || ""} />
            <AvatarFallback>
              {userInfo.firstName?.[0]}{userInfo.lastName?.[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">Bonjour {userInfo.firstName} 👋</h2>
            <p className="text-muted-foreground text-sm">Bienvenue sur votre espace client</p>
          </div>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline"><Pencil className="w-4 h-4 mr-2" /> Modifier</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Modifier mon profil</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Prénom</Label>
                <Input value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
              </div>
              <div>
                <Label>Nom</Label>
                <Input value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
              </div>
              <div>
                <Label>Téléphone</Label>
                <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              </div>
              <Button onClick={handleUpdate}>Enregistrer</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="upcoming">
        <TabsList className="grid grid-cols-2 w-full mb-4">
          <TabsTrigger value="upcoming">Rendez-vous à venir</TabsTrigger>
          <TabsTrigger value="past">Services reçus</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          {upcomingAppointments.length === 0 ? (
            <p className="text-muted-foreground text-center">Aucun rendez-vous à venir.</p>
          ) : (
            upcomingAppointments.map((apt) => (
              <Card key={apt.id} className="mb-4">
                <CardContent className="p-4">
                  <p className="font-semibold">{apt.service}</p>
                  <p className="text-sm text-muted-foreground">
                    {apt.date} à {apt.heure} — {apt.adresse}
                  </p>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="past">
          {pastAppointments.length === 0 ? (
            <p className="text-muted-foreground text-center">Aucun service reçu.</p>
          ) : (
            pastAppointments.map((apt) => (
              <Card key={apt.id} className="mb-4 opacity-75">
                <CardContent className="p-4">
                  <p className="font-semibold">{apt.service}</p>
                  <p className="text-sm text-muted-foreground">
                    {apt.date} à {apt.heure} — {apt.adresse}
                  </p>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
