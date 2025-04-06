// "use client";

// import { useEffect, useRef, useState } from "react";
// import H from "@here/maps-api-for-javascript";

// const HereMap: React.FC = () => {
//   const mapRef = useRef<HTMLDivElement>(null);
//   const [coordinates, setCoordinates] = useState<{
//     lat: string | null;
//     lng: string | null;
//   }>({ lat: null, lng: null });
//   const [searchQuery, setSearchQuery] = useState<string>("");
//   const [map, setMap] = useState<H.Map | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   const apikey: string = process.env.NEXT_PUBLIC_HERE_API_KEY || "";

//   useEffect(() => {
//     if (!mapRef.current) return;
//     if (!apikey) {
//       setError("API key is missing. Please check your environment variables.");
//       return;
//     }

//     try {
//       // Initialize the platform
//       const platform = new H.service.Platform({
//         apikey: apikey,
//       });

//       // Get default map layers
//       const defaultLayers = platform.createDefaultLayers();

//       // Check if layers are properly initialized
//       if (!defaultLayers.vector?.normal?.map) {
//         setError("Failed to load map layers");
//         return;
//       }

//       // Initialize the map
//       const hereMap = new H.Map(
//         mapRef.current,
//         defaultLayers.vector.normal.map,
//         {
//           center: { lat: 9, lng: 38 },
//           zoom: 13,
//           pixelRatio: window.devicePixelRatio || 1,
//         }
//       );

//       // Enable map interactions
//       const mapEvents = new H.mapevents.MapEvents(hereMap);
//       const behavior = new H.mapevents.Behavior(mapEvents);

//       // Add UI controls
//       const ui = H.ui.UI.createDefault(hereMap, defaultLayers);

//       // Add click event
//       hereMap.addEventListener("tap", (evt: H.mapevents.Event) => {
//         const coord = hereMap.screenToGeo(
//           (evt.currentPointer as H.util.Event).viewportX,
//           (evt.currentPointer as H.util.Event).viewportY
//         );
//         if (coord) {
//           setCoordinates({
//             lat: coord.lat.toFixed(6),
//             lng: coord.lng.toFixed(6),
//           });
//           const marker = new H.map.Marker({ lat: coord.lat, lng: coord.lng });
//           hereMap.addObject(marker);
//         }
//       });

//       setMap(hereMap);

//       // Cleanup
//       return () => {
//         hereMap.dispose();
//       };
//     } catch (err) {
//       setError(
//         `Map initialization failed: ${
//           err instanceof Error ? err.message : String(err)
//         }`
//       );
//       console.error("Map error:", err);
//     }
//   }, [mapRef, apikey]);

//   const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!searchQuery || !map || !apikey) return;

//     const platform = new H.service.Platform({ apikey });
//     const service = platform.getSearchService();

//     try {
//       const result = await new Promise<H.service.ServiceResult>(
//         (resolve, reject) => {
//           service.geocode({ q: searchQuery }, resolve, reject);
//         }
//       );

//       if (result.items.length > 0) {
//         const position = result.items[0].position;
//         setCoordinates({
//           lat: position.lat.toFixed(6),
//           lng: position.lng.toFixed(6),
//         });
//         map.setCenter({ lat: position.lat, lng: position.lng });
//         map.setZoom(14);
//         const marker = new H.map.Marker(position);
//         map.addObject(marker);
//       }
//     } catch (error) {
//       console.error("Search error:", error);
//       setError("Search failed. Please try again.");
//     }
//   };

//   return (
//     <div style={{ width: "100%", maxWidth: "800px", margin: "0 auto" }}>
//       <form onSubmit={handleSearch} style={{ marginBottom: "1rem" }}>
//         <input
//           type="text"
//           value={searchQuery}
//           onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//             setSearchQuery(e.target.value)
//           }
//           placeholder="Search location..."
//           style={{
//             padding: "0.5rem",
//             width: "70%",
//             marginRight: "0.5rem",
//           }}
//         />
//         <button
//           type="submit"
//           style={{
//             padding: "0.5rem 1rem",
//             backgroundColor: "#0078d4",
//             color: "white",
//             border: "none",
//             cursor: "pointer",
//           }}
//         >
//           Search
//         </button>
//       </form>

//       <div
//         ref={mapRef}
//         style={{
//           width: "100%",
//           height: "400px",
//           background: "#e0e0e0",
//         }}
//       />

//       {coordinates.lat && coordinates.lng && (
//         <div style={{ marginTop: "1rem", textAlign: "center" }}>
//           <p>Latitude: {coordinates.lat}</p>
//           <p>Longitude: {coordinates.lng}</p>
//         </div>
//       )}

//       {error && (
//         <div style={{ color: "red", marginTop: "1rem", textAlign: "center" }}>
//           {error}
//         </div>
//       )}
//     </div>
//   );
// };

