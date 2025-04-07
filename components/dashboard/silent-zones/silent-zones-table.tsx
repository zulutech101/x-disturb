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

import { Edit, LoaderCircle, Trash2 } from "lucide-react";
import Link from "next/link";
import {
  collection,
  query,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
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
  const [zoneToRemove, setZoneToRemove] = useState<string | null>(null);

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

  const handleRemoveSilentZone = async (id: string) => {
    try {
      setIsOpen(false);
      await deleteDoc(doc(db, "silent_zones", id));
      console.log("Document removed with ID:", id);
    } catch (err) {
      console.error("Error removing silent zone:", err);
    }
  };

  console.log(silentZones);

  return (
    <div className="border rounded-2xl shadow-md overflow-auto">
      <Table className="min-w-full divide-y divide-gray-200">
        <TableHeader className="bg-muted sticky top-0 z-10">
          <TableRow>
            <TableHead className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Name
            </TableHead>
            <TableHead className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Type
            </TableHead>
            <TableHead className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Radius (m)
            </TableHead>
            <TableHead className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Center Coordinates
            </TableHead>
            <TableHead className="px-6 py-3 text-sm font-semibold text-gray-700">
              Status
            </TableHead>
            <TableHead className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Description
            </TableHead>
            <TableHead className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white divide-y divide-gray-100">
          {loading ? (
            <TableRow>
              <TableCell colSpan={7}>
                <div className="h-[50vh] flex items-center justify-center">
                  <LoaderCircle
                    className="animate-spin text-primary"
                    size={60}
                  />
                </div>
              </TableCell>
            </TableRow>
          ) : silentZones && silentZones.length > 0 ? (
            silentZones.map((zone) => (
              <TableRow
                key={zone.id}
                className="hover:bg-muted/50 transition-colors"
              >
                <TableCell className="px-6 py-4 font-medium text-gray-900">
                  {zone.name || "N/A"}
                </TableCell>
                <TableCell className="px-6 py-4 text-gray-600 capitalize">
                  {zone.type}
                </TableCell>
                <TableCell className="px-6 py-4 text-gray-600">
                  {zone.radius.toLocaleString()}
                </TableCell>
                <TableCell className="px-6 py-4 text-gray-600">
                  {Number(zone.center.latitude).toFixed(6)},{" "}
                  {Number(zone.center.longitude).toFixed(6)}
                </TableCell>

                <TableCell className="px-6 py-4">
                  <Badge
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      zone.isActive
                        ? "bg-green-100 text-green-800"
                        : "bg-orange-100 text-orange-800"
                    }`}
                  >
                    {zone.isActive ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell className="px-6 py-4 text-gray-600 max-w-[250px] truncate">
                  {zone.description || "N/A"}
                </TableCell>
                <TableCell className="px-6 py-4 text-center space-x-2">
                  <Link
                    href={`silent-zones/edit-zone?id=${zone.id}`}
                    className="inline-flex items-center justify-center p-2 rounded-full bg-blue-50 hover:bg-blue-100 dark:bg-blue-900 dark:hover:bg-blue-800 transition-colors"
                    aria-label="Edit Zone"
                  >
                    <Edit className="h-4 w-4 text-blue-600 dark:text-blue-300" />
                  </Link>

                  <Button
                    onClick={() => {
                      setZoneToRemove(zone.id);
                      setIsOpen(true);
                    }}
                    variant="ghost"
                    size="icon"
                    className="inline-flex items-center justify-center p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
                    aria-label="Delete Zone"
                  >
                    <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-center text-gray-500 py-12"
              >
                No Silent Zones Added Yet!
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {zoneToRemove && (
        <ConfirmRemovalDialog
          onConfirm={() => handleRemoveSilentZone(zoneToRemove)}
          isOpen={isOpen}
          onClose={() => {
            setIsOpen(false);
            setZoneToRemove(null);
          }}
        />
      )}
    </div>
  );
}
