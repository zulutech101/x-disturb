export type ZoneActivity = {
    userID: string;
    userName: string;
    zoneID: string;
    zoneName: string;
    activity: "Entered Zone" | "Exited Zone" | "Inside Zone";
    timestamp: Date;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  