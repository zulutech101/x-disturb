import { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "@/app/firebase/config";

type ZoneActivity = {
  id: string;
  userID: string;
  userName: string;
  zoneID: string;
  zoneName: string;
  activity: string;
  timestamp: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
};
export const useZoneActivities = () => {
    const [activities, setActivities] = useState<ZoneActivity[]>([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const q = query(collection(db, "zone_activities"), orderBy("timestamp", "desc"));
      const unsub = onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map((doc) => {
          const d = doc.data();
          return {
            id: doc.id,
            userID: d.userID,
            userName: d.userName,
            zoneID: d.zoneID,
            zoneName: d.zoneName,
            activity: d.activity,
            timestamp: new Date(d.timestamp?.seconds * 1000).toLocaleTimeString(),
            coordinates: d.coordinates,
          };
        });
        setActivities(data);
        setLoading(false);
      });
  
      return () => unsub();
    }, []);
  
    return { activities, loading };
  };
  
