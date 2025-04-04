"use client";

import { useEffect, useRef, useState } from "react";
import H from "@here/maps-api-for-javascript";

const HereMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [coordinates, setCoordinates] = useState<{
    lat: string | null;
    lng: string | null;
  }>({ lat: null, lng: null });
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [map, setMap] = useState<H.Map | null>(null);
  const [error, setError] = useState<string | null>(null);

  const apikey: string = process.env.NEXT_PUBLIC_HERE_API_KEY || "";

  useEffect(() => {
    if (!mapRef.current) return;
    if (!apikey) {
      setError("API key is missing. Please check your environment variables.");
      return;
    }

    try {
      // Initialize the platform
      const platform = new H.service.Platform({
        apikey: apikey,
      });

      // Get default map layers
      const defaultLayers = platform.createDefaultLayers();

      // Check if layers are properly initialized
      if (!defaultLayers.vector?.normal?.map) {
        setError("Failed to load map layers");
        return;
      }

      // Initialize the map
      const hereMap = new H.Map(
        mapRef.current,
        defaultLayers.vector.normal.map,
        {
          center: { lat: 9, lng: 38 },
          zoom: 13,
          pixelRatio: window.devicePixelRatio || 1,
        }
      );

      // Enable map interactions
      const mapEvents = new H.mapevents.MapEvents(hereMap);
      const behavior = new H.mapevents.Behavior(mapEvents);

      // Add UI controls
      const ui = H.ui.UI.createDefault(hereMap, defaultLayers);

      // Add click event
      hereMap.addEventListener("tap", (evt: H.mapevents.Event) => {
        const coord = hereMap.screenToGeo(
          (evt.currentPointer as H.util.Event).viewportX,
          (evt.currentPointer as H.util.Event).viewportY
        );
        if (coord) {
          setCoordinates({
            lat: coord.lat.toFixed(6),
            lng: coord.lng.toFixed(6),
          });
          const marker = new H.map.Marker({ lat: coord.lat, lng: coord.lng });
          hereMap.addObject(marker);
        }
      });

      setMap(hereMap);

      // Cleanup
      return () => {
        hereMap.dispose();
      };
    } catch (err) {
      setError(
        `Map initialization failed: ${
          err instanceof Error ? err.message : String(err)
        }`
      );
      console.error("Map error:", err);
    }
  }, [mapRef, apikey]);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchQuery || !map || !apikey) return;

    const platform = new H.service.Platform({ apikey });
    const service = platform.getSearchService();

    try {
      const result = await new Promise<H.service.ServiceResult>(
        (resolve, reject) => {
          service.geocode({ q: searchQuery }, resolve, reject);
        }
      );

      if (result.items.length > 0) {
        const position = result.items[0].position;
        setCoordinates({
          lat: position.lat.toFixed(6),
          lng: position.lng.toFixed(6),
        });
        map.setCenter({ lat: position.lat, lng: position.lng });
        map.setZoom(14);
        const marker = new H.map.Marker(position);
        map.addObject(marker);
      }
    } catch (error) {
      console.error("Search error:", error);
      setError("Search failed. Please try again.");
    }
  };

  return (
    <div style={{ width: "100%", maxWidth: "800px", margin: "0 auto" }}>
      <form onSubmit={handleSearch} style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchQuery(e.target.value)
          }
          placeholder="Search location..."
          style={{
            padding: "0.5rem",
            width: "70%",
            marginRight: "0.5rem",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#0078d4",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </form>

      <div
        ref={mapRef}
        style={{
          width: "100%",
          height: "400px",
          background: "#e0e0e0",
        }}
      />

      {coordinates.lat && coordinates.lng && (
        <div style={{ marginTop: "1rem", textAlign: "center" }}>
          <p>Latitude: {coordinates.lat}</p>
          <p>Longitude: {coordinates.lng}</p>
        </div>
      )}

      {error && (
        <div style={{ color: "red", marginTop: "1rem", textAlign: "center" }}>
          {error}
        </div>
      )}
    </div>
  );
};

export default HereMap;