// export default HereMap;

"use client";

import { useEffect, useRef, useState } from "react";
import H from "@here/maps-api-for-javascript";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Shadcn Select components
import { Input } from "@/components/ui/input"; // Shadcn Input component
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

const HereMap: React.FC = () => {
  const [open, setOpen] = useState(false);

  const mapRef = useRef<HTMLDivElement>(null);
  const [coordinates, setCoordinates] = useState<{
    lat: string | null;
    lng: string | null;
  }>({ lat: null, lng: null });
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [map, setMap] = useState<H.Map | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<
    { label: string; lat: number; lng: number }[]
  >([]); // Store top 5 search results

  const apikey: string = process.env.NEXT_PUBLIC_HERE_API_KEY || "";

  useEffect(() => {
    if (!mapRef.current) return;
    if (!apikey) {
      setError("API key is missing. Please check your environment variables.");
      return;
    }

    try {
      const platform = new H.service.Platform({ apikey });
      const defaultLayers = platform.createDefaultLayers();

      if (!defaultLayers.vector?.normal?.map) {
        setError("Failed to load map layers");
        return;
      }

      const hereMap = new H.Map(
        mapRef.current,
        defaultLayers.vector.normal.map,
        {
          center: { lat: 9, lng: 38 },
          zoom: 13,
          pixelRatio: window.devicePixelRatio || 1,
        }
      );

      const mapEvents = new H.mapevents.MapEvents(hereMap);
      const behavior = new H.mapevents.Behavior(mapEvents);
      const ui = H.ui.UI.createDefault(hereMap, defaultLayers);

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

  // Handle search input changes and fetch top 5 results
  useEffect(() => {
    if (!searchQuery || !map || !apikey) {
      setSearchResults([]);
      return;
    }

    const platform = new H.service.Platform({ apikey });
    const service = platform.getSearchService();

    const fetchResults = async () => {
      try {
        const result = await new Promise<H.service.ServiceResult>(
          (resolve, reject) => {
            service.geocode({ q: searchQuery, limit: 5 }, resolve, reject); // Limit to top 5
          }
        );

        if (result.items.length > 0) {
          const topResults = result.items.slice(0, 5).map((item) => ({
            label: item.title,
            lat: item.position.lat,
            lng: item.position.lng,
          }));
          setSearchResults(topResults);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.error("Search error:", error);
        setError("Search failed. Please try again.");
        setSearchResults([]);
      }
    };

    // Debounce the search to avoid too many API calls
    const timeout = setTimeout(fetchResults, 300);
    return () => clearTimeout(timeout);
  }, [searchQuery, map, apikey]);

  // Handle selection from the dropdown
  const handleSelect = (value: string) => {
    const selected = searchResults.find((result) => result.label === value);
    if (selected && map) {
      setCoordinates({
        lat: selected.lat.toFixed(6),
        lng: selected.lng.toFixed(6),
      });
      map.setCenter({ lat: selected.lat, lng: selected.lng });
      map.setZoom(14);
      const marker = new H.map.Marker({
        lat: selected.lat,
        lng: selected.lng,
      });
      map.addObject(marker);
    }
  };

  return (
    <div style={{ width: "100%", maxWidth: "800px", margin: "0 auto" }}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {value ? selectedItem?.label : "Search items..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput
              placeholder="Search items..."
              value={searchQuery}
              onValueChange={setSearchQuery}
              className="h-9"
            />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {searchResults.map((item) => (
                  <CommandItem
                    key={item.label}
                    value={item.label}
                    onSelect={
                      handleSelect
                      // (currentValue) => {
                      // setValue(currentValue === value ? "" : currentValue);
                      // setOpen(false);
                      // }
                    }
                  >
                    {/* <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === item.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {highlightMatch(item.label, searchQuery)} */}
                  </CommandItem>
                ))}

                {searchResults.length > 0 && (
                  <Select onValueChange={handleSelect}>
                    <SelectTrigger style={{ marginBottom: "1rem" }}>
                      <SelectValue placeholder="Select a location" />
                    </SelectTrigger>
                    <SelectContent>
                      {searchResults.map((result) => (
                        <SelectItem key={result.label} value={result.label}>
                          {result.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      ;
      {/* <Input
        type="text"
        value={searchQuery}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchQuery(e.target.value)
        }
        placeholder="Search location..."
        style={{ marginBottom: "1rem" }}
      />

      {searchResults.length > 0 && (
        <Select onValueChange={handleSelect}>
          <SelectTrigger style={{ marginBottom: "1rem" }}>
            <SelectValue placeholder="Select a location" />
          </SelectTrigger>
          <SelectContent>
            {searchResults.map((result) => (
              <SelectItem key={result.label} value={result.label}>
                {result.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )} */}
      <div
        ref={mapRef}
        style={{
          width: "100%",
          height: "800px",
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
