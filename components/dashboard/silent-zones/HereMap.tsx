"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, MapPin, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import AddressField from "./AddressSuggestion";
/* eslint-disable */
// Define types for HERE Maps API
declare global {
  interface Window {
    H: any;
  }
}

type HereMapProps = {
  onCoordinatesChange: (coords: { lat: string; lng: string }) => void;
  radius: number; // Assuming this is intended to be "radius"
};

const HereMap = ({ onCoordinatesChange, radius }: HereMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [coordinates, setCoordinates] = useState<{
    lat: string | null;
    lng: string | null;
  }>({
    lat: null,
    lng: null,
  });

  console.log({ radius });

  const updateCoordinates = (coord: { lat: string; lng: string }) => {
    setCoordinates(coord);
    onCoordinatesChange(coord);
  };
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [map, setMap] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isMapLoading, setIsMapLoading] = useState<boolean>(true);
  const markersRef = useRef<any[]>([]);
  const circleRef = useRef<any>(null); // Reference to the circle object

  const apikey: string = process.env.NEXT_PUBLIC_HERE_API_KEY || "";

  // Load HERE Maps scripts
  useEffect(() => {
    if (!apikey) {
      setError("API key is missing. Please check your environment variables.");
      setIsMapLoading(false);
      return;
    }

    setIsMapLoading(true);

    // Function to initialize map after scripts are loaded
    const initMap = () => {
      if (!mapRef.current || !window.H) return;

      try {
        const H = window.H;
        const platform = new H.service.Platform({ apikey });
        const defaultLayers = platform.createDefaultLayers();

        const hereMap = new H.Map(
          mapRef.current,
          defaultLayers.vector.normal.map,
          {
            center: { lat: 9.0572, lng: 38.7592 },
            zoom: 14,
            pixelRatio: window.devicePixelRatio || 1,
          }
        );

        const mapEvents = new H.mapevents.MapEvents(hereMap);
        new H.mapevents.Behavior(mapEvents);

        H.ui.UI.createDefault(hereMap, defaultLayers);

        hereMap.addEventListener("tap", (evt: any) => {
          const coord = hereMap.screenToGeo(
            evt.currentPointer.viewportX,
            evt.currentPointer.viewportY
          );

          if (coord) {
            // Update coordinates for UI
            updateCoordinates({
              lat: coord.lat.toFixed(6),
              lng: coord.lng.toFixed(6),
            });

            // Clear previous markers and circle
            if (markersRef.current.length > 0) {
              hereMap.removeObjects(markersRef.current);
              markersRef.current = [];
            }
            if (circleRef.current) {
              hereMap.removeObject(circleRef.current);
              circleRef.current = null;
            }

            // Add marker using raw float values
            const marker = new H.map.Marker(coord);
            hereMap.addObject(marker);
            markersRef.current.push(marker);

            // Add circle centered on the marker
            const circle = new H.map.Circle(
              coord,
              radius, // Use the radius prop (in meters)
              {
                style: {
                  strokeColor: "rgba(255, 0, 0, 0.7)", // Red outline
                  lineWidth: 2,
                  fillColor: "rgba(0, 255, 0, 0.3)", // Green fill with transparency
                },
              }
            );
            hereMap.addObject(circle);
            circleRef.current = circle;
          }
        });

        setMap(hereMap);
        setIsMapLoading(false);
      } catch (err) {
        console.error("Map initialization error:", err);
        setError(
          `Map initialization failed: ${
            err instanceof Error ? err.message : String(err)
          }`
        );
        setIsMapLoading(false);
      }
    };

    // Load scripts in sequence with callbacks
    const loadScript = (url: string, callback: () => void) => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = url;
      script.onload = callback;
      script.onerror = () => {
        setError("Failed to load HERE Maps scripts. Please try again later.");
        setIsMapLoading(false);
      };
      document.head.appendChild(script);
    };

    // Load CSS
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://js.api.here.com/v3/3.1/mapsjs-ui.css";
    document.head.appendChild(link);

    // Load scripts in sequence
    loadScript("https://js.api.here.com/v3/3.1/mapsjs-core.js", () => {
      loadScript("https://js.api.here.com/v3/3.1/mapsjs-service.js", () => {
        loadScript("https://js.api.here.com/v3/3.1/mapsjs-ui.js", () => {
          loadScript(
            "https://js.api.here.com/v3/3.1/mapsjs-mapevents.js",
            () => {
              // All scripts loaded, initialize map
              setTimeout(() => {
                if (window.H) {
                  initMap();
                } else {
                  setError(
                    "HERE Maps API failed to initialize. Please refresh the page."
                  );
                  setIsMapLoading(false);
                }
              }, 100); // Small delay to ensure scripts are fully initialized
            }
          );
        });
      });
    });

    return () => {
      if (map) {
        map.dispose();
      }
    };
  }, [apikey]);

  // Update circle radius when radius prop changes
  useEffect(() => {
    if (!map || !circleRef.current) return;

    circleRef.current.setRadius(radius); // Update the circle's radius dynamically
  }, [radius, map]);

  // Use direct REST API for geocoding instead of the service API
  const handleSearch = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent any bubbling weirdness

    if (!searchQuery || !map) return;

    setIsLoading(true);
    setError(null);

    try {
      // Use the REST API directly
      const encodedQuery = encodeURIComponent(searchQuery);
      const url = `https://geocode.search.hereapi.com/v1/geocode?q=${encodedQuery}&apiKey=${apikey}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `Geocoding request failed with status: ${response.status}`
        );
      }

      const data = await response.json();

      if (data.items && data.items.length > 0) {
        const position = data.items[0].position;
        updateCoordinates({
          lat: position.lat.toFixed(6),
          lng: position.lng.toFixed(6),
        });

        map.setCenter({ lat: position.lat, lng: position.lng });
        map.setZoom(14);

        // Clear previous markers and circle
        if (markersRef.current.length > 0) {
          map.removeObjects(markersRef.current);
          markersRef.current = [];
        }
        if (circleRef.current) {
          map.removeObject(circleRef.current);
          circleRef.current = null;
        }

        // Add new marker
        const marker = new window.H.map.Marker(position);
        map.addObject(marker);
        markersRef.current.push(marker);

        // Add circle centered on the marker
        const circle = new window.H.map.Circle(
          position,
          radius, // Use the radius prop (in meters)
          {
            style: {
              strokeColor: "rgba(255, 0, 0, 0.7)",
              lineWidth: 2,
              fillColor: "rgba(0, 255, 0, 0.3)",
            },
          }
        );
        map.addObject(circle);
        circleRef.current = circle;
      } else {
        setError("No results found for your search query.");
      }
    } catch (error) {
      console.error("Search error:", error);
      setError(
        `Search failed: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full mx-auto shadow-lg">
      <CardContent>
        <div
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleSearch(e as any); // Only if you want to reuse the logic, or call handleSearch directly on button click
          }}
          className="flex gap-2 mb-4"
        >
          <div className="flex-1">
            <AddressField
              value={searchQuery}
              onSelect={(selected) => {
                setSearchQuery(selected);
                handleSearch({
                  preventDefault: () => {},
                  stopPropagation: () => {},
                } as any);
              }}
            />
          </div>

          <Button
            type="button"
            onClick={handleSearch}
            disabled={isLoading || isMapLoading || !searchQuery}
            className="bg-[#E66641] text-white"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Search className="h-4 w-4 mr-2 " />
            )}
            Search
          </Button>
        </div>

        <div
          className={cn(
            "relative w-full h-[400px] bg-slate-100 rounded-md overflow-hidden",
            isMapLoading && "flex items-center justify-center"
          )}
        >
          {isMapLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-100 bg-opacity-80 z-10">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2">Loading map...</span>
            </div>
          )}
          <div ref={mapRef} className="w-full h-full" />
        </div>

        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {coordinates.lat && coordinates.lng && (
          <div className="mt-4 p-3 bg-slate-50 rounded-md flex items-center justify-center gap-4">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1 text-primary" />
              <span className="text-sm font-medium">
                Lat: {coordinates.lat}
              </span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1 text-primary" />
              <span className="text-sm font-medium">
                Lng: {coordinates.lng}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HereMap;
