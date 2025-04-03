import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function SilentZones() {
  const zones = [
    {
      name: "Abrhot Library",
      type: "40.7128, -74.0060",
      radius: 3500,
      centerCoordinates: 1200,
      status: "Active",
    },
    {
      name: "Merkato Mosque",
      type: "34.0522, -118.2437",
      radius: 2800,
      centerCoordinates: 850,
      status: "Active",
    },
    {
      name: "Mikael Church",
      type: "51.5074, 0.1278",
      radius: 2200,
      centerCoordinates: 600,
      status: "Active",
    },
    {
      name: "National Library",
      type: "47.6062, -122.3321",
      radius: 1800,
      centerCoordinates: 450,
      status: "Inactive",
    },
    {
      name: "Public library",
      type: "37.7749, -122.4194",
      radius: 1500,
      centerCoordinates: 300,
      status: "Active",
    },
  ];

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-b-gray-400">
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Radius (meters)</TableHead>
            <TableHead>Center Coordinates</TableHead>
            <TableHead className="w-[125px]">Status</TableHead>
            <TableHead className="w-[200px]">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {zones.map((zone) => (
            <TableRow
              key={zone.name}
              className="py-5 border-b border-b-gray-400"
            >
              <TableCell className="font-medium text-gray-700">
                {zone.name}
              </TableCell>
              <TableCell className="text-gray-500">{zone.type}</TableCell>
              <TableCell className="text-gray-500">
                {zone.radius.toLocaleString()}
              </TableCell>
              <TableCell className="text-gray-500">
                {zone.centerCoordinates.toLocaleString()}
              </TableCell>
              <TableCell>
                <Badge
                  className={`px-4 py-1.5 outline-none rounded-4xl w-full ${
                    zone.status === "Active"
                      ? "bg-[#0AD95C]/30 text-green-800 hover:bg-[#a8ebc8]"
                      : "bg-[#FF8736]/30 text-orange-800 hover:bg-[#f8d0b0]"
                  }`}
                >
                  {zone.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  className="text-gray-700 hover:text-gray-900"
                >
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
