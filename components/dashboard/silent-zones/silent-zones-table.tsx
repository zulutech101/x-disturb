"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "@/app/firebase/config";
import { useEffect, useState } from "react";
import { ConfirmRemovalDialog } from "./ConfirmRemove";
import { Button } from "@/components/ui/button";

interface SilentZone {
  name: string;
  type: "church" | "mosque" | "library";
  radius: number;
  center: {
    latitude: number;
    longitude: number;
  };
  isActive: boolean;
  description: string;
  id: string;
}

export default function SilentZones() {
  const [silentZones, setSilentZones] = useState<SilentZone[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const silentZonesQuery = query(collection(db, "silent_zones"));
    const unsubscribe = onSnapshot(
      silentZonesQuery,
      (snapshot) => {
        const zonesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as SilentZone[];
        setSilentZones(zonesData);
        setLoading(false);
      },
      (err) => {
        console.log({ err });
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  console.log(silentZones);

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
            <TableHead className="max-w-[250px]">Description</TableHead>
            <TableHead className="w-[200px]">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={7}>
                <div className="h-[50vh] w-full flex items-center justify-center">
                  <LoaderCircle
                    className="animate-spin text-[#E66641]"
                    size={70}
                  />
                </div>
              </TableCell>
            </TableRow>
          ) : silentZones && silentZones.length > 0 ? (
            silentZones?.map((zone, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium text-gray-700">
                  {zone.name || "N/A"}
                </TableCell>
                <TableCell className="text-gray-500">
                  {zone.type || "N/A"}
                </TableCell>
                <TableCell className="text-gray-500">
                  {zone.radius.toLocaleString() || "N/A"}
                </TableCell>
                <TableCell className="text-gray-500">
                  {zone.center.latitude.toLocaleString()},{" "}
                  {zone.center.longitude.toLocaleString()}
                </TableCell>
                <TableCell>
                  <Badge
                    className={`px-4 py-1.5 outline-none rounded-4xl w-full ${
                      zone.isActive
                        ? "bg-[#0AD95C]/30 text-green-800 hover:bg-[#a8ebc8]"
                        : "bg-[#FF8736]/30 text-orange-800 hover:bg-[#f8d0b0]"
                    }`}
                  >
                    {zone.isActive ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell className="text-gray-500 overflow-x-clip max-w-[250px]">
                  {zone.description || "N/A"}
                </TableCell>
                <TableCell>
                  <Link
                    href={`silent-zones/edit-zone?id=${zone.id}`}
                    className="text-gray-700 hover:text-gray-900"
                  >
                    Edit
                  </Link>
                  <Button
                    onClick={() => setIsOpen(true)}
                    variant="link"
                    className="text-gray-700 hover:text-gray-900"
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center text-gray-500">
                <div className="h-[100vh] w-full flex items-center justify-center">
                  No Silent Zones Added Yet!.
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <ConfirmRemovalDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}
