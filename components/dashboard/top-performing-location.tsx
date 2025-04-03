"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

// Define the TypeScript interface for the table data
interface LibraryData {
  id: string;
  name: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  totalCapacity: number;
  currentOccupancy: number;
  averageStay: string;
  occupancyPercentage: number;
}

// Sample data array with 4 copies
const libraryData: LibraryData[] = Array(4).fill({
  id: crypto.randomUUID(), // Generates a unique ID for each entry
  name: "Abrhot Library",
  coordinates: {
    latitude: 40.7128,
    longitude: -74.006,
  },
  totalCapacity: 3500,
  currentOccupancy: 1200,
  averageStay: "30 min",
  occupancyPercentage: 85,
});

export default function TopPerformingLocation() {
  return (
    <div className="w-full mx-auto mb-10">
      <h1 className="text-2xl font-bold mb-4">Top Performing Location</h1>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Entries</TableHead>
              <TableHead>Users</TableHead>
              <TableHead>Dwell Time</TableHead>
              <TableHead>Entry Rate</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {libraryData.map((library, index) => (
              <TableRow key={index} className="border-b border-gray-300">
                <TableCell className="font-medium">{library.name}</TableCell>
                <TableCell className="text-gray-500">
                  {library.coordinates.latitude}
                  <br />
                  {library.coordinates.longitude}
                </TableCell>
                <TableCell className="text-gray-500">
                  {library.totalCapacity.toLocaleString()}
                </TableCell>
                <TableCell>
                  {library.currentOccupancy.toLocaleString()}
                </TableCell>
                <TableCell className="text-gray-500">
                  {library.averageStay}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 px-4">
                    <Progress
                      value={library.occupancyPercentage}
                      className="h-2 w-full"
                    />
                    <span>{library.occupancyPercentage}</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
