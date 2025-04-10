"use client";

import { useEffect, useRef } from "react";

/* eslint-disable */
// Define types for HERE Maps API
declare global {
  interface Window {
    H: any;
  }
}

type ActivityMapProps = {
  coords: { lat: number; lng: number };
  radious: number;
};

const ActivityMap = ({ coords: { lat, lng }, radious }: ActivityMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<H.Map | null>(null);
  const markerRef = useRef<H.map.Marker | null>(null);
  const circleRef = useRef<H.map.Circle | null>(null);
  const platformRef = useRef<any>(null); // To hold the platform instance

  // Load HERE Maps scripts and initialize the map
  useEffect(() => {
    if (!mapRef.current) return;

    const loadScript = (src: string): Promise<void> => {
      return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.onload = () => resolve();
        document.body.appendChild(script);
      });
    };

    let isMounted = true;

    const initializeMap = async () => {
      // Load required HERE Maps scripts
      await loadScript("https://js.api.here.com/v3/3.1/mapsjs-core.js");
      await loadScript("https://js.api.here.com/v3/3.1/mapsjs-service.js");
      await loadScript("https://js.api.here.com/v3/3.1/mapsjs-ui.js");
      await loadScript("https://js.api.here.com/v3/3.1/mapsjs-mapevents.js");

      if (!isMounted) return; // Prevent running if unmounted

      const H = window.H;

      if (!H) {
        console.error("HERE Maps API not loaded");
        return;
      }

      // If map already exists, clean it up first
      if (mapInstance.current) {
        mapInstance.current.dispose();
        mapInstance.current = null;
      }

      // Initialize platform with API key
      platformRef.current = new H.service.Platform({
        apikey: process.env.NEXT_PUBLIC_HERE_API_KEY as string,
      });

      // Create default layers
      const defaultLayers = platformRef.current.createDefaultLayers();

      // Initialize the map
      mapInstance.current = new H.Map(
        mapRef.current,
        defaultLayers.vector.normal.map,
        {
          zoom: 14,
          center: { lat, lng },
        }
      );

      // Add map events for interactivity (pan/zoom)
      const behavior = new H.mapevents.Behavior(
        new H.mapevents.MapEvents(mapInstance.current)
      );

      // Add UI controls
      H.ui.UI.createDefault(mapInstance.current, defaultLayers);

      // Add a marker
      markerRef.current = new H.map.Marker({ lat, lng });
      mapInstance.current?.addObject(markerRef.current!);

      // Add a circle
      circleRef.current = new H.map.Circle({ lat, lng }, radious, {
        style: {
          strokeColor: "rgba(255, 0, 0, 0.7)",
          lineWidth: 2,
          fillColor: "rgba(0, 255, 0, 0.3)",
        },
      });
      mapInstance.current?.addObject(circleRef.current!);
    };

    initializeMap().catch((error) =>
      console.error("Error initializing map:", error)
    );

    // Cleanup function runs before the next effect or on unmount
    return () => {
      isMounted = false;
      if (mapInstance.current) {
        mapInstance.current.dispose();
        mapInstance.current = null;
      }
    };
  }, []); // Empty dependency array to run only once on mount

  // Update map center, marker, and circle when coords change
  useEffect(() => {
    if (!mapInstance.current || !markerRef.current || !circleRef.current)
      return;

    // Update map center
    mapInstance.current.setCenter({ lat, lng });

    // Update marker position
    markerRef.current.setGeometry({ lat, lng });

    // Update circle position
    circleRef.current.setCenter({ lat, lng });
  }, [lat, lng]); // Depend on lat and lng to update when props change

  return <div ref={mapRef} style={{ width: "100%", height: "500px" }} />;
};

export default ActivityMap;
